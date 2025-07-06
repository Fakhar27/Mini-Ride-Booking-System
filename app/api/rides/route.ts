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

    // Find an available driver first
    const { data: availableDrivers, error: driverError } = await supabase
      .from('drivers')
      .select('id, name')
      .eq('availability_status', 'AVAILABLE')
      .limit(1);

    if (driverError) {
      console.error('Error finding available driver:', driverError);
      return NextResponse.json(
        { error: "Error finding available drivers" },
        { status: 500 }
      );
    }

    if (!availableDrivers || availableDrivers.length === 0) {
      return NextResponse.json(
        { error: "No available drivers at the moment" },
        { status: 503 }
      );
    }

    const availableDriver = availableDrivers[0];

    // Create ride with driver already assigned and status ACCEPTED
    const { data: ride, error: createError } = await supabase
      .from('rides')
      .insert({
        passenger_id: user.id,
        driver_id: availableDriver.id,
        pickup_location,
        drop_location,
        ride_type,
        status: 'ACCEPTED'
      })
      .select(`
        *,
        driver:drivers!driver_id (
          id,
          name
        )
      `)
      .single();

    if (createError || !ride) {
      console.error('Error creating ride:', createError);
      return NextResponse.json(
        { error: "Failed to create ride" },
        { status: 500 }
      );
    }

    // Mark driver as BUSY
    const { error: updateDriverError } = await supabase
      .from('drivers')
      .update({ availability_status: 'BUSY' })
      .eq('id', availableDriver.id);

    if (updateDriverError) {
      console.error('Error updating driver availability:', updateDriverError);
      // Continue anyway - ride is created
    }

    console.log(`Ride ${ride.id} created and assigned to driver ${availableDriver.name}`);

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