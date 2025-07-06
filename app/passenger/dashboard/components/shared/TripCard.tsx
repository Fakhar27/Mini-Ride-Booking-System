'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Ride } from '@/types/ride';
import { format } from 'date-fns';

interface TripCardProps {
  ride: Ride;
}

export function TripCard({ ride }: TripCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today • ${format(date, 'h:mm a')}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday • ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d • h:mm a');
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{ride.ride_type}</Badge>
            <span className="text-sm text-muted-foreground">
              {formatDate(ride.created_at)}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span>🟢</span>
              <span>{ride.pickup_location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>🔴</span>
              <span>{ride.drop_location}</span>
            </div>
          </div>

          {ride.driver && (
            <>
              <Separator />
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {ride.driver.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{ride.driver.name}</p>
                  <p className="text-xs text-muted-foreground">Driver</p>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}