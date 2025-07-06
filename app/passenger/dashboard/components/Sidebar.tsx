'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapIcon, Navigation, History } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
}

export function Sidebar({ activeTab }: SidebarProps) {
  return (
    <div className="border-b">
      <TabsList className="grid grid-cols-3 w-full h-auto rounded-none bg-muted/10 p-1">
        <TabsTrigger 
          value="request" 
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <MapIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-xs sm:text-sm font-medium">Request</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="live" 
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Navigation className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-xs sm:text-sm font-medium">Live</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="history" 
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <History className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-xs sm:text-sm font-medium">History</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
}