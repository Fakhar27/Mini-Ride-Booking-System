import { useState, useEffect, useRef } from 'react';
import { Ride } from '@/types/ride';

export function useActiveRide() {
  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const statusTimersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    const fetchActiveRide = async () => {
      try {
        const response = await fetch('/api/rides/active');
        if (!response.ok) {
          throw new Error('Failed to fetch active ride');
        }
        const data = await response.json();
        setActiveRide(data);
        setError(null);

        // Set up status transition timers
        if (data && data.id) {
          setupStatusTimers(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const setupStatusTimers = (ride: Ride) => {
      // Clear existing timers for this ride
      clearTimersForRide(ride.id);

      const createdAt = new Date(ride.created_at).getTime();
      const now = Date.now();
      const elapsed = now - createdAt;

      // Set timer to change from ACCEPTED to IN_PROGRESS after 10 seconds
      if (ride.status === 'ACCEPTED') {
        const timeToInProgress = 10000 - elapsed;
        if (timeToInProgress > 0) {
          statusTimersRef.current[`${ride.id}-progress`] = setTimeout(async () => {
            await updateRideStatus(ride.id, 'IN_PROGRESS');
          }, timeToInProgress);
        } else {
          // Should already be IN_PROGRESS, update immediately
          updateRideStatus(ride.id, 'IN_PROGRESS');
        }
      }

      // Set timer to change from IN_PROGRESS to COMPLETED after 30 seconds total
      if (ride.status === 'IN_PROGRESS' || ride.status === 'ACCEPTED') {
        const timeToComplete = 30000 - elapsed;
        if (timeToComplete > 0) {
          statusTimersRef.current[`${ride.id}-complete`] = setTimeout(async () => {
            await updateRideStatus(ride.id, 'COMPLETED');
          }, timeToComplete);
        }
      }
    };

    const updateRideStatus = async (rideId: string, status: string) => {
      try {
        const response = await fetch(`/api/rides/${rideId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          console.error('Failed to update ride status');
        }
      } catch (err) {
        console.error('Error updating ride status:', err);
      }
    };

    const clearTimersForRide = (rideId: string) => {
      Object.keys(statusTimersRef.current).forEach(key => {
        if (key.startsWith(rideId)) {
          clearTimeout(statusTimersRef.current[key]);
          delete statusTimersRef.current[key];
        }
      });
    };

    // Initial fetch
    fetchActiveRide();

    // Poll every 3 seconds
    const interval = setInterval(fetchActiveRide, 3000);

    // Cleanup
    return () => {
      clearInterval(interval);
      // Clear all timers
      const timers = statusTimersRef.current;
      Object.values(timers).forEach(timer => clearTimeout(timer));
    };
  }, []);

  return { activeRide, loading, error };
}