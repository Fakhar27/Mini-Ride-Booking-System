import { DashboardClient } from './DashboardClient';

export default function PassengerDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🚗 RideApp Pro
          </h1>
        </div>
      </header>

      {/* Main Dashboard */}
      <DashboardClient />
    </div>
  );
}