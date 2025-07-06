# Mini Ride Booking System

## 🚀 Live Demo

- **Passenger Dashboard**: Experience seamless ride booking and tracking
- **Driver Dashboard**: View assigned rides and completion statistics
- **Real-time Updates**: Watch ride status changes in real-time

## 📋 Features

### ✅ **Core Requirements Met**

- **Request a Ride**: Location selection with multiple vehicle types (Bike, Car, Rickshaw)
- **View Ride Status**: Real-time tracking through status progression (Requested → Accepted → In Progress → Completed)
- **Ride History**: Complete history of past rides with detailed information

### 🎯 **Additional Features**

- **Driver Dashboard**: Professional driver interface with ride statistics
- **Role-based Routing**: Automatic redirection based on user type (Passenger/Driver)
- **Instant Driver Assignment**: Realistic simulation of driver allocation
- **Responsive Design**: Modern UI that works across all devices

## 🛠️ Tech Stack

### **Frontend Framework**

- **Next.js 15** - Chosen for fast performance, easy setup, and dual management of client-side and server-side rendering
- **TypeScript** - Full type safety and enhanced developer experience
- **Tailwind CSS** - Utility-first styling for rapid development

### **Backend & Database**

- **Supabase** - Selected for ready-to-use backend with built-in authentication, Row Level Security (RLS), high scalability, and seamless Next.js integration
- **PostgreSQL** - Robust relational database with advanced features
- **Real-time Subscriptions** - Live data updates for ride tracking

### **UI Library**

- **shadcn/ui** - Modern component library providing cards, containers, tabs, and other components with built-in responsiveness and accessibility

### **State Management**

- **Custom React Hooks** - Clean, reusable data fetching logic
- **Client-side State** - Efficient local state management with React hooks

## 📁 Directory Structure

```
app/
├── api/                          # Backend API routes
│   └── rides/
│       ├── route.ts              # GET (ride history) & POST (request ride)
│       ├── [id]/
│       │   └── status/route.ts   # PUT (update ride status)
│       └── active/route.ts       # GET (live tracking data)
├── auth/                         # Authentication pages
│   ├── login/
│   └── sign-up/
├── driver/                       # Driver-specific pages
│   └── dashboard/
├── passenger/                    # Passenger-specific pages
│   └── dashboard/
│       ├── page.tsx             # Main layout rendering
│       ├── DashboardClient.tsx  # Client component with tabs
│       └── components/          # Tab content components
│           ├── RequestRideTab.tsx
│           ├── LiveTrackingTab.tsx
│           ├── TripHistoryTab.tsx
│           └── shared/          # Reusable components
├── mockdata/                     # Static data for non-essential features
│   ├── locations.ts             # Predefined pickup/dropoff locations
│   └── rideTypes.ts             # Vehicle type definitions
└── lib/
    ├── supabase/                # Database configuration
    │   ├── client.ts            # Client-side Supabase instance
    │   ├── server.ts            # Server-side Supabase instance
    │   └── middleware.ts        # Extended route protection logic
    └── hooks/                   # Custom React hooks
        ├── useActiveRide.ts     # Real-time ride status tracking
        ├── useRequestRide.ts    # Ride creation functionality
        └── useRideHistory.ts    # Historical ride data
```

## 🗄️ Database Schema

### **Tables Overview**

Our database consists of three main tables with proper relationships and security policies:

```sql
-- User profiles extending Supabase auth
public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'PASSENGER' CHECK (role IN ('PASSENGER', 'DRIVER'))
)

-- Driver-specific information
public.drivers (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  availability_status TEXT CHECK (availability_status IN ('AVAILABLE', 'BUSY')) DEFAULT 'AVAILABLE'
)

-- Core ride management
public.rides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  passenger_id UUID REFERENCES public.profiles(id) NOT NULL,
  driver_id UUID REFERENCES public.drivers(id),
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  ride_type TEXT CHECK (ride_type IN ('BIKE', 'CAR', 'RICKSHAW')) NOT NULL,
  status TEXT CHECK (status IN ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED')) DEFAULT 'REQUESTED',
  created_at TIMESTAMPTZ DEFAULT NOW()
)
```

### **Security & Automation**

#### **Row Level Security (RLS)**

```sql
-- Users can only access their own data
CREATE POLICY "Users can manage their own profile"
ON public.profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own rides"
ON public.rides FOR ALL USING (passenger_id = auth.uid());

CREATE POLICY "Drivers can manage own availability"
ON public.drivers FOR ALL USING (id = auth.uid());
```

#### **Automated User Creation**

```sql
-- Trigger function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile for all users
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'user_type'
  );

  -- Create driver record if user is driver
  IF new.raw_user_meta_data->>'user_type' = 'DRIVER' THEN
    INSERT INTO public.drivers (id, name, availability_status)
    VALUES (
      new.id,
      new.raw_user_meta_data->>'full_name',
      'AVAILABLE'
    );
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger activation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 🎯 Key Implementation Highlights

### **1. Real-time Ride Tracking**

```typescript
// useActiveRide.ts - Polls for live status updates
const useActiveRide = () => {
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      const res = await fetch("/api/rides/active");
      const data = await res.json();
      setRide(data);
    };

    fetchAndUpdate();
    const interval = setInterval(fetchAndUpdate, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return { ride, loading };
};
```

### **2. Intelligent Driver Assignment**

```typescript
// POST /api/rides - Instant driver assignment with availability management
const availableDriver = await supabase
  .from("drivers")
  .select("id, name")
  .eq("availability_status", "AVAILABLE")
  .limit(1)
  .single();

// Create ride and update driver status atomically
await Promise.all([
  supabase.from("rides").insert(rideData),
  supabase.from("drivers").update({ availability_status: "BUSY" }),
]);
```

### **3. Route Protection Middleware**

```typescript
// Automatic role-based redirection
if (isPassengerRoute && userRole === "DRIVER") {
  return NextResponse.redirect("/driver/dashboard");
}
if (isDriverRoute && userRole === "PASSENGER") {
  return NextResponse.redirect("/passenger/dashboard");
}
```

## 🔄 Data Flow Architecture

### **Ride Creation Flow**

1. **User Input** → Form validation → API call
2. **Driver Assignment** → Find available driver → Update availability
3. **Status Progression** → Instant acceptance → Real-time updates
4. **Completion** → Release driver → Update history

### **Real-time Updates**

1. **Client Polling** → Every 3 seconds → Status check
2. **UI Updates** → Smooth transitions → Live feedback
3. **Driver Management** → Automatic availability → Load balancing

## 🚀 Getting Started

### **Installation**

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd jeeny-driver
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**

   - Run the SQL commands from the schema section in your Supabase SQL editor
   - Ensure RLS policies are enabled

5. **Run the application**

   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Sign up as a passenger or driver to test functionality

## 🧪 Testing the Application

### **As a Passenger**

1. Sign up with role "PASSENGER"
2. Navigate to dashboard → Request ride
3. Select pickup/dropoff locations and vehicle type
4. Watch real-time status updates in Live Tracking
5. View completed rides in Trip History

### **As a Driver**

1. Sign up with role "DRIVER"
2. View driver dashboard with statistics
3. See assigned rides and completion count
4. Monitor ride history

## 🎨 Design Decisions

### **Why Next.js?**

- **Server-side Rendering** for better SEO and initial load times
- **API Routes** for seamless full-stack development
- **File-based Routing** for organized code structure
- **Built-in Optimization** for production deployment

### **Why Supabase?**

- **Instant Backend** with zero configuration
- **Built-in Authentication** with social providers
- **Real-time Subscriptions** for live updates
- **Row Level Security** for data protection
- **PostgreSQL** for complex relational queries

### **Why shadcn/ui?**

- **Modern Design System** with consistent styling
- **Accessibility First** with ARIA support
- **Customizable** components that fit our brand
- **Developer Experience** with TypeScript support

## 📊 Performance Considerations

- **Server Components** for initial data loading
- **Client Components** only where interactivity is needed
- **Optimistic Updates** for better user experience
- **Efficient Polling** with proper cleanup
- **Database Indexes** on frequently queried columns

## 🔐 Security Features

- **Row Level Security** prevents unauthorized data access
