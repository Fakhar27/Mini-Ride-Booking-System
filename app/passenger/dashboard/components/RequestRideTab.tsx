'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRequestRide } from '@/lib/hooks/useRequestRide';
import { LocationSelect } from './shared/LocationSelect';
import { RideTypeCard } from './shared/RideTypeCard';
import { LOCATIONS } from '@/mockData/locations';
import { RIDE_TYPES } from '@/mockData/rideTypes';
import { RideType } from '@/types/ride';

interface RequestRideTabProps {
  onRideRequested: () => void;
}

export function RequestRideTab({ onRideRequested }: RequestRideTabProps) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [selectedRideType, setSelectedRideType] = useState<RideType | null>(null);
  const { requestRide, loading, error } = useRequestRide();

  const handleRequestRide = async () => {
    if (!pickupLocation || !dropLocation || !selectedRideType) {
      return;
    }

    const ride = await requestRide({
      pickup_location: pickupLocation,
      drop_location: dropLocation,
      ride_type: selectedRideType,
    });

    if (ride) {
      onRideRequested();
    }
  };

  const isFormValid = pickupLocation && dropLocation && selectedRideType;

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Your Ride</CardTitle>
          <CardDescription>Where would you like to go today?</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LocationSelect
            label="From"
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChange={setPickupLocation}
            locations={LOCATIONS}
            icon="🟢"
          />
          
          <LocationSelect
            label="To"
            placeholder="Enter destination"
            value={dropLocation}
            onChange={setDropLocation}
            locations={LOCATIONS}
            icon="🔴"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {RIDE_TYPES.map((rideType) => (
            <RideTypeCard
              key={rideType.type}
              rideType={rideType}
              isSelected={selectedRideType === rideType.type}
              onSelect={() => setSelectedRideType(rideType.type)}
            />
          ))}
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      <Button 
        className="w-full" 
        size="lg"
        onClick={handleRequestRide}
        disabled={!isFormValid || loading}
      >
        {loading ? 'Requesting...' : `Request ${selectedRideType || 'Ride'} →`}
      </Button>
    </div>
  );
}