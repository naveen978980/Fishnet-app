# 🎣 Fishnet App - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [File Structure](#file-structure)
5. [Backend API](#backend-api)
6. [Frontend Components](#frontend-components)
7. [Database Schema](#database-schema)
8. [Token Economy System](#token-economy-system)
9. [Notification System](#notification-system)
10. [Configuration Files](#configuration-files)

---

## 🌊 Project Overview

**Fishnet** is a comprehensive mobile application for fishermen built with React Native and Expo. It helps fishermen track their catches, view fish migration patterns, manage their profile, and earn/spend tokens for accessing premium features.

### Tech Stack
- **Frontend**: React Native + Expo SDK 51
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Storage**: AsyncStorage (local) + MongoDB (cloud)
- **Notifications**: expo-notifications
- **Maps**: react-native-maps
- **Location**: expo-location
- **Image Handling**: expo-image-picker

---

## ✨ Features

### 1. Authentication System
- User registration with profile photo
- Secure login with JWT tokens
- Password hashing with bcrypt
- Session persistence with AsyncStorage

### 2. Profile Management
- User profile with photo
- Fields: Name, Email, Phone, License ID, Region, Experience, Boat Name
- Edit profile with zero validation (optional updates)
- Profile photo upload from camera or gallery
- Profile data fetched from MongoDB on every screen load

### 3. Token Economy System
- **Initial Tokens**: 800 tokens on signup
- **Earn Tokens**: +40 tokens per catch recorded
- **Spend Tokens**: -40 tokens per fish details viewed in Market
- Real-time token balance display in header
- Token transactions validated on backend
- Insufficient balance alerts

### 4. Catch Recording
- Record fish catches with details
- Fish type, weight, location, notes
- GPS location capture with expo-location
- Catch history stored in backend
- Automatic token reward on submission

### 5. Fish Market
- Browse fish species (free)
- View detailed fish migration patterns (costs tokens)
- Interactive maps showing:
  - Historical catch locations
  - Predicted future locations
  - Migration paths with confidence levels
- Fish species: Tuna, Mackerel, Sardine, Pomfret, Seer Fish, Anchovy

### 6. Notification System
- Push notifications for app events
- Badge count on notification icon
- Notification types:
  - 🪙 Tokens Earned
  - 💰 Tokens Spent
  - ✅ Profile Updated
  - 🎣 Fish Caught
  - ⚠️ Weather Alerts
- Notification history screen
- Mark all as read functionality
- Tap notification to navigate to relevant screen

### 7. Additional Screens
- **Home Screen**: Dashboard with catch statistics
- **Profile Screen**: View fisherman profile
- **Settings Screen**: App settings and profile edit
- **Update Screen**: App updates and news
- **Map Screen**: Full-screen map view

---

## 🏗️ Architecture

### Frontend Architecture
```
App.js (Root Component)
├── Authentication Flow
│   ├── LoginScreen
│   └── SignupScreen
├── Main Navigation (Bottom Tabs)
│   ├── Home Tab → HomeScreen
│   ├── Notifications Tab → NotificationsScreen
│   ├── Profile Tab → ProfileScreen1
│   ├── Record Tab → RecordCatchForm
│   ├── Market Tab → MarketScreen
│   └── Settings Tab → SettingsScreen
└── Modals/Overlays
    ├── EditProfileScreen
    ├── FullScreenMap
    └── UpdateScreen
```

### Backend Architecture
```
server-clean.js (Express Server)
├── MongoDB Connection
├── Middleware
│   ├── CORS
│   ├── Body Parser
│   └── Error Handlers
└── Routes
    └── /api/auth
        ├── POST /register
        ├── POST /login
        ├── GET /me
        ├── PUT /me
        ├── POST /logout
        ├── POST /tokens/earn
        └── POST /tokens/spend
```

---

## 📁 File Structure

### Root Directory
```
my-app/
├── App.js                      # Main application component
├── app.json                    # Expo configuration
├── package.json                # Dependencies and scripts
├── .gitignore                  # Git ignore rules
├── README.md                   # Project readme
├── DOCUMENTATION.md            # This file
└── HOW_TO_RUN.md              # Setup and run instructions
```

### Backend Files (`backend/`)
```
backend/
├── server-clean.js             # Express server entry point
├── package.json                # Backend dependencies
├── .env                        # Environment variables (MongoDB URI, JWT Secret)
├── models/
│   └── User.js                 # Mongoose User model with token field
├── routes/
│   └── auth.js                 # Authentication & token routes
└── update-tokens.js            # Script to update existing users' tokens
```

### Screens (`screens/`)
```
screens/
├── LoginScreen.js              # User login interface
├── SignupScreen.js             # User registration with 7 fields + photo
├── EditProfileScreen.js        # Profile editing (zero validation)
├── HomeScreen.js               # Dashboard with statistics
├── NotificationsScreen.js      # Notification history list
├── ProfileScreen1.js           # Fisherman profile display
├── UpdateScreen.js             # App updates and announcements
├── SettingsScreen.js           # Settings and profile management
├── MarketScreen.js             # Fish species explorer with maps
└── MapScreen.js                # Full-screen map view
```

### Components (`components/`)
```
components/
├── RecordCatchForm.js          # Catch recording form with GPS
└── FullScreenMap.js            # Full-screen map component
```

### Services (`services/`)
```
services/
├── api.js                      # API service utilities
└── notificationService.js      # Notification helper functions
```

### Configuration (`config/`)
```
config/
└── fishData.js                 # Fish species data and configurations
```

### Assets (`assets/`)
```
assets/
├── icon.png                    # App icon
├── splash-icon.png             # Splash screen icon
├── adaptive-icon.png           # Android adaptive icon
└── favicon.png                 # Web favicon
```

---

## 🔌 Backend API

### Base URL
```
http://10.47.177.52:3000
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Naveen Kumar",
  "email": "naveen@example.com",
  "password": "password123",
  "phone": "9876543210",
  "licenseId": "TN-FISH-2024-001",
  "region": "Tamil Nadu",
  "experience": 5,
  "boatName": "Sea King",
  "profilePhoto": "data:image/jpeg;base64,..."
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Naveen Kumar",
    "email": "naveen@example.com",
    "tokens": 800,
    ...
  }
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "naveen@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Naveen Kumar",
    "email": "naveen@example.com",
    "tokens": 800,
    ...
  }
}
```

#### 3. Get Current User Profile
```http
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "name": "Naveen Kumar",
    "email": "naveen@example.com",
    "phone": "9876543210",
    "tokens": 800,
    "profilePhoto": "data:image/jpeg;base64,...",
    ...
  }
}
```

#### 4. Update User Profile
```http
PUT /api/auth/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Naveen Kumar Updated",
  "phone": "9876543211",
  "profilePhoto": "data:image/jpeg;base64,..."
}

Response:
{
  "success": true,
  "data": {
    "name": "Naveen Kumar Updated",
    "tokens": 800,
    ...
  }
}
```

### Token Economy Endpoints

#### 5. Earn Tokens
```http
POST /api/auth/tokens/earn
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 40,
  "reason": "recording catch"
}

Response:
{
  "success": true,
  "message": "40 tokens earned for recording catch",
  "tokens": 840
}
```

#### 6. Spend Tokens
```http
POST /api/auth/tokens/spend
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 40,
  "reason": "viewing Tuna details"
}

Response (Success):
{
  "success": true,
  "message": "40 tokens spent for viewing Tuna details",
  "tokens": 800
}

Response (Insufficient):
{
  "success": false,
  "error": "Insufficient tokens",
  "currentTokens": 30,
  "required": 40
}
```

---

## 🗂️ Frontend Components

### 1. App.js (Main Component)
**Purpose**: Root component managing authentication, navigation, and global state

**Key State Variables**:
- `isLoggedIn`: Authentication status
- `userToken`: JWT token
- `userName`: Current user's name
- `userTokens`: Token balance (default: 800)
- `notificationCount`: Unread notification count
- `notificationHistory`: Array of all notifications
- `activeTab`: Current active tab ('Home', 'Profile', 'Market', etc.)

**Key Functions**:
- `handleLogin()`: Process user login
- `handleSignup()`: Process user registration
- `handleLogout()`: Clear session and logout
- `earnTokens(amount, reason)`: Award tokens to user
- `spendTokens(amount, reason)`: Deduct tokens from user
- `addNotificationToHistory()`: Add notification to history
- `setupNotifications()`: Initialize push notifications

**Features**:
- JWT authentication flow
- Bottom tab navigation
- Token balance display in header (🪙 800)
- Notification badge with count
- Profile photo display in header
- AsyncStorage for session persistence

---

### 2. LoginScreen.js
**Purpose**: User authentication interface

**Fields**:
- Email (email input)
- Password (secure text)

**Functions**:
- Validates credentials
- Calls `onLogin()` prop with credentials
- Switches to signup screen

**UI Elements**:
- Logo/title
- Email input field
- Password input field
- Login button
- "Don't have an account? Sign up" link

---

### 3. SignupScreen.js
**Purpose**: New user registration with comprehensive profile setup

**Fields** (7 total):
1. **Name** - Required
2. **Email** - Required
3. **Password** - Required (minimum 6 characters)
4. **Phone** - Optional, phone-pad keyboard
5. **License ID** - Optional, auto-generated fallback
6. **Region** - Dropdown with 12 Indian coastal regions
7. **Experience** - Numeric input (years)
8. **Boat Name** - Optional text
9. **Profile Photo** - Camera/gallery picker

**Regions Dropdown**:
- Gujarat, Maharashtra, Goa, Karnataka
- Kerala, Tamil Nadu, Puducherry
- Andhra Pradesh, Odisha, West Bengal
- Andaman & Nicobar, Lakshadweep

**Profile Photo**:
- Uses expo-image-picker
- Options: Take photo or Choose from gallery
- Converts to base64 data URI
- Displays preview before upload

**Validation**:
- Name required
- Email required (email format)
- Password required (min 6 chars)
- Other fields optional

---

### 4. EditProfileScreen.js
**Purpose**: Edit user profile information

**Key Feature**: **Zero Validation** - All fields optional!

**Fields** (All Optional):
- Name
- Email (disabled, non-editable)
- Phone
- License ID
- Region (dropdown)
- Experience
- Boat Name
- Profile Photo

**Functions**:
- Pre-fills with current userData
- No validation on save
- Calls `onSave()` with updated data
- Calls `onCancel()` to close modal

**Modal Behavior**:
- Full screen overlay
- Scrollable content
- Save/Cancel buttons
- No asterisks on labels (all optional)

---

### 5. HomeScreen.js
**Purpose**: Dashboard showing catch statistics and overview

**Displays**:
- Welcome message with userName
- Total catches count
- Recent catch activity
- Quick access buttons
- Statistics cards

---

### 6. ProfileScreen1.js
**Purpose**: Display fisherman profile with MongoDB data

**Data Source**: Fetches from `GET /api/auth/me` on mount

**Displays**:
- Profile photo (120x120, circular)
- Name and email
- Phone number
- License ID
- Region
- Experience (years)
- Boat name
- Token balance

**Features**:
- Auto-refresh on mount
- Loading indicator while fetching
- Updates AsyncStorage with fresh data
- Error handling for failed fetch

**MongoDB Integration**:
```javascript
const fetchUserProfile = async () => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  setUserData(data.data); // Direct from data.data
};
```

---

### 7. SettingsScreen.js
**Purpose**: App settings and profile management

**Sections**:
1. **Profile Section**
   - Profile photo (80x80)
   - Name and email
   - Edit Profile button

2. **Settings Options**
   - Account settings
   - Notification preferences
   - Privacy settings
   - About app
   - Logout button

**MongoDB Integration**:
- Fetches profile on mount
- Updates AsyncStorage
- Shows loading state

---

### 8. MarketScreen.js
**Purpose**: Fish species explorer with migration patterns

**Free Features**:
- Browse all fish species
- See fish names and scientific names
- View fish emojis and images

**Paid Features** (40 tokens per fish):
- Detailed migration maps
- Historical catch locations (blue markers)
- Predicted future locations (green markers with confidence)
- Migration path visualization (polylines)
- Current fishing zones (circles with radius)

**Fish Species**:
1. 🐟 Tuna (Thunnus)
2. 🐠 Mackerel (Scomber)
3. 🐡 Sardine (Sardinella)
4. 🦈 Pomfret (Pampus)
5. 🐟 Seer Fish (Scomberomorus)
6. 🐠 Anchovy (Engraulis)

**Token Integration**:
```javascript
const openFishMap = async (fish) => {
  const success = await spendTokens(40, `viewing ${fish.name} details`);
  if (success) {
    setSelectedFish(fish);
    setMapVisible(true);
    Alert.alert(`${fish.emoji} ${fish.name} Details`, 
      `You can now view migration patterns!\n\n-40 tokens spent 🪙`);
  }
};
```

**Map Features**:
- Interactive MapView from react-native-maps
- Markers for historical data
- Polylines showing migration paths
- Circles for current zones
- Color-coded by fish species
- Confidence levels for predictions

---

### 9. NotificationsScreen.js
**Purpose**: Display notification history

**Props**:
- `notifications`: Array of notification objects
- `onMarkAllRead`: Function to mark all as read

**Notification Object Structure**:
```javascript
{
  id: 1234567890,
  icon: '🪙',
  title: 'Tokens Earned!',
  message: 'You earned +40 tokens! New balance: 840 🪙',
  timestamp: 'Just now',
  unread: true
}
```

**Features**:
- Scrollable list of notifications
- Unread indicator (green dot)
- Mark all as read button
- Empty state when no notifications
- Sorted by newest first

**Notification Types**:
- 🪙 Tokens Earned
- 💰 Tokens Spent
- ✅ Profile Updated
- 🎣 Catch Recorded
- ⚠️ Weather Alerts

---

### 10. RecordCatchForm.js (Component)
**Purpose**: Form for recording fish catches

**Fields**:
- Fish Type (dropdown)
- Weight (numeric, kg)
- Location (GPS auto-capture)
- Notes (textarea)

**Features**:
- GPS location button
- Real-time location capture
- Form validation
- Token reward on submission (+40 tokens)
- Success notification

**Token Integration**:
```javascript
const handleSubmit = async () => {
  // Submit catch to API
  await submitCatch(catchData);
  
  // Award tokens
  await earnTokens(40, 'recording catch');
  
  // Show success alert
  Alert.alert('Success! 🎣', 
    'Your catch has been recorded!\n\n+40 tokens earned! 🪙');
};
```

---

## 🗄️ Database Schema

### User Model (`backend/models/User.js`)

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    select: false  // Excluded from queries by default
  },
  phone: {
    type: String,
    trim: true
  },
  licenseId: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },
  region: {
    type: String,
    trim: true
  },
  boatName: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    default: 0
  },
  profilePhoto: {
    type: String,
    trim: true
  },
  tokens: {
    type: Number,
    default: 800  // Users start with 800 tokens
  },
  role: {
    type: String,
    enum: ['fisherman', 'researcher', 'admin'],
    default: 'fisherman'
  },
  verified: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  stats: {
    totalCatches: { type: Number, default: 0 },
    totalWeight: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- email (unique)
- licenseId (unique, sparse)

**Methods**:
- `comparePassword(password)`: Compare hashed passwords
- `getProfile()`: Get user profile without sensitive data

**Pre-save Hook** (Mongoose v8 compatible):
```javascript
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
```

---

## 🪙 Token Economy System

### Overview
The token system gamifies the app experience and creates a sustainable economy for accessing premium features.

### Token Flow

#### Initial Balance
- **New Users**: 800 tokens on signup
- **Stored**: MongoDB `tokens` field

#### Earning Tokens (+40)
**Trigger**: Recording a fish catch
```javascript
// In App.js handleCatchSubmit
await earnTokens(40, 'recording catch');
```

**Backend Process**:
1. Verify JWT token
2. Find user in database
3. Increment `tokens` field by 40
4. Save to database
5. Return new balance

**Frontend Process**:
1. Call API endpoint
2. Update `userTokens` state
3. Update userData in state
4. Save to AsyncStorage
5. Send local notification
6. Add to notification history
7. Show success alert

#### Spending Tokens (-40)
**Trigger**: Viewing fish details in Market
```javascript
// In MarketScreen openFishMap
const success = await spendTokens(40, `viewing ${fishName} details`);
```

**Backend Validation**:
1. Verify JWT token
2. Find user in database
3. Check if `user.tokens >= amount`
4. If yes: Deduct tokens, save, return success
5. If no: Return error with current balance

**Frontend Process**:
1. Call API endpoint
2. If success:
   - Update `userTokens` state
   - Update userData
   - Save to AsyncStorage
   - Send notification
   - Add to history
   - Show fish details
3. If insufficient:
   - Show alert: "You need 40 tokens. Current balance: X"

### Token Display
**Header**: Live balance shown as `🪙 800`
```javascript
<Text style={styles.coinsHeaderText}>
  {userTokens.toLocaleString()}
</Text>
```

**Updates**: Real-time on every transaction

### Balance Persistence
- **LocalStorage**: AsyncStorage (userData.tokens)
- **Database**: MongoDB (User.tokens)
- **Sync**: On login, profile fetch, and every transaction

---

## 🔔 Notification System

### Architecture

#### Local Notifications
Uses `expo-notifications` for in-app notifications

**Setup** (`App.js`):
```javascript
import * as Notifications from 'expo-notifications';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

#### Notification Service (`services/notificationService.js`)

**Functions**:
1. `registerForPushNotificationsAsync()`: Get permissions
2. `sendLocalNotification(title, body, data)`: Send notification
3. `schedulePushNotification(title, body, trigger, data)`: Schedule future
4. `FishnetNotifications`: Pre-configured notification templates

**Templates**:
```javascript
FishnetNotifications.fishCaught(fishType, weight, userName);
FishnetNotifications.profileUpdated(userName);
FishnetNotifications.weatherAlert(message, userName);
FishnetNotifications.dataSynced(count, userName);
FishnetNotifications.dailyReminder(userName);
```

### Notification Types

#### 1. Token Earned (🪙)
**Trigger**: After recording a catch
```javascript
await sendLocalNotification(
  '🪙 Tokens Earned!',
  `You earned +40 tokens! New balance: 840 🪙`,
  { type: 'token_change', action: 'earned', amount: 40 }
);
```

#### 2. Token Spent (💰)
**Trigger**: After viewing fish details
```javascript
await sendLocalNotification(
  '💰 Tokens Spent',
  `You spent -40 tokens for viewing Tuna details. Remaining: 800 🪙`,
  { type: 'token_change', action: 'spent', amount: 40 }
);
```

#### 3. Profile Updated (✅)
**Trigger**: After saving profile changes
```javascript
await FishnetNotifications.profileUpdated(userName);
```

### Notification Badge

**Badge Count State**:
```javascript
const [notificationCount, setNotificationCount] = useState(0);
```

**Increment on Receive**:
```javascript
notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  setNotificationCount(prev => prev + 1);
  Notifications.setBadgeCountAsync(notificationCount + 1);
});
```

**Reset on Tap**:
```javascript
onPress={() => {
  setActiveTab('Notifications');
  setNotificationCount(0);
  Notifications.setBadgeCountAsync(0);
}}
```

**Display**:
```javascript
{notificationCount > 0 && (
  <View style={styles.notificationBadge}>
    <Text>{notificationCount}</Text>
  </View>
)}
```

### Notification History

**Storage**:
```javascript
const [notificationHistory, setNotificationHistory] = useState([]);
```

**Add to History**:
```javascript
const addNotificationToHistory = (icon, title, message) => {
  const newNotification = {
    id: Date.now(),
    icon,
    title,
    message,
    timestamp: 'Just now',
    unread: true,
  };
  setNotificationHistory(prev => [newNotification, ...prev]);
};
```

**Display in Screen**:
```javascript
<NotificationsScreen 
  notifications={notificationHistory}
  onMarkAllRead={markAllNotificationsRead}
/>
```

### Notification Tap Handler
```javascript
responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  const data = response.notification.request.content.data;
  
  if (data.type === 'fish_caught') {
    setActiveTab('Home');
  } else if (data.type === 'profile_update') {
    setActiveTab('Profile');
  } else if (data.type === 'token_change') {
    setActiveTab('Profile');
  }
});
```

---

## ⚙️ Configuration Files

### 1. app.json (Expo Configuration)
```json
{
  "expo": {
    "name": "my-app",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "RECEIVE_BOOT_COMPLETED",
        "VIBRATE",
        "POST_NOTIFICATIONS"
      ],
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    },
    "notification": {
      "icon": "./assets/icon.png",
      "color": "#2196F3",
      "androidMode": "default"
    },
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/icon.png",
          "color": "#2196F3"
        }
      ]
    ]
  }
}
```

### 2. package.json (Frontend Dependencies)
```json
{
  "dependencies": {
    "expo": "^51.0.0",
    "react": "18.2.0",
    "react-native": "0.74.5",
    "expo-status-bar": "~1.12.1",
    "expo-location": "~17.0.1",
    "expo-notifications": "~0.29.14",
    "expo-device": "~7.0.3",
    "expo-constants": "~17.0.3",
    "expo-image-picker": "~15.0.7",
    "@react-native-async-storage/async-storage": "1.23.1",
    "@react-native-picker/picker": "2.11.4",
    "react-native-maps": "1.14.0",
    "react-native-screens": "4.23.0"
  }
}
```

### 3. backend/.env (Environment Variables)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fishnet
JWT_SECRET=fishnet_secret_key_2026
JWT_EXPIRE=30d
PORT=3000
```

**Security Notes**:
- Never commit `.env` to Git
- `.env` is in `.gitignore`
- Use strong JWT_SECRET in production
- Rotate secrets regularly

### 4. .gitignore
```
# Dependencies
node_modules/
backend/node_modules/

# Environment variables
.env
.env.local
.env*.local
backend/.env

# Expo
.expo/
.expo-shared/
dist/
web-build/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build output
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
```

---

## 🔐 Security Features

### 1. Password Security
- **Hashing**: bcrypt with salt rounds 10
- **Pre-save Hook**: Automatic hashing before database save
- **Exclusion**: Password field excluded from queries (`select: false`)

### 2. JWT Authentication
- **Token Generation**: jwt.sign() with 30-day expiration
- **Token Verification**: Middleware validates all protected routes
- **Storage**: AsyncStorage on client, never in plain text

### 3. API Security
- **CORS**: Enabled for cross-origin requests
- **Validation**: Input validation on all endpoints
- **Error Handling**: Sanitized error messages to clients
- **Rate Limiting**: (Recommended for production)

### 4. Data Privacy
- **Sensitive Data**: Password never sent in API responses
- **Profile Photos**: Stored as base64, not accessible via direct URL
- **User Isolation**: Users can only access their own data

---

## 📊 State Management

### App-Level State (App.js)
```javascript
// Authentication
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userToken, setUserToken] = useState('');
const [userId, setUserId] = useState('');
const [userName, setUserName] = useState('');
const [userData, setUserData] = useState({});

// UI State
const [activeTab, setActiveTab] = useState('Home');
const [showSignup, setShowSignup] = useState(false);
const [showEditProfile, setShowEditProfile] = useState(false);

// Token Economy
const [userTokens, setUserTokens] = useState(800);

// Notifications
const [notificationCount, setNotificationCount] = useState(0);
const [notificationHistory, setNotificationHistory] = useState([]);

// Profile
const [profilePhoto, setProfilePhoto] = useState(null);

// Form States
const [catchFishType, setCatchFishType] = useState('');
const [catchWeight, setCatchWeight] = useState('');
const [catchLocation, setCatchLocation] = useState('');
```

### Local Storage (AsyncStorage)
**Stored Keys**:
- `authToken`: JWT token
- `userId`: User MongoDB ID
- `userName`: User's name
- `userData`: Full user object (JSON)
- `profilePhoto`: Base64 image data

**Persistence**:
- Checked on app launch
- Updated on login
- Updated on profile changes
- Cleared on logout

---

## 🚀 Performance Optimizations

### 1. Image Handling
- Base64 encoding for offline access
- Compressed before upload
- Cached in AsyncStorage
- Lazy loading in lists

### 2. API Calls
- Debounced search inputs
- Cached responses in AsyncStorage
- Loading states for UX
- Error boundaries for failures

### 3. Map Rendering
- Only load visible markers
- Simplified polylines
- Cached map tiles
- Lazy load map components

### 4. Notification System
- Local notifications (no server dependency)
- Batch updates
- Efficient badge counting
- Cleanup on unmount

---

## 🧪 Testing Scenarios

### 1. Authentication Flow
- ✅ New user signup with all fields
- ✅ Login with correct credentials
- ✅ Login with wrong password
- ✅ Session persistence after app restart
- ✅ Logout clears all data

### 2. Token Economy
- ✅ Start with 800 tokens
- ✅ Earn 40 tokens on catch record
- ✅ Spend 40 tokens to view fish
- ✅ Insufficient token error handling
- ✅ Token balance persists across sessions

### 3. Profile Management
- ✅ Upload profile photo from camera
- ✅ Upload profile photo from gallery
- ✅ Edit profile with partial updates
- ✅ Photo displays in 3 locations (header, settings, profile)
- ✅ Profile data fetches from MongoDB

### 4. Notifications
- ✅ Badge count increments on notification
- ✅ Badge resets when opening notifications
- ✅ Notifications appear in history
- ✅ Mark all as read works
- ✅ Tap notification navigates to screen

### 5. Market Features
- ✅ Browse fish for free
- ✅ View fish details costs 40 tokens
- ✅ Maps show correct data
- ✅ Multiple fish can be viewed
- ✅ Insufficient tokens prevents access

---

## 📱 Cross-Platform Compatibility

### Android
- ✅ Notifications work with badge
- ✅ Location permissions handled
- ✅ Camera/gallery picker works
- ✅ Maps render correctly
- ✅ AsyncStorage works

### iOS
- ⚠️ Push notifications need Apple Developer account
- ✅ Location permissions handled
- ✅ Camera/gallery picker works
- ✅ Maps render correctly
- ✅ AsyncStorage works

### Expo Go Limitations
- ⚠️ Remote push notifications not available (use development build)
- ✅ Local notifications work fine
- ✅ All other features work

---

## 🐛 Known Issues & Solutions

### 1. Notification removeNotificationSubscription Error
**Issue**: `Notifications.removeNotificationSubscription is not a function`
**Solution**: Use `.remove()` method instead
```javascript
// Old (deprecated)
Notifications.removeNotificationSubscription(listener);

// New (correct)
listener.remove();
```

### 2. Network Request Failed
**Issue**: Backend not running
**Solution**: Start backend server first
```bash
cd backend
node server-clean.js
```

### 3. Mongoose Schema Index Warnings
**Issue**: Duplicate schema index warnings
**Solution**: Warnings are harmless, can be ignored or fixed by removing one index definition

### 4. Port Already in Use
**Issue**: Port 3000 or 8081 already in use
**Solution**: Kill existing processes
```powershell
Stop-Process -Name "node" -Force
```

---

## 🎯 Future Enhancements

### Suggested Features
1. **Weather Integration**: Real-time weather alerts
2. **Social Features**: Share catches with community
3. **Leaderboards**: Top fishermen rankings
4. **Catch Analytics**: Charts and statistics
5. **Offline Mode**: Full offline functionality
6. **Multi-language**: Support regional languages
7. **Token Shop**: Spend tokens on virtual goods
8. **Premium Subscription**: Monthly plans
9. **Fish Recognition**: AI-based fish identification
10. **Route Planning**: Suggest best fishing routes

### Technical Improvements
1. **Backend Optimization**: Redis caching
2. **Database**: Indexes optimization
3. **Authentication**: Refresh tokens
4. **Testing**: Unit and integration tests
5. **CI/CD**: Automated deployment
6. **Monitoring**: Error tracking (Sentry)
7. **Analytics**: User behavior tracking
8. **Push Notifications**: Server-side with FCM
9. **Image CDN**: Cloudinary integration
10. **API Versioning**: v1, v2 endpoints

---

## 📞 Support & Contact

For issues, questions, or contributions:
- **GitHub**: [Fishnet-app](https://github.com/naveen978980/Fishnet-app)
- **Email**: liongamertamil@gmail.com
- **Developer**: Naveen Kumar

---

## 📄 License

This project is developed for educational purposes.

---

**Last Updated**: February 8, 2026
**Version**: 1.0.0
**Documentation Version**: 1.0
