'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapIcon, Navigation, History } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
}

export function Sidebar({ activeTab }: SidebarProps) {
  return (
    <div className="p-6">
      <TabsList className="flex-col h-auto w-full bg-transparent">
        <TabsTrigger 
          value="request" 
          className="w-full justify-start gap-3 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <MapIcon className="h-5 w-5" />
          Request
        </TabsTrigger>
        
        <TabsTrigger 
          value="live" 
          className="w-full justify-start gap-3 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Navigation className="h-5 w-5" />
          Live
        </TabsTrigger>
        
        <TabsTrigger 
          value="history" 
          className="w-full justify-start gap-3 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <History className="h-5 w-5" />
          History
        </TabsTrigger>
      </TabsList>
    </div>
  );
}