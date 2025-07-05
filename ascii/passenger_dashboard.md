# RideApp Pro - Premium Ride Hailing Desktop Application

A modern, premium ride hailing desktop application built with **Next.js** and **shadcn/ui** components. This application provides a clean, accessible, and professional interface for booking rides, tracking live trips, and viewing ride history.

## 🚀 Features

### ✅ **Request a Ride**

- Location input with pickup and destination
- Multiple ride type selection (Economy, Comfort, Premium, XL)
- Real-time pricing and ETA display
- Popular ride type indicators
- One-click ride booking

### ✅ **Live Tracking**

- Real-time ride status updates
- Driver information with ratings and vehicle details
- Direct communication options (Call/Message)
- Trip statistics (time, fare)
- Ride cancellation option

### ✅ **Trip History**

- Comprehensive ride history with search functionality
- Detailed trip information and driver ratings
- Filter and sort capabilities
- Trip statistics and fare breakdown

## 🎨 shadcn/ui Components Used

### **Layout & Navigation**

- **`Tabs`** - Main navigation system with vertical orientation
- **`TabsContent`** - Content containers for each main section
- **`TabsList`** - Navigation tab container
- **`TabsTrigger`** - Individual navigation buttons

### **Content Containers**

- **`Card`** - Primary container for all content sections
- **`CardHeader`** - Card titles and descriptions
- **`CardTitle`** - Section headings
- **`CardDescription`** - Subtitle text
- **`CardContent`** - Main content areas

### **Form Elements**

- **`Input`** - Text input fields for locations
- **`Label`** - Form field labels
- **`Button`** - All interactive elements with variants:
  - `default` - Primary actions
  - `outline` - Secondary actions
  - `ghost` - Subtle actions
  - `destructive` - Cancel/delete actions

### **Data Display**

- **`Badge`** - Status indicators, ride types, and tags
- **`Avatar`** - User and driver profile images
- **`AvatarImage`** - Profile image display
- **`AvatarFallback`** - Fallback initials when no image

### **Layout Utilities**

- **`Separator`** - Visual dividers between content
- **`ScrollArea`** - Scrollable content regions

## 📱 Page Layouts (ASCII Art)

### 🚗 Request Ride Page

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER │
│ 🚗 RideApp Pro  
└─────────────────────────────────────────────────────────────────────────────────────┘
┌─────────────────┬───────────────────────────────────────────────────────────────────┐
│ SIDEBAR │ MAIN CONTENT │
│ │ │
│ ┌─────────────┐ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Navigation │ │ │ Book Your Ride │ │
│ │ │ │ │ Where would you like to go today? │ │
│ │ [🗺️] Request│ │ └─────────────────────────────────────────────────────────────┘ │
│ │ [ ] Live │ │ │
│ │ [ ] History │ │ ┌─────────────────────────────────────────────────────────────┐ │
│ └─────────────┘ │ │ Trip Details │ │
│ │ │ │ │
│ ┌─────────────┐ │ │ From: [🟢] [Enter pickup location____________] │ │
│ │ Quick Stats │ │ │ │ │
│ │ │ │ │ To: [🔴] [Enter destination________________] │ │
│ │ 24 │ │ └─────────────────────────────────────────────────────────────┘ │
│ │ Total Rides │ │ │
│ │ │ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 4.9 │ │ │ Choose Your Experience │ │
│ │ Rating │ │ │ │ │
│ └─────────────┘ │ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ │ [🚗] Economy $12-15 [Popular] [3 min away] │ │ │
│ ┌─────────────┐ │ │ │ Affordable everyday rides │ │ │
│ │Quick Actions│ │ │ └─────────────────────────────────────────────────────┘ │ │
│ │ │ │ │ │ │
│ │[📅]Schedule │ │ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │[💰]Payment │ │ │ │ [🛡️] Comfort $18-22 [Popular] [5 min away] │ │ │
│ │[⚙️]Settings │ │ │ │ Extra space & newer cars │ │ │
│ └─────────────┘ │ │ └─────────────────────────────────────────────────────┘ │ │
│ │ │ │ │
│ │ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ │ [👑] Premium $28-35 [8 min away] │ │ │
│ │ │ │ Luxury vehicles & top drivers │ │ │
│ │ │ └─────────────────────────────────────────────────────┘ │ │
│ │ │ │ │
│ │ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ │ [👥] XL $22-28 [6 min away] │ │ │
│ │ │ │ Spacious rides for groups │ │ │
│ │ │ └─────────────────────────────────────────────────────┘ │ │
│ │ └─────────────────────────────────────────────────────────────┘ │
│ │ │
│ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ │ [⚡] Request Economy [→] │ │
│ │ └─────────────────────────────────────────────────────────────┘ │
└─────────────────┴───────────────────────────────────────────────────────────────────┘
\`\`\`

### 📍 Live Tracking Page

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER │
│ 🚗 RideApp Pro  
└─────────────────────────────────────────────────────────────────────────────────────┘
┌─────────────────┬───────────────────────────────────────────────────────────────────┐
│ SIDEBAR │ MAIN CONTENT │
│ │ │
│ ┌─────────────┐ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Navigation │ │ │ Live Tracking │ │
│ │ │ │ │ [Driver arriving soon] │ │
│ │ [ ] Request │ │ └─────────────────────────────────────────────────────────────┘ │
│ │ [📍] Live │ │ │
│ │ [ ] History │ │ ┌─────────────────────────┬─────────────────────────────────┐ │
│ └─────────────┘ │ │ TRIP DETAILS │ YOUR DRIVER │ │
│ │ │ │ │ │
│ ┌─────────────┐ │ │ ┌─────────────────────┐ │ ┌─────────────────────────────┐ │ │
│ │ Quick Stats │ │ │ │ Trip Details │ │ │ Your Driver │ │ │
│ │ │ │ │ │ │ │ │ │ │ │
│ │ 24 │ │ │ │ 🟢 Pickup Location │ │ │ [Avatar] David Wilson │ │ │
│ │ Total Rides │ │ │ │ Current Location │ │ │ ⭐ 4.7 │ │ │
│ │ │ │ │ │ │ │ │ Tesla Model 3 • ECO-321 │ │ │
│ │ 4.9 │ │ │ │ 🔴 Destination │ │ │ │ │ │
│ │ Rating │ │ │ │ Airport Terminal │ │ │ ┌─────────┬─────────────┐ │ │ │
│ └─────────────┘ │ │ └─────────────────────┘ │ │ │ [📞] │ [💬] │ │ │ │
│ │ │ │ │ │ Call │ Message │ │ │ │
│ ┌─────────────┐ │ │ ┌─────────┬─────────┐ │ │ └─────────┴─────────────┘ │ │ │
│ │Quick Actions│ │ │ │ 22 │ $35.25 │ │ └─────────────────────────────┘ │ │
│ │ │ │ │ │ min │ Total │ │ │ │
│ │[📅]Schedule │ │ │ │ Est.Time│ Fare │ └─────────────────────────────────┘ │
│ │[💰]Payment │ │ │ └─────────┴─────────┘ │
│ │[⚙️]Settings │ │ └───────────────────────── │
│ └─────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ │ [Cancel Ride] │ │
│ │ └─────────────────────────────────────────────────────────────┘ │
└─────────────────┴───────────────────────────────────────────────────────────────────┘
\`\`\`

### 📚 Trip History Page

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER │
│ 🚗 RideApp Pro  
└─────────────────────────────────────────────────────────────────────────────────────┘
┌─────────────────┬───────────────────────────────────────────────────────────────────┐
│ SIDEBAR │ MAIN CONTENT │
│ │ │
│ ┌─────────────┐ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Navigation │ │ │ Trip History │ │
│ │ │ │ │ Your recent journeys and experiences │ │
│ │ [ ] Request │ │ └─────────────────────────────────────────────────────────────┘ │
│ │ [ ] Live │ │ │
│ │ [📚] History│ │ ┌─────────────────────────────────────────────────────────────┐ │
│ └─────────────┘ │ │ [🔍] [Search your trips...____________] [🔽 Filter] │ │
│ │ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────┐ │ │
│ │ Quick Stats │ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ │ │ │ [Comfort] Today • 2:30 PM $24.50 │ │
│ │ 24 │ │ │ │ │
│ │ Total Rides │ │ │ 🟢 123 Main St, Downtown │ │
│ │ │ │ │ 🔴 456 Oak Ave, Uptown │ │
│ │ 4.9 │ │ │ ─────────────────────────────────────────────────────────── │ │
│ │ Rating │ │ │ [JS] John Smith ⭐ 4.9 ⏱️ 18 min • 8.2 km │ │
│ └─────────────┘ │ └─────────────────────────────────────────────────────────────┘ │
│ │ │
│ ┌─────────────┐ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │Quick Actions│ │ │ [Economy] Yesterday • 9:15 AM $31.75 │ │
│ │ │ │ │ │ │
│ │[📅]Schedule │ │ │ 🟢 789 Pine St, Midtown │ │
│ │[💰]Payment │ │ │ 🔴 321 Elm Dr, Suburbs │ │
│ │[⚙️]Settings │ │ │ ─────────────────────────────────────────────────────────── │ │
│ └─────────────┘ │ │ [SJ] Sarah Johnson ⭐ 4.8 ⏱️ 25 min • 12.1 km │ │
│ │ └─────────────────────────────────────────────────────────────┘ │
│ │ │
│ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ │ [Premium] Jan 3 • 8:45 PM $42.00 │ │
│ │ │ │ │
│ │ │ 🟢 555 Broadway, Theater District │ │
│ │ │ 🔴 777 Park Ave, Upper East │ │
│ │ │ ─────────────────────────────────────────────────────────── │ │
│ │ │ [MC] Mike Chen ⭐ 5.0 ⏱️ 15 min • 6.8 km │ │
│ │ └─────────────────────────────────────────────────────────────┘ │
│ │ │
│ │ ┌─────────────────────────────────────────────────────────────┐ │
│ │ │ [More Trips...] │ │
│ │ └─────────────────────────────────────────────────────────────┘ │
└─────────────────┴───────────────────────────────────────────────────────────────────┘
\`\`\`

## 🛠️ Technical Implementation

### **Component Architecture**

\`\`\`
RideHailingApp (Main Component)
├── Header
│ ├── Brand Logo & Title
├── Sidebar
│ ├── Navigation (Tabs - Vertical)
│ ├── Quick Stats (Card)
│ └── Quick Actions (Card + Buttons)
└── Main Content (TabsContent)
├── Request Ride Tab
│ ├── Location Inputs (Card + Input + Label)
│ ├── Ride Type Selection (Cards + Badges)
│ └── Request Button
├── Live Tracking Tab
│ ├── Status Badge
│ ├── Trip Details (Card)
│ ├── Driver Info (Card + Avatar)
│ └── Action Buttons
└── Trip History Tab
├── Search Bar (Input + Button)
└── History List (ScrollArea + Cards)
\`\`\`

### **State Management**

- **`activeTab`** - Controls main navigation
- **`pickup/destination`** - Form input values
- **`selectedRideType`** - Ride type selection
- **`hasActiveRide`** - Controls live tracking availability

### **Data Structures**

\`\`\`typescript
interface Ride {
id: string
from: string
to: string
date: string
time: string
driver: {
name: string
rating: number
car: string
plate: string
photo: string
}
fare: number
status: RideStatus
type: RideType
duration: string
distance: string
}
\`\`\`

## 🎯 Key Features Implementation

### **Responsive Design**

- Grid-based layout with `lg:grid-cols-4` for desktop
- Responsive sidebar that adapts to screen size
- Mobile-friendly component sizing

### **Accessibility**

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly content
- High contrast color scheme

### **User Experience**

- Smooth transitions between tabs
- Visual feedback for selections
- Consistent spacing and typography
- Intuitive navigation flow

### **Component Variants Used**

- **Button**: `default`, `outline`, `ghost`, `destructive`
- **Badge**: `default`, `secondary`, `outline`
- **Card**: Standard with Header/Content structure
- **Tabs**: Vertical orientation for navigation

## 🚀 Getting Started

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for Production**
   \`\`\`bash
   npm run build
   \`\`\`

## 📦 Dependencies

- **Next.js** - React framework
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **TypeScript** - Type safety

## 🎨 Design System

The application follows shadcn/ui's design principles:

- **Consistent spacing** using Tailwind's spacing scale
- **Semantic color system** with CSS custom properties
- **Typography hierarchy** with proper font weights
- **Component composition** over customization
- **Accessibility-first** approach

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

**Built with ❤️ using shadcn/ui components**
