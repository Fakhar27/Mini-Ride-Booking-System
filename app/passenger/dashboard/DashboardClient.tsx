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
    <div className="container mt-4 mx-auto p-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <Sidebar />
        
        <div className="mt-2">
          <TabsContent value="request" className="m-0">
            <RequestRideTab onRideRequested={() => setActiveTab('live')} />
          </TabsContent>
          
          <TabsContent value="live" className="m-0">
            <LiveTrackingTab />
          </TabsContent>
          
          <TabsContent value="history" className="m-0">
            <TripHistoryTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}