'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRideHistory } from '@/lib/hooks/useRideHistory';
import { TripCard } from './shared/TripCard';
import { Loader2 } from 'lucide-react';

export function TripHistoryTab() {
  const { rides, loading, error } = useRideHistory();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trip History</CardTitle>
          <CardDescription>Your recent journeys and experiences</CardDescription>
        </CardHeader>
      </Card>

      {rides.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No completed rides yet</p>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="space-y-4">
            {rides.map((ride) => (
              <TripCard key={ride.id} ride={ride} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}