# 📦 Fishnet App - Package Installation Guide

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Frontend Packages](#frontend-packages)
3. [Backend Packages](#backend-packages)
4. [Installation Commands](#installation-commands)
5. [Package Purposes](#package-purposes)
6. [Version Compatibility](#version-compatibility)
7. [Troubleshooting](#troubleshooting)

---

## 💻 System Requirements

### Operating System
- ✅ Windows 10/11
- ✅ macOS 10.15 or higher
- ✅ Linux (Ubuntu 18.04+, Debian, etc.)

### Required Software
```
Node.js: v16.0.0 or higher (Recommended: v18.x or v20.x)
npm: v7.0.0 or higher (comes with Node.js)
Git: Latest version
```

### Check Your Versions
```bash
node --version    # Should show v16.0.0 or higher
npm --version     # Should show v7.0.0 or higher
git --version     # Should show latest version
```

---

## 📱 Frontend Packages (React Native + Expo)

### Core Framework Packages
```json
{
  "expo": "^51.0.0",
  "react": "18.2.0",
  "react-native": "0.74.5"
}
```

**Why needed:**
- `expo`: Development platform for React Native apps
- `react`: JavaScript library for building UI
- `react-native`: Framework for building mobile apps

---

### Expo Status Bar
```json
"expo-status-bar": "~1.12.1"
```
**Purpose:** Control the device status bar (clock, battery, signal)

---

### Location Services
```json
"expo-location": "~17.0.1"
```
**Purpose:** 
- Get GPS coordinates for catch recording
- Access device location
- Request location permissions

**Features Used:**
- Get current position
- Request foreground permissions
- Latitude/longitude capture

---

### Push Notifications
```json
"expo-notifications": "~0.29.14",
"expo-device": "~7.0.3",
"expo-constants": "~17.0.3"
```
**Purpose:**
- `expo-notifications`: Send local push notifications
- `expo-device`: Check if device supports notifications
- `expo-constants`: Access app configuration

**Features Used:**
- Token earned notifications (🪙)
- Token spent notifications (💰)
- Profile update notifications (✅)
- Badge count on notification icon

---

### Image Picker
```json
"expo-image-picker": "~15.0.7"
```
**Purpose:**
- Upload profile photos
- Take photos with camera
- Select from gallery
- Convert images to base64

**Features Used:**
- Camera access
- Photo library access
- Image compression
- Base64 encoding

---

### Local Storage
```json
"@react-native-async-storage/async-storage": "1.23.1"
```
**Purpose:**
- Store authentication token
- Cache user data
- Persist profile photo
- Save token balance offline

**Data Stored:**
- `authToken`: JWT token
- `userId`: User ID
- `userName`: User name
- `userData`: Complete user object
- `profilePhoto`: Base64 image
- Token balance

---

### Dropdown Picker
```json
"@react-native-picker/picker": "2.11.4"
```
**Purpose:**
- Region selection dropdown (12 Indian coastal states)
- Fish type selection in catch form
- Native picker UI for each platform

**Used In:**
- SignupScreen (region selection)
- EditProfileScreen (region update)
- RecordCatchForm (fish type)

---

### Maps
```json
"react-native-maps": "1.14.0"
```
**Purpose:**
- Display fish migration patterns
- Show historical catch locations
- Display predicted future locations
- Draw migration paths
- Show current fishing zones

**Features Used:**
- Interactive maps with zoom/pan
- Custom markers (historical, predicted)
- Polylines for migration paths
- Circles for fishing zones
- Different colors per fish species

---

### Screen Navigation
```json
"react-native-screens": "4.23.0"
```
**Purpose:**
- Optimize screen navigation performance
- Native screen management
- Better memory handling

---

## 🔧 Backend Packages (Node.js + Express)

### Core Framework
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0"
}
```
**Purpose:**
- `express`: Web server framework
- `mongoose`: MongoDB object modeling

---

### Database & Security
```json
{
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1"
}
```
**Purpose:**
- `bcryptjs`: Hash passwords securely
- `jsonwebtoken`: Create and verify JWT tokens
- `dotenv`: Load environment variables from .env

---

### Middleware & Utils
```json
{
  "cors": "^2.8.5",
  "body-parser": "^1.20.2"
}
```
**Purpose:**
- `cors`: Enable cross-origin requests
- `body-parser`: Parse JSON request bodies

---

### Development Tools
```json
{
  "nodemon": "^3.0.1"
}
```
**Purpose:** Auto-restart server on file changes (development only)

---

## 🚀 Installation Commands

### Complete Installation (Copy-Paste Ready)

#### Step 1: Frontend Installation
```bash
# Navigate to project root
cd my-app

# Install all frontend packages
npm install --save expo@^51.0.0
npm install --save react@18.2.0
npm install --save react-native@0.74.5
npm install --save expo-status-bar@~1.12.1
npm install --save expo-location@~17.0.1
npm install --save expo-notifications@~0.29.14
npm install --save expo-device@~7.0.3
npm install --save expo-constants@~17.0.3
npm install --save expo-image-picker@~15.0.7
npm install --save @react-native-async-storage/async-storage@1.23.1
npm install --save @react-native-picker/picker@2.11.4
npm install --save react-native-maps@1.14.0
npm install --save react-native-screens@4.23.0
```

**Or install all at once:**
```bash
npm install expo@^51.0.0 react@18.2.0 react-native@0.74.5 expo-status-bar@~1.12.1 expo-location@~17.0.1 expo-notifications@~0.29.14 expo-device@~7.0.3 expo-constants@~17.0.3 expo-image-picker@~15.0.7 @react-native-async-storage/async-storage@1.23.1 @react-native-picker/picker@2.11.4 react-native-maps@1.14.0 react-native-screens@4.23.0
```

**Or use package.json:**
```bash
# If package.json exists with all dependencies
npm install
```

---

#### Step 2: Backend Installation
```bash
# Navigate to backend folder
cd backend

# Install all backend packages
npm install --save express@^4.18.2
npm install --save mongoose@^8.0.0
npm install --save bcryptjs@^2.4.3
npm install --save jsonwebtoken@^9.0.2
npm install --save dotenv@^16.3.1
npm install --save cors@^2.8.5
npm install --save body-parser@^1.20.2

# Development dependency
npm install --save-dev nodemon@^3.0.1
```

**Or install all at once:**
```bash
npm install express@^4.18.2 mongoose@^8.0.0 bcryptjs@^2.4.3 jsonwebtoken@^9.0.2 dotenv@^16.3.1 cors@^2.8.5 body-parser@^1.20.2
npm install --save-dev nodemon@^3.0.1
```

**Or use package.json:**
```bash
# If backend/package.json exists with all dependencies
cd backend
npm install
```

---

## 📦 Package Purposes Detailed

### Frontend Package Uses

#### 1. expo (~51.0.0)
**Used in:** All files
**Purpose:** Core Expo SDK providing development environment
**Key Features:**
- Metro bundler for JavaScript
- Hot reloading during development
- QR code scanning for mobile testing
- Build system for production apps

---

#### 2. expo-location (~17.0.1)
**Used in:** 
- `components/RecordCatchForm.js`
- `App.js` (catch recording)

**Code Example:**
```javascript
import * as Location from 'expo-location';

const getCatchLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };
  }
};
```

---

#### 3. expo-notifications (~0.29.14)
**Used in:**
- `App.js` (setup and listeners)
- `services/notificationService.js`

**Code Example:**
```javascript
import * as Notifications from 'expo-notifications';

// Send notification
await Notifications.scheduleNotificationAsync({
  content: {
    title: '🪙 Tokens Earned!',
    body: 'You earned +40 tokens!',
    data: { type: 'token_change' }
  },
  trigger: null // Send immediately
});
```

---

#### 4. expo-image-picker (~15.0.7)
**Used in:**
- `screens/SignupScreen.js`
- `screens/EditProfileScreen.js`

**Code Example:**
```javascript
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
    base64: true
  });
  
  if (!result.canceled) {
    const photoData = `data:image/jpeg;base64,${result.assets[0].base64}`;
    setProfilePhoto(photoData);
  }
};
```

---

#### 5. @react-native-async-storage/async-storage (1.23.1)
**Used in:**
- `App.js` (authentication, user data)
- `screens/ProfileScreen1.js`
- `screens/SettingsScreen.js`

**Code Example:**
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
await AsyncStorage.setItem('authToken', token);
await AsyncStorage.setItem('userData', JSON.stringify(user));

// Retrieve data
const token = await AsyncStorage.getItem('authToken');
const userData = JSON.parse(await AsyncStorage.getItem('userData'));

// Remove data
await AsyncStorage.removeItem('authToken');
```

---

#### 6. @react-native-picker/picker (2.11.4)
**Used in:**
- `screens/SignupScreen.js`
- `screens/EditProfileScreen.js`

**Code Example:**
```javascript
import { Picker } from '@react-native-picker/picker';

<Picker
  selectedValue={region}
  onValueChange={(value) => setRegion(value)}
>
  <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
  <Picker.Item label="Kerala" value="Kerala" />
  <Picker.Item label="Gujarat" value="Gujarat" />
  {/* ... 9 more regions */}
</Picker>
```

---

#### 7. react-native-maps (1.14.0)
**Used in:**
- `screens/MarketScreen.js`
- `components/FullScreenMap.js`

**Code Example:**
```javascript
import MapView, { Marker, Polyline, Circle } from 'react-native-maps';

<MapView
  style={styles.map}
  initialRegion={{
    latitude: 8.7832,
    longitude: 78.1348,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  }}
>
  {/* Historical markers */}
  <Marker coordinate={{ latitude: 8.7832, longitude: 78.1348 }}>
    <View style={styles.marker}>
      <Text>📍</Text>
    </View>
  </Marker>
  
  {/* Migration path */}
  <Polyline
    coordinates={[
      { latitude: 8.7832, longitude: 78.1348 },
      { latitude: 8.8234, longitude: 78.2156 }
    ]}
    strokeColor="#3B82F6"
    strokeWidth={3}
  />
  
  {/* Fishing zone */}
  <Circle
    center={{ latitude: 8.7832, longitude: 78.1348 }}
    radius={5000}
    fillColor="rgba(59, 130, 246, 0.2)"
    strokeColor="#3B82F6"
  />
</MapView>
```

---

### Backend Package Uses

#### 1. express (^4.18.2)
**Used in:** `backend/server-clean.js`

**Code Example:**
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Start server
app.listen(3000, () => {
  console.log('✅ Server running on port 3000');
});
```

---

#### 2. mongoose (^8.0.0)
**Used in:**
- `backend/server-clean.js`
- `backend/models/User.js`

**Code Example:**
```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tokens: { type: Number, default: 800 }
});

const User = mongoose.model('User', userSchema);
```

---

#### 3. bcryptjs (^2.4.3)
**Used in:** `backend/models/User.js`

**Code Example:**
```javascript
const bcrypt = require('bcryptjs');

// Hash password before saving
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Compare passwords
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};
```

---

#### 4. jsonwebtoken (^9.0.2)
**Used in:** `backend/routes/auth.js`

**Code Example:**
```javascript
const jwt = require('jsonwebtoken');

// Generate token on login
const token = jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '30d' }
);

// Verify token in middleware
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.id);
```

---

#### 5. dotenv (^16.3.1)
**Used in:** `backend/server-clean.js`

**Code Example:**
```javascript
require('dotenv').config();

// Access environment variables
const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 3000;
```

---

## 🔄 Version Compatibility

### Expo SDK 51 Compatibility

| Package | Current Version | SDK 51 Expected | Status |
|---------|----------------|-----------------|--------|
| expo-notifications | 0.29.14 | ~0.29.0 | ✅ Compatible |
| expo-location | 17.0.1 | ~17.0.1 | ✅ Compatible |
| expo-image-picker | 15.0.7 | ~15.0.7 | ✅ Compatible |
| @react-native-picker/picker | 2.11.4 | 2.11.1 | ⚠️ Minor difference |
| react-native-screens | 4.23.0 | ~4.16.0 | ⚠️ Minor difference |

**Note:** Minor version differences are usually safe. Update if issues occur:
```bash
npx expo install --fix
```

---

## 🛠️ Troubleshooting Package Issues

### Issue 1: Package Installation Fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps
```

---

### Issue 2: Expo Package Mismatch

**Error:** `Your project may not work correctly until you install the expected versions`

**Solution:**
```bash
# Auto-fix versions
npx expo install --fix

# Or manually update specific packages
npx expo install expo-notifications@~0.29.0
```

---

### Issue 3: Native Module Not Found

**Error:** `Unable to resolve module "react-native-maps"`

**Solution:**
```bash
# Reinstall the package
npm uninstall react-native-maps
npm install react-native-maps@1.14.0

# Clear Metro bundler cache
npx expo start --clear
```

---

### Issue 4: MongoDB Deprecation Warnings

**Warning:** `DeprecationWarning: current Server Discovery and Monitoring engine`

**Solution:** Already fixed in Mongoose 8.x. Ignore warnings.

---

### Issue 5: Peer Dependency Conflicts

**Error:** `ERESOLVE unable to resolve dependency tree`

**Solutions:**

**Option 1 (Recommended):**
```bash
npm install --legacy-peer-deps
```

**Option 2:**
```bash
npm install --force
```

**Option 3:**
Update to npm v7+:
```bash
npm install -g npm@latest
```

---

## 📋 Verification Commands

### Check All Frontend Packages
```bash
cd my-app
npm list --depth=0
```

**Expected output:**
```
my-app@1.0.0
├── expo@51.0.0
├── react@18.2.0
├── react-native@0.74.5
├── expo-notifications@0.29.14
├── expo-location@17.0.1
... (all packages listed)
```

---

### Check All Backend Packages
```bash
cd backend
npm list --depth=0
```

**Expected output:**
```
backend@1.0.0
├── express@4.18.2
├── mongoose@8.0.0
├── bcryptjs@2.4.3
... (all packages listed)
```

---

### Check for Outdated Packages
```bash
# Frontend
npm outdated

# Backend
cd backend
npm outdated
```

---

### Check for Security Vulnerabilities
```bash
# Frontend
npm audit

# Backend
cd backend
npm audit

# Fix automatically (if possible)
npm audit fix
```

---

## 🔐 Production Recommendations

### Before Deploying:

1. **Update All Packages to Latest Stable**
   ```bash
   npm update
   ```

2. **Run Security Audit**
   ```bash
   npm audit fix --force
   ```

3. **Use Exact Versions in package.json**
   - Change `^4.18.2` to `4.18.2` (remove ^)
   - Prevents automatic updates

4. **Lock Dependencies**
   ```bash
   npm shrinkwrap
   ```

5. **Test on Multiple Devices**
   - Android (different versions)
   - iOS (different versions)
   - Tablets and phones

---

## 📦 Optional Packages (Not Currently Used)

### For Future Enhancements:

```bash
# State Management
npm install redux react-redux @reduxjs/toolkit

# API Client
npm install axios

# Form Validation
npm install formik yup

# Date/Time
npm install moment

# Charts & Graphs
npm install react-native-chart-kit

# Camera Features
npm install expo-camera

# Analytics
npm install expo-firebase-analytics

# Crash Reporting
npm install @sentry/react-native
```

---

## 🎯 Quick Installation Script

### Copy-Paste Complete Setup

```bash
# Clone repository
git clone https://github.com/naveen978980/Fishnet-app.git
cd Fishnet-app

# Install frontend packages
npm install

# Install backend packages
cd backend
npm install
cd ..

# Create .env file
cd backend
echo "MONGODB_URI=your_mongodb_uri_here" > .env
echo "JWT_SECRET=fishnet_secret_key_2026" >> .env
echo "JWT_EXPIRE=30d" >> .env
echo "PORT=3000" >> .env
cd ..

# Verify installations
echo "✅ Checking frontend packages..."
npm list --depth=0

echo "✅ Checking backend packages..."
cd backend
npm list --depth=0
cd ..

echo "🎉 Installation complete!"
echo "📱 Run: npx expo start"
echo "🔧 Run backend: cd backend && node server-clean.js"
```

---

## 📞 Package-Related Support

### Official Documentation Links:

- **Expo**: https://docs.expo.dev/
- **React Native**: https://reactnative.dev/docs/getting-started
- **Expo Notifications**: https://docs.expo.dev/versions/latest/sdk/notifications/
- **Expo Location**: https://docs.expo.dev/versions/latest/sdk/location/
- **React Native Maps**: https://github.com/react-native-maps/react-native-maps/tree/master/docs
- **AsyncStorage**: https://react-native-async-storage.github.io/async-storage/
- **Mongoose**: https://mongoosejs.com/docs/
- **Express**: https://expressjs.com/en/guide/routing.html
- **JWT**: https://jwt.io/

---

## ✅ Installation Checklist

- [ ] Node.js v16+ installed
- [ ] npm v7+ installed
- [ ] All frontend packages installed (13 packages)
- [ ] All backend packages installed (7 packages)
- [ ] No errors in `npm list`
- [ ] No critical vulnerabilities in `npm audit`
- [ ] `.env` file created in backend/
- [ ] MongoDB connection string added to .env
- [ ] JWT secret added to .env
- [ ] Both `npm install` commands completed successfully
- [ ] Can run `npx expo start` without errors
- [ ] Can run `node server-clean.js` without errors

---

**Last Updated**: February 8, 2026
**Package Guide Version**: 1.0

**All packages installed? You're ready to run! 🚀**
