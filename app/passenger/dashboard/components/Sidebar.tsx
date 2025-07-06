'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapIcon, Navigation, History } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="pt-8 pb-6">
      <TabsList className="grid grid-cols-3 w-full h-auto rounded-lg bg-muted/20 p-1.5">
        <TabsTrigger 
          value="request" 
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-muted/40"
        >
          <MapIcon className="h-6 w-6" />
          <span className="text-sm font-semibold">Request</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="live" 
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-muted/40"
        >
          <Navigation className="h-6 w-6" />
          <span className="text-sm font-semibold">Live</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="history" 
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-muted/40"
        >
          <History className="h-6 w-6" />
          <span className="text-sm font-semibold">History</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
}