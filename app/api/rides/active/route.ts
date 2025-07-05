import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/rides/active - Get current active ride
export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get active ride (REQUESTED, ACCEPTED, or IN_PROGRESS)
    const { data: ride, error } = await supabase
      .from('rides')
      .select(`
        *,
        driver:drivers!driver_id (
          id,
          name
        )
      `)
      .eq('passenger_id', user.id)
      .in('status', ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(); // Use maybeSingle() to handle no results gracefully

    if (error) {
      console.error('Error fetching active ride:', error);
      return NextResponse.json(
        { error: "Failed to fetch active ride" },
        { status: 500 }
      );
    }

    // Return null if no active ride
    return NextResponse.json(ride);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}