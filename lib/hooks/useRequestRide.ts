import { useState } from 'react';
import { CreateRideRequest, Ride } from '@/types/ride';

export function useRequestRide() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestRide = async (data: CreateRideRequest): Promise<Ride | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to request ride');
      }

      const ride = await response.json();
      return ride;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { requestRide, loading, error };
}