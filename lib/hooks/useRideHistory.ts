import { useState, useEffect } from 'react';
import { Ride } from '@/types/ride';

export function useRideHistory() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const response = await fetch('/api/rides');
        if (!response.ok) {
          throw new Error('Failed to fetch ride history');
        }
        const data = await response.json();
        setRides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRideHistory();
  }, []);

  return { rides, loading, error };
}