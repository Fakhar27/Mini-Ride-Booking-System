import { RideType } from "@/types/ride";

export interface RideTypeInfo {
  type: RideType;
  icon: string;
  name: string;
  description: string;
}

export const RIDE_TYPES: RideTypeInfo[] = [
  {
    type: 'BIKE',
    icon: '🏍️',
    name: 'Bike',
    description: 'Fast & Affordable'
  },
  {
    type: 'CAR',
    icon: '🚗',
    name: 'Car',
    description: 'Comfortable & Safe'
  },
  {
    type: 'RICKSHAW',
    icon: '🛺',
    name: 'Rickshaw',
    description: 'Local & Convenient'
  }
];