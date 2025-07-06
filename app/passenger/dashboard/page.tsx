import { DashboardClient } from './DashboardClient';

export default function PassengerDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-8 pb-4">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">
            🚗 Jeeny
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Your Ride Companion</p>
        </div>
      </header>

      {/* Main Dashboard */}
      <DashboardClient />
    </div>
  );
}