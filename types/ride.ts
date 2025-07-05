export type RideType = 'BIKE' | 'CAR' | 'RICKSHAW';
export type RideStatus = 'REQUESTED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface Driver {
  id: string;
  name: string;
  availability_status?: 'AVAILABLE' | 'BUSY';
}

export interface Ride {
  id: string;
  passenger_id: string;
  driver_id: string | null;
  pickup_location: string;
  drop_location: string;
  ride_type: RideType;
  status: RideStatus;
  created_at: string;
  driver?: Driver | null;
}

export interface CreateRideRequest {
  pickup_location: string;
  drop_location: string;
  ride_type: RideType;
}