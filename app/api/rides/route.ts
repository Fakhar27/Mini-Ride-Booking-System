import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// POST /api/rides - Create a new ride
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const { pickup_location, drop_location, ride_type } = await request.json();

    // Validate input
    if (!pickup_location || !drop_location || !ride_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate ride type
    if (!['BIKE', 'CAR', 'RICKSHAW'].includes(ride_type)) {
      return NextResponse.json(
        { error: "Invalid ride type" },
        { status: 400 }
      );
    }

    // Create ride with REQUESTED status
    const { data: ride, error: createError } = await supabase
      .from('rides')
      .insert({
        passenger_id: user.id,
        pickup_location,
        drop_location,
        ride_type,
        status: 'REQUESTED'
      })
      .select()
      .single();

    if (createError || !ride) {
      console.error('Error creating ride:', createError);
      return NextResponse.json(
        { error: "Failed to create ride" },
        { status: 500 }
      );
    }

    // Schedule driver assignment after 5 seconds
    setTimeout(async () => {
      try {
        // Find an available driver
        const { data: availableDriver } = await supabase
          .from('drivers')
          .select('id, name')
          .eq('availability_status', 'AVAILABLE')
          .limit(1)
          .single();

        if (availableDriver) {
          // Update ride with driver
          await supabase
            .from('rides')
            .update({ 
              driver_id: availableDriver.id,
              status: 'ACCEPTED'
            })
            .eq('id', ride.id);

          // Mark driver as BUSY
          await supabase
            .from('drivers')
            .update({ availability_status: 'BUSY' })
            .eq('id', availableDriver.id);

          console.log(`Ride ${ride.id} assigned to driver ${availableDriver.name}`);
        } else {
          console.log(`No available drivers for ride ${ride.id}`);
        }
      } catch (error) {
        console.error('Error assigning driver:', error);
      }
    }, 5000);

    // Schedule ride start after 15 seconds
    setTimeout(async () => {
      try {
        await supabase
          .from('rides')
          .update({ status: 'IN_PROGRESS' })
          .eq('id', ride.id);

        console.log(`Ride ${ride.id} started`);
      } catch (error) {
        console.error('Error starting ride:', error);
      }
    }, 15000);

    // Schedule ride completion after 35 seconds
    setTimeout(async () => {
      try {
        // Get the driver_id to release them
        const { data: rideData } = await supabase
          .from('rides')
          .select('driver_id')
          .eq('id', ride.id)
          .single();

        // Update ride status to COMPLETED
        await supabase
          .from('rides')
          .update({ status: 'COMPLETED' })
          .eq('id', ride.id);

        // Make driver available again
        if (rideData?.driver_id) {
          await supabase
            .from('drivers')
            .update({ availability_status: 'AVAILABLE' })
            .eq('id', rideData.driver_id);

          console.log(`Ride ${ride.id} completed, driver released`);
        }
      } catch (error) {
        console.error('Error completing ride:', error);
      }
    }, 35000);

    return NextResponse.json(ride);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/rides - Get ride history (completed rides)
export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get completed rides with driver info
    const { data: rides, error } = await supabase
      .from('rides')
      .select(`
        *,
        driver:drivers!driver_id (
          name
        )
      `)
      .eq('passenger_id', user.id)
      .eq('status', 'COMPLETED')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ride history:', error);
      return NextResponse.json(
        { error: "Failed to fetch ride history" },
        { status: 500 }
      );
    }

    return NextResponse.json(rides || []);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}