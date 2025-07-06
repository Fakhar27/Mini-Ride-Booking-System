'use client';

import { cn } from '@/lib/utils';
import { RideTypeInfo } from '@/mockData/rideTypes';

interface RideTypeCardProps {
  rideType: RideTypeInfo;
  isSelected: boolean;
  onSelect: () => void;
}

export function RideTypeCard({ rideType, isSelected, onSelect }: RideTypeCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border-2 cursor-pointer transition-colors",
        isSelected 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50"
      )}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{rideType.icon}</span>
        <div className="flex-1">
          <h4 className="font-semibold">{rideType.name}</h4>
          <p className="text-sm text-muted-foreground">{rideType.description}</p>
        </div>
      </div>
    </div>
  );
}