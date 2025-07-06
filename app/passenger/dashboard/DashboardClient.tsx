'use client';

import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Sidebar } from './components/Sidebar';
import { RequestRideTab } from './components/RequestRideTab';
import { LiveTrackingTab } from './components/LiveTrackingTab';
import { TripHistoryTab } from './components/TripHistoryTab';

export function DashboardClient() {
  const [activeTab, setActiveTab] = useState('request');

  return (
    <div className="container mx-auto p-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-[calc(100vh-5rem)]">
        <div className="w-64 border-r bg-muted/10">
          <Sidebar activeTab={activeTab} />
        </div>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="request" className="m-0 h-full">
            <RequestRideTab onRideRequested={() => setActiveTab('live')} />
          </TabsContent>
          
          <TabsContent value="live" className="m-0 h-full">
            <LiveTrackingTab />
          </TabsContent>
          
          <TabsContent value="history" className="m-0 h-full">
            <TripHistoryTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}