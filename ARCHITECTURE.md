# FISHNET App Architecture

## Component Hierarchy

```
App.js (Main Container)
│
├── LoginScreen (if not logged in & !showSignup)
│   └── Props: email, password, setters, onLogin, onSwitchToSignup
│
├── SignupScreen (if not logged in & showSignup)
│   └── Props: name, email, password, setters, onSignup, onSwitchToLogin
│
└── Dashboard (if logged in)
    │
    ├── Header
    │   ├── Greeting & User Name
    │   ├── Notification Button (badge: 5)
    │   └── Avatar Button
    │
    ├── ScrollView (Content Area)
    │   │
    │   ├── HomeScreen (activeTab === 'Home')
    │   │   ├── Coins/Rewards Card (2,450 coins)
    │   │   ├── What's New Banner
    │   │   ├── Map Section
    │   │   │   ├── MapView (preview)
    │   │   │   └── 7 Fishing Markers
    │   │   ├── Weather Card
    │   │   ├── Dive In Section
    │   │   ├── Ocean Insight
    │   │   └── About FISHNET
    │   │
    │   ├── NotificationsScreen (activeTab === 'Notifications')
    │   │   ├── Header with "Mark all as read"
    │   │   └── 7 Notification Items
    │   │
    │   ├── ProfileScreen (activeTab === 'Profile')
    │   │   ├── Fisherman Profile Card
    │   │   └── Fish Tracking Summary
    │   │
    │   ├── UpdateScreen (activeTab === 'Update')
    │   │   ├── Coins/Rewards Card
    │   │   ├── Modern Catch Card
    │   │   │   ├── Two-Column Form
    │   │   │   ├── GPS Location Button
    │   │   │   ├── Stats Display
    │   │   │   └── Submit Button
    │   │
    │   └── RecordCatchForm (activeTab === 'RecordCatch')
    │       ├── Fish Type Input
    │       ├── Weight Input
    │       ├── Length Input
    │       ├── Quantity Input
    │       ├── Location (GPS)
    │       ├── Notes TextArea
    │       └── Submit Button
    │
    ├── Bottom Navigation Bar
    │   ├── Home Tab
    │   ├── Update Tab
    │   ├── Market Tab
    │   ├── Logout Tab
    │   └── Profile Tab
    │
    └── FullScreenMap Modal (if showFullScreenMap)
        ├── Full MapView
        ├── 7 Fishing Markers
        ├── Circular Back Button
        └── Bottom Legend
```

## Data Flow

```
App.js State
│
├── Authentication
│   ├── isLoggedIn → determines which screen to show
│   ├── showSignup → toggles Login/Signup
│   ├── email, password, name → form values
│   └── handleLogin(), handleSignup(), handleLogout()
│
├── Navigation
│   ├── activeTab → controls which screen is visible
│   └── setActiveTab() → navigation between screens
│
├── Catch Form (Update Screen)
│   ├── catchFishType, catchQuantity, catchWeight, catchLocation
│   ├── isGettingLocation, isSubmitting → loading states
│   ├── getCatchLocation() → fetch GPS coordinates
│   └── submitCatchRecord() → POST to backend API
│
└── Map Modal
    ├── showFullScreenMap → controls modal visibility
    └── setShowFullScreenMap() → open/close map
```

## Screen Navigation Flow

```
Start
  │
  ├─→ Not Logged In
  │     │
  │     ├─→ LoginScreen
  │     │     │
  │     │     ├─→ Click "Sign Up" → SignupScreen
  │     │     └─→ Click "Login" → Dashboard
  │     │
  │     └─→ SignupScreen
  │           │
  │           ├─→ Click "Login" → LoginScreen
  │           └─→ Click "Sign Up" → Dashboard
  │
  └─→ Logged In → Dashboard
        │
        ├─→ Home Tab → HomeScreen
        │     └─→ Tap Map → FullScreenMap Modal
        │           └─→ Tap Back → HomeScreen
        │
        ├─→ Update Tab → UpdateScreen
        │     └─→ Submit Catch → Success Alert
        │
        ├─→ Market Tab → (Not implemented)
        │
        ├─→ Logout Tab → LoginScreen
        │
        └─→ Profile Tab → ProfileScreen
```

## File Dependencies

```
App.js
  ├── imports screens/LoginScreen.js
  ├── imports screens/SignupScreen.js
  ├── imports screens/HomeScreen.js
  │     └── imports react-native-maps
  ├── imports screens/NotificationsScreen.js
  ├── imports screens/ProfileScreen.js
  ├── imports screens/UpdateScreen.js
  ├── imports components/RecordCatchForm.js
  │     └── imports expo-location
  └── imports components/FullScreenMap.js
        └── imports react-native-maps
```

## API Integration

```
Backend Server (Port 3000)
  │
  ├── Endpoint: POST /api/catches
  │     │
  │     ├── Called by: RecordCatchForm.js
  │     ├── Called by: UpdateScreen.js (via submitCatchRecord)
  │     │
  │     ├── Request Body:
  │     │   {
  │     │     fishType: string,
  │     │     weight: number,
  │     │     quantity: number,
  │     │     location: string,
  │     │     date: string,
  │     │     time: string,
  │     │     notes: string (optional)
  │     │   }
  │     │
  │     └── Response:
  │         {
  │           success: boolean,
  │           message: string,
  │           data: object
  │         }
  │
  └── Storage: backend/data/catches.json
```

## Key Features by Screen

### LoginScreen
- ✅ Email/Password authentication
- ✅ "Forgot Password" link
- ✅ Switch to Signup
- ✅ Modern card UI

### SignupScreen
- ✅ Name, Email, Password inputs
- ✅ Account creation
- ✅ Switch to Login
- ✅ Modern card UI

### HomeScreen
- ✅ Rewards card (2,450 coins)
- ✅ What's New banner with stats
- ✅ Interactive map preview
- ✅ 7 fishing location markers
- ✅ Weather card (Chennai)
- ✅ AQI indicator
- ✅ Dive In CTA section
- ✅ Ocean Insight section
- ✅ About FISHNET section

### NotificationsScreen
- ✅ 7 notifications
- ✅ Unread indicators (3 unread)
- ✅ "Mark all as read" button
- ✅ Timestamps
- ✅ Icon-based categories

### ProfileScreen
- ✅ Fisherman details (name, license, phone)
- ✅ Region, experience, boat name
- ✅ Project summary stats
- ✅ Unique fish types count
- ✅ Last sync info

### UpdateScreen
- ✅ Rewards card
- ✅ Two-column form layout
- ✅ GPS location tracking
- ✅ Real-time stats (Today, Week, Best)
- ✅ Modern card design

### RecordCatchForm
- ✅ Fish type, weight, length, quantity
- ✅ Auto GPS location fetch
- ✅ Notes/additional details
- ✅ Backend API integration
- ✅ Success callback

### FullScreenMap
- ✅ Full-screen interactive map
- ✅ 7 color-coded markers
- ✅ Circular back button
- ✅ Bottom legend
- ✅ Touch to explore

## Color-Coded Markers

| Location | Color | Pin Code |
|----------|-------|----------|
| Marina Beach | Green | #4CAF50 |
| Kovalam Beach | Blue | #2196F3 |
| Ennore Creek | Orange | #FF9800 |
| Mahabalipuram | Purple | #9C27B0 |
| Pulicat Lake | Red | #F44336 |
| Royapuram Harbor | Cyan | #00BCD4 |
| Kasimedu Harbor | Yellow | #FFEB3B |

---

This architecture provides a clean separation of concerns with each screen responsible for its own UI and logic, while the main App.js handles global state and navigation.
