import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// PUT /api/rides/[id]/status - Update ride status
export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const { status } = await request.json();

    // Validate status
    const validStatuses = ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Get current ride to validate ownership and status transition
    const { data: currentRide, error: fetchError } = await supabase
      .from('rides')
      .select('passenger_id, driver_id, status')
      .eq('id', params.id)
      .single();

    if (fetchError || !currentRide) {
      return NextResponse.json(
        { error: "Ride not found" },
        { status: 404 }
      );
    }

    // Verify user owns this ride
    if (currentRide.passenger_id !== user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Validate status transitions
    const validTransitions: Record<string, string[]> = {
      'REQUESTED': ['ACCEPTED'],
      'ACCEPTED': ['IN_PROGRESS', 'COMPLETED'],
      'IN_PROGRESS': ['COMPLETED'],
      'COMPLETED': []
    };

    if (!validTransitions[currentRide.status]?.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status transition from ${currentRide.status} to ${status}` },
        { status: 400 }
      );
    }

    // Update ride status
    const { data: updatedRide, error: updateError } = await supabase
      .from('rides')
      .update({ status })
      .eq('id', params.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating ride status:', updateError);
      return NextResponse.json(
        { error: "Failed to update ride status" },
        { status: 500 }
      );
    }

    // If ride is completed, make driver available again
    if (status === 'COMPLETED' && currentRide.driver_id) {
      const { error: driverError } = await supabase
        .from('drivers')
        .update({ availability_status: 'AVAILABLE' })
        .eq('id', currentRide.driver_id);

      if (driverError) {
        console.error('Error updating driver availability:', driverError);
      }
    }

    return NextResponse.json(updatedRide);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}