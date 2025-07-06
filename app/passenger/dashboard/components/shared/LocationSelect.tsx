'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LocationSelectProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  locations: readonly string[];
  icon: string;
}

export function LocationSelect({
  label,
  placeholder,
  value,
  onChange,
  locations,
  icon,
}: LocationSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}:</Label>
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={label} className="flex-1">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}