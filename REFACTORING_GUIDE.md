# FISHNET App - Refactored Structure

## 📁 Project Structure

The app has been refactored to separate concerns into individual screen and component files for better maintainability.

```
my-app/
├── App.js                          # Main app entry point (refactored)
├── App_Backup.js                   # Backup of original App.js
├── App_New.js                      # New refactored version (deployed to App.js)
│
├── screens/                        # All screen components
│   ├── LoginScreen.js              # Login authentication screen
│   ├── SignupScreen.js             # User registration screen
│   ├── HomeScreen.js               # Main dashboard with map, weather, etc.
│   ├── NotificationsScreen.js      # Notifications feed
│   ├── ProfileScreen.js            # Fisherman profile and stats
│   └── UpdateScreen.js             # Record catch form (modern UI)
│
├── components/                     # Reusable components
│   ├── RecordCatchForm.js          # Detailed catch recording form
│   └── FullScreenMap.js            # Full-screen interactive map modal
│
├── config/
│   └── fishData.js                 # Fish data configuration
│
├── services/
│   └── api.js                      # API service layer
│
└── backend/                        # Backend server
    ├── server.js                   # Express server
    └── data/
        └── catches.json            # Catch records storage
```

## 🎯 Screen Components

### 1. **LoginScreen.js**
- User authentication interface
- Email and password inputs
- Switch to signup functionality
- Props: `email`, `setEmail`, `password`, `setPassword`, `onLogin`, `onSwitchToSignup`

### 2. **SignupScreen.js**
- New user registration
- Name, email, and password inputs
- Switch to login functionality
- Props: `name`, `setName`, `email`, `setEmail`, `password`, `setPassword`, `onSignup`, `onSwitchToLogin`

### 3. **HomeScreen.js**
- Main dashboard view
- Coins/Rewards card
- What's New Today banner
- Interactive map preview (7 fishing locations)
- Weather conditions card
- Ready to Dive In section
- Ocean Insight section
- About FISHNET section
- Props: `onMapPress` (opens full-screen map)

### 4. **NotificationsScreen.js**
- Displays 7 notification items
- Unread/read status indicators
- Mark all as read functionality
- Icons for different notification types
- No props needed (self-contained)

### 5. **ProfileScreen.js**
- Fisherman profile information
- License ID, phone, region, experience
- Boat details
- Fish tracking project summary
- Props: `userName`

### 6. **UpdateScreen.js**
- Modern record catch interface
- Two-column form layout
- GPS location tracking
- Stats display (Today's Total, This Week, Best Catch)
- Props: `catchFishType`, `setCatchFishType`, `catchQuantity`, `setCatchQuantity`, `catchWeight`, `setCatchWeight`, `catchLocation`, `isGettingLocation`, `isSubmitting`, `onGetLocation`, `onSubmit`

## 🧩 Component Files

### 1. **RecordCatchForm.js**
- Detailed catch recording form
- Fish type, weight, length, quantity inputs
- GPS location with auto-fetch
- Notes/additional details
- Backend API integration
- Props: `onSuccess` (callback after successful submission)

### 2. **FullScreenMap.js**
- Full-screen interactive map
- 7 fishing location markers with different colors
- Circular back button (positioned above navbar)
- Bottom legend with location count
- Props: `onClose` (closes the map)

## 🗺️ Fishing Locations Data

The app includes 7 fishing hotspots near Chennai:

1. **Marina Beach** (Green pin)
   - Latitude: 13.0500, Longitude: 80.2809
   - Good for Mackerel

2. **Kovalam Beach** (Blue pin)
   - Latitude: 12.7897, Longitude: 80.2538
   - Tuna & Barracuda

3. **Ennore Creek** (Orange pin)
   - Latitude: 13.2239, Longitude: 80.3066
   - Pomfret & Snapper

4. **Mahabalipuram Shore** (Purple pin)
   - Latitude: 12.6208, Longitude: 80.1989
   - Sardines & Prawns

5. **Pulicat Lake** (Red pin)
   - Latitude: 13.4167, Longitude: 80.3167
   - Mullet & Catfish

6. **Royapuram Harbor** (Cyan pin)
   - Latitude: 13.1147, Longitude: 80.2906
   - Various species

7. **Kasimedu Harbor** (Yellow pin)
   - Latitude: 13.1187, Longitude: 80.2944
   - Fresh catch daily

## 🎨 Design System

### Colors
- Primary Green: `#4CAF50`
- Background: `#F5F6F8`
- White: `#FFFFFF`
- Dark Text: `#1F2937`
- Gray Text: `#6B7280`
- Light Gray: `#F3F4F6`
- Border: `#E5E7EB`

### Typography
- Headings: Bold, 22-28px
- Body: Regular, 14-16px
- Labels: Semi-bold, 13-14px

## 🚀 Benefits of Refactoring

### ✅ **Better Organization**
- Each screen is in its own file
- Easy to locate and modify specific features
- Cleaner file structure

### ✅ **Improved Maintainability**
- Smaller, focused files (150-400 lines vs 2700+ lines)
- Easier to debug issues
- Simplified testing

### ✅ **Reusability**
- Components can be imported anywhere
- Screens can be reused in different navigation flows
- Shared styling patterns

### ✅ **Team Collaboration**
- Multiple developers can work on different screens
- Reduced merge conflicts
- Clear ownership of features

### ✅ **Performance**
- Potential for code splitting
- Lazy loading capabilities
- Better tree shaking

## 📝 Usage Example

```javascript
import HomeScreen from './screens/HomeScreen';
import FullScreenMap from './components/FullScreenMap';

// In your App.js
<HomeScreen onMapPress={() => setShowFullScreenMap(true)} />

{showFullScreenMap && (
  <FullScreenMap onClose={() => setShowFullScreenMap(false)} />
)}
```

## 🔄 State Management

The main `App.js` still manages global state:
- Authentication state (`isLoggedIn`, `email`, `password`, `name`)
- Navigation state (`activeTab`)
- Catch form state (`catchFishType`, `catchQuantity`, etc.)
- Modal state (`showFullScreenMap`)

Each screen receives only the props it needs, following the principle of **prop drilling** for now. For larger apps, consider:
- Context API
- Redux
- Zustand
- MobX

## 🛠️ Running the App

1. **Start Expo Dev Server:**
   ```bash
   npx expo start --port 8083
   ```

2. **Start Backend API:**
   ```bash
   cd backend
   npm start
   ```

3. **Scan QR code** with Expo Go app on your phone

## 📦 Dependencies

- `react-native-maps` - Interactive maps with markers
- `expo-location` - GPS location tracking
- `expo-status-bar` - Status bar configuration

## 🎯 Next Steps

Potential improvements:
- [ ] Add React Navigation for better routing
- [ ] Implement Context API for global state
- [ ] Add TypeScript for type safety
- [ ] Create custom hooks for location and API calls
- [ ] Add unit tests for each component
- [ ] Implement offline storage with AsyncStorage
- [ ] Add image upload for catch photos

## 📄 File Sizes

Original `App.js`: ~2,700 lines

Refactored files:
- `App.js`: ~330 lines
- `HomeScreen.js`: ~460 lines
- `UpdateScreen.js`: ~360 lines
- `NotificationsScreen.js`: ~180 lines
- `ProfileScreen.js`: ~130 lines
- `LoginScreen.js`: ~160 lines
- `SignupScreen.js`: ~160 lines
- `RecordCatchForm.js`: ~320 lines
- `FullScreenMap.js`: ~140 lines

**Total: ~2,240 lines** (distributed across 9 files)

## ⚠️ Important Notes

- Original `App.js` backed up as `App_Backup.js`
- All functionality preserved from original
- No breaking changes to user experience
- Backend API URL: `http://10.47.177.52:3000/api/catches`

---

**Created:** February 8, 2026  
**Version:** 2.0  
**Author:** FISHNET Development Team
