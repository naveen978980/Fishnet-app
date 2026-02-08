# 🚀 How to Run Fishnet App

## 📋 Prerequisites

Before running the application, make sure you have the following installed:

### Required Software
1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** or **yarn** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Git** (for version control)
   - Download: https://git-scm.com/
   - Verify installation: `git --version`

4. **Expo Go** mobile app
   - **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Recommended Software
- **VS Code** (code editor): https://code.visualstudio.com/
- **MongoDB Compass** (database GUI): https://www.mongodb.com/products/compass
- **Postman** (API testing): https://www.postman.com/

---

## 📥 Installation

> **📦 For detailed package information, see [PACKAGES.md](PACKAGES.md)**
> 
> PACKAGES.md contains:
> - Complete list of all 20+ packages with versions
> - Purpose and usage of each package
> - Step-by-step installation commands
> - Code examples for each package
> - Troubleshooting package issues

### Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/naveen978980/Fishnet-app.git

# Navigate to project directory
cd Fishnet-app
```

### Step 2: Install Frontend Dependencies

**Quick Method** (Uses existing package.json):
```bash
# In the root directory (my-app/)
npm install
```

**Manual Method** (Install each package):
```bash
# See PACKAGES.md for complete installation commands
# Or use the Quick Installation Script in PACKAGES.md
```

**Expected output**: Installing packages (this may take 2-5 minutes)

**Packages Installed** (13 total):
- ✅ expo@^51.0.0 - Core Expo SDK
- ✅ react@18.2.0 - React framework
- ✅ react-native@0.74.5 - Mobile framework
- ✅ expo-location - GPS location
- ✅ expo-notifications - Push notifications
- ✅ expo-image-picker - Photo upload
- ✅ react-native-maps - Interactive maps
- ✅ @react-native-async-storage/async-storage - Local storage
- ✅ And 5 more packages...

> 📖 **See PACKAGES.md for complete package list and purposes**

### Step 3: Install Backend Dependencies

**Quick Method** (Uses existing package.json):
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Return to root directory
cd ..
```

**Manual Method** (Install each package):
```bash
# See PACKAGES.md Section "Backend Installation" for commands
```

**Packages Installed** (7 total):
- ✅ express@^4.18.2 - Web server
- ✅ mongoose@^8.0.0 - MongoDB ODM
- ✅ bcryptjs@^2.4.3 - Password hashing
- ✅ jsonwebtoken@^9.0.2 - JWT authentication
- ✅ dotenv@^16.3.1 - Environment variables
- ✅ cors@^2.8.5 - Cross-origin requests
- ✅ body-parser@^1.20.2 - JSON parsing

> 📖 **See PACKAGES.md for detailed package documentation**

### Step 4: Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# Navigate to backend directory
cd backend

# Create .env file
# On Windows PowerShell:
New-Item -Path .env -ItemType File

# On Mac/Linux:
touch .env
```
add env for run

**⚠️ Important**: Never commit `.env` file to Git! It's already in `.gitignore`.

---

## 🏃‍♂️ Running the Application

### Method 1: Run Both Servers (Recommended)

You need TWO terminal windows:

#### Terminal 1: Start Backend Server

```bash
# From project root, navigate to backend
cd backend

# Start the server
node server-clean.js
```

**Expected output**:
```
✅ SERVER RUNNING
📡 http://localhost:3000
📱 http://10.47.177.52:3000

📋 Endpoints:
  POST /api/auth/register
  POST /api/auth/login
  GET  /api/auth/me

✅ MongoDB Connected: fishnet
```

**Keep this terminal running!**

#### Terminal 2: Start Frontend Server

Open a **new terminal** window:

```bash
# From project root
npx expo start

# Or if you have Expo CLI installed globally
expo start
```

**Expected output**:
```
Starting Metro Bundler
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ ██▀▀▄▄ ██ █ ▄▄▄▄▄ █
█ █   █ █▀███ ▀▀▄▄█ █   █ █
...

› Metro waiting on exp://10.47.177.52:8081
› Scan the QR code above with Expo Go
```

**Keep this terminal running too!**

---

### Method 2: PowerShell One-Liner (Windows)

Open PowerShell and run:

```powershell
# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'PATH_TO_PROJECT\backend' ; node server-clean.js"

# Wait 3 seconds
Start-Sleep -Seconds 3

# Start frontend in current window
cd PATH_TO_PROJECT
npx expo start
```

Replace `PATH_TO_PROJECT` with your actual path, e.g.:
```
C:\Users\my pc\OneDrive\Desktop\EE\my-app
```

---

### Method 3: Using npm Scripts (Alternative)

Add to `package.json` in root:

```json
{
  "scripts": {
    "start": "expo start",
    "backend": "cd backend && node server-clean.js",
    "dev": "concurrently \"npm run backend\" \"npm run start\""
  }
}
```

Then install concurrently:
```bash
npm install --save-dev concurrently
```

Run both:
```bash
npm run dev
```

---

## 📱 Running on Your Phone

### Step 1: Connect to Same WiFi
- Ensure your phone and computer are on the **same WiFi network**
- **Important**: Guest networks or public WiFi may block connections

### Step 2: Open Expo Go
- Open the Expo Go app on your phone
- On the main screen, you'll see "Scan QR code"

### Step 3: Scan QR Code

**On Android:**
1. Tap "Scan QR code" in Expo Go
2. Point camera at the QR code in your terminal
3. Wait for the app to load

**On iOS:**
1. Open native Camera app
2. Point at the QR code
3. Tap the notification "Open in Expo Go"
4. Wait for the app to load

### Step 4: Wait for Bundle
First load takes 30-60 seconds as it downloads JavaScript bundle.

**Expected logs**:
```
Android Bundled 8807ms index.js (883 modules)
LOG  🔔 Setting up notifications...
LOG  ⚠️ No push token, but local notifications will work
```

---

## 🌐 Alternative: Manual URL Entry

If QR code doesn't work:

1. Open Expo Go
2. Tap "Enter URL manually"
3. Enter: `exp://10.47.177.52:8081`
4. Tap "Connect"

**Note**: Replace `10.47.177.52` with your computer's IP address if different.

### Find Your Computer's IP Address

**Windows (PowerShell):**
```powershell
ipconfig | findstr IPv4
```

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```

Look for the IP starting with `192.168.x.x` or `10.x.x.x`

---

## 🔧 Troubleshooting

### Issue 1: "Network request failed"

**Problem**: App can't connect to backend

**Solutions**:

1. **Check if backend is running**
   ```bash
   # Test backend endpoint
   curl http://localhost:3000/api/auth/me
   ```

2. **Verify backend URL in App.js**
   ```javascript
   // Should match your computer's IP
   const API_URL = 'http://10.47.177.52:3000';
   ```

3. **Check Windows Firewall**
   ```powershell
   # Allow port 3000 (Backend)
   netsh advfirewall firewall add rule name="Backend API" dir=in action=allow protocol=TCP localport=3000
   
   # Allow port 8081 (Expo)
   netsh advfirewall firewall add rule name="Expo Metro" dir=in action=allow protocol=TCP localport=8081
   ```

---

### Issue 2: "Port already in use"

**Problem**: Port 3000 or 8081 is occupied

**Solution**:

**Kill all Node processes (Windows):**
```powershell
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
```

**Kill specific port (Windows):**
```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill process by PID (replace 1234 with actual PID)
taskkill /PID 1234 /F
```

**Mac/Linux:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

### Issue 3: MongoDB Connection Error

**Problem**: Backend can't connect to MongoDB

**Solutions**:

1. **Check `.env` file exists**
   ```bash
   cd backend
   ls -la .env  # Mac/Linux
   dir .env     # Windows
   ```

2. **Verify MongoDB URI**
   - Should start with `mongodb+srv://`
   - Contains username, password, cluster name
   - Check MongoDB Atlas network access settings

3. **Test connection manually**
   ```bash
   # Install MongoDB Compass
   # Paste your MONGODB_URI
   # Click Connect
   ```

---

### Issue 4: Expo Go Won't Connect

**Problem**: QR code scan doesn't load app

**Solutions**:

1. **Same WiFi Check**
   - Phone: Settings → WiFi → Note network name
   - Computer: Must be on same network

2. **Restart Metro Bundler**
   ```bash
   # Press Ctrl+C to stop
   # Run again
   npx expo start --clear
   ```

3. **Use Tunnel Mode** (slower but more reliable)
   ```bash
   npx expo start --tunnel
   ```

4. **Check Expo Go Version**
   - Update Expo Go app to latest version from store

---

### Issue 5: "Notifications error"

**Problem**: `removeNotificationSubscription is not a function`

**Status**: ✅ Already fixed in code

**Verification**: Check `App.js` line 66-69:
```javascript
return () => {
  if (notificationListener.current) {
    notificationListener.current.remove();  // ✅ Correct
  }
};
```

---

### Issue 6: Module Not Found

**Problem**: `Cannot find module 'xyz'`

**Solution**:

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Or for backend
cd backend
rm -rf node_modules
npm install
```

---

## 📊 Verify Installation

### Check Backend Health

```bash
# Test registration endpoint
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

Expected response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "Test",
    "email": "test@test.com",
    "tokens": 800
  }
}
```

### Check Frontend Logs

In Expo terminal, you should see:
```
LOG  🔔 Setting up notifications...
LOG  ⚠️ No push token, but local notifications will work
```

No red errors should appear.

---

## 🧪 Testing the App

### Test 1: Authentication

1. **Sign Up**
   - Tap "Sign Up"
   - Fill in name, email, password
   - Tap "Sign Up"
   - Should see success message

2. **Login**
   - Enter email and password
   - Tap "Login"
   - Should redirect to Home screen

### Test 2: Token System

1. **Check Initial Balance**
   - Look at header: Should show "🪙 800"

2. **Record a Catch**
   - Go to "Record" tab
   - Fill fish type, weight
   - Tap "Submit"
   - Should see: "+40 tokens earned!"
   - Header updates to "🪙 840"

3. **View Fish Details**
   - Go to "Market" tab
   - Click any fish (e.g., Tuna)
   - Should see: "-40 tokens spent!"
   - Header updates to "🪙 800"

### Test 3: Notifications

1. **Notification Badge**
   - Record a catch
   - Bell icon shows badge with count "1"
   - Tap bell to reset

2. **Notification History**
   - Go to "Notifications" tab
   - Should see "Tokens Earned" notification
   - Shows "Just now" timestamp

### Test 4: Profile

1. **View Profile**
   - Go to "Profile" tab
   - Should see your name, email, token balance
   - Photo should display (if uploaded)

2. **Edit Profile**
   - Go to "Settings" tab
   - Tap "Edit Profile"
   - Update any field
   - Tap "Save"
   - Should see success notification

---

## 🔄 Update Existing User Tokens

If you created an account before the 800 token update:

```bash
# Navigate to backend
cd backend

# Run update script
node update-tokens.js
```

Expected output:
```
✅ Connected to MongoDB
✅ Updated 1 users to 800 tokens

📊 User Token Balances:
   Naveen Kumar (liongamertamil@gmail.com): 800 tokens 🪙
```

---

## 📲 Running on Multiple Phones

### Same WiFi Network

1. **Start servers** (backend + frontend)
2. **Phone 1**: Scan QR code
3. **Phone 2**: Scan same QR code
4. Both phones can use the app simultaneously!

### Different Accounts

- Each phone can create/login to different accounts
- Token balances are per-user
- Changes are synced through backend

---

## 🛑 Stopping the App

### Stop Frontend (Expo)
- Press `Ctrl + C` in Expo terminal
- Or type `q` and press Enter

### Stop Backend
- Press `Ctrl + C` in backend terminal

### Close App on Phone
- Swipe up/home button
- Or shake phone → "Exit to Home"

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` in `.env`
- [ ] Use strong MongoDB password
- [ ] Enable MongoDB IP whitelist
- [ ] Update CORS settings in backend
- [ ] Use HTTPS for production API
- [ ] Enable rate limiting
- [ ] Add request validation middleware
- [ ] Set up error monitoring (Sentry)
- [ ] Add logging (Winston)
- [ ] Use environment-specific configs

---

## 📦 Building for Production

### Android APK Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### iOS Build (Requires Apple Developer Account)

```bash
# Build for iOS
eas build --platform ios --profile production
```

---

## 🐳 Docker Setup (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - ./backend:/app
    command: node server-clean.js

  frontend:
    build: .
    ports:
      - "8081:8081"
    depends_on:
      - backend
    command: npx expo start
```

Run:
```bash
docker-compose up
```

---

## 📚 Additional Resources

### Documentation
- **Expo Docs**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express.js Docs**: https://expressjs.com/

### Tutorials
- **Expo Tutorial**: https://docs.expo.dev/tutorial/introduction/
- **React Native Maps**: https://github.com/react-native-maps/react-native-maps
- **JWT Authentication**: https://jwt.io/introduction

### Tools
- **Expo Snack** (online editor): https://snack.expo.dev/
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Postman**: https://www.postman.com/

---

## 🆘 Getting Help

### Common Commands Reference

```bash
# Frontend
npx expo start              # Start Metro bundler
npx expo start --clear      # Clear cache and start
npx expo start --tunnel     # Use tunnel (slower, more reliable)
npx expo doctor             # Check for issues
npm install                 # Install dependencies

# Backend
cd backend
node server-clean.js        # Start backend server
node update-tokens.js       # Update user tokens
npm install                 # Install backend dependencies

# Debugging
npx react-native log-android    # View Android logs
npx react-native log-ios        # View iOS logs

# Cleanup
rm -rf node_modules         # Remove dependencies
npm install                 # Reinstall dependencies
npx expo start --clear      # Clear Expo cache
```

### Error Logs Location

- **Expo Metro Bundler**: Terminal output
- **Backend**: Terminal output + console.log statements
- **App Errors**: Shake phone → "Show Developer Menu" → "Debug Remote JS"

---

## ✅ Quick Start Checklist

- [ ] Node.js installed (v16+)
- [ ] npm/yarn installed
- [ ] Project cloned from Git
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] `.env` file created in `backend/` with MongoDB URI
- [ ] Expo Go installed on phone
- [ ] Phone and computer on same WiFi
- [ ] Backend server started (`node server-clean.js`)
- [ ] Frontend server started (`npx expo start`)
- [ ] QR code scanned on phone
- [ ] App loads successfully
- [ ] Can create account with 800 tokens
- [ ] Can record catch and earn tokens
- [ ] Can view fish and spend tokens

---

## 🎉 You're All Set!

If you've followed all steps:
- ✅ Backend is running on port 3000
- ✅ Frontend is running on port 8081
- ✅ MongoDB is connected
- ✅ App is loaded on your phone
- ✅ You can sign up and get 800 tokens
- ✅ You can earn and spend tokens
- ✅ Notifications work with badges

**Enjoy using Fishnet App! 🎣📱**

---

## 📞 Support

If you encounter issues not covered here:

1. Check DOCUMENTATION.md for detailed explanations
2. Review error messages carefully
3. Search Expo forums: https://forums.expo.dev/
4. Check GitHub issues: https://github.com/naveen978980/Fishnet-app/issues
5. Contact: liongamertamil@gmail.com

---

**Last Updated**: February 8, 2026
**Version**: 1.0.0
**Guide Version**: 1.0

**Happy Fishing! 🐟**
