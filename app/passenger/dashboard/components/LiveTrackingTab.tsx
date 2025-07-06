'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useActiveRide } from '@/lib/hooks/useActiveRide';
import { Loader2 } from 'lucide-react';

export function LiveTrackingTab() {
  const { activeRide, loading, error } = useActiveRide();

  if (loading && !activeRide) {
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

  if (!activeRide) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No active ride</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline", label: string }> = {
      REQUESTED: { variant: "secondary", label: "Finding Driver" },
      ACCEPTED: { variant: "default", label: "Driver Assigned" },
      IN_PROGRESS: { variant: "default", label: "In Progress" },
    };
    
    const { variant, label } = variants[status] || { variant: "outline", label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getStatusMessage = (status: string) => {
    const messages: Record<string, string> = {
      REQUESTED: "Looking for a driver...",
      ACCEPTED: "Driver is on the way",
      IN_PROGRESS: "Enjoy your ride!",
    };
    return messages[status] || "";
  };

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Live Tracking</CardTitle>
            {getStatusBadge(activeRide.status)}
          </div>
          <CardDescription>{getStatusMessage(activeRide.status)}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pickup Location</p>
              <p className="font-medium flex items-center gap-2">
                <span>🟢</span> {activeRide.pickup_location}
              </p>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Destination</p>
              <p className="font-medium flex items-center gap-2">
                <span>🔴</span> {activeRide.drop_location}
              </p>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ride Type</p>
              <p className="font-medium">{activeRide.ride_type}</p>
            </div>
          </CardContent>
        </Card>

        {activeRide.driver && (
          <Card>
            <CardHeader>
              <CardTitle>Your Driver</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {activeRide.driver.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{activeRide.driver.name}</p>
                  <p className="text-sm text-muted-foreground">Driver</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {(activeRide.status === 'REQUESTED' || activeRide.status === 'ACCEPTED') && (
        <Button variant="destructive" className="w-full">
          Cancel Ride
        </Button>
      )}
    </div>
  );
}