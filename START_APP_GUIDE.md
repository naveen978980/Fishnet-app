# 🚀 How to Start Your Fishnet App

## ⚠️ Important: Run in Separate Terminals

You need **TWO separate terminal windows** running at the same time.

---

## 📡 Step 1: Start Backend Server

**Open PowerShell Terminal 1:**

```powershell
cd "C:\Users\my pc\OneDrive\Desktop\EE\my-app\backend"
node server.js
```

**You should see:**
```
✅ MongoDB Connected Successfully!
🎣 Fishnet Backend API with MongoDB
📡 Server running on http://0.0.0.0:3000
📱 Access from phone: http://10.47.177.52:3000
🗄️  MongoDB: mongodb+srv://...
```

**✅ Backend is ready** when you see these messages!
**🔴 Keep this terminal open!** Don't close it.

---

## 📱 Step 2: Start React Native Frontend

**Open PowerShell Terminal 2 (New Window):**

```powershell
cd "C:\Users\my pc\OneDrive\Desktop\EE\my-app"
npx expo start
```

**You should see:**
- QR code appears
- Metro bundler running
- "Metro waiting on exp://10.47.177.52:8081"

**✅ Frontend is ready!**
**🔴 Keep this terminal open too!**

---

## 📲 Step 3: Open on Phone

1. **Install Expo Go** app from Play Store/App Store
2. **Make sure phone and computer are on same WiFi**
3. **Scan the QR code** with Expo Go (Android) or Camera (iOS)
4. **Wait for app to load**

---

## 🧪 Step 4: Test Authentication

### Create Account:
1. Tap "Sign Up"
2. Enter:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123
3. Tap "Sign Up"
4. ✅ Should see success message
5. ✅ Automatically logged in

### Test Login:
1. Tap Settings → Logout
2. Enter your email and password
3. Tap "Login"
4. ✅ Should log you in!

---

## 🐛 Troubleshooting

### "Could not connect to server" error:

**Check 1: Is backend running?**
- Look at Terminal 1
- Should show "Server running on..."
- If not, restart: `node server.js`

**Check 2: Correct IP address?**
- Open App.js
- Line 22: `const API_URL = 'http://10.47.177.52:3000';`
- Get your computer's IP:
  ```powershell
  ipconfig
  ```
- Look for "IPv4 Address" under your WiFi adapter
- Update API_URL if different

**Check 3: Same WiFi?**
- Computer and phone must be on same WiFi network
- Check both devices

**Check 4: Windows Firewall?**
- Windows might be blocking port 3000
- Allow Node.js through firewall

**Check 5: Backend actually responding?**
Open browser on your computer:
- Go to: `http://localhost:3000`
- Should see: `{"message":"🎣 Fishnet API with MongoDB"...}`
- If not, backend isn't running properly

---

## 🔄 Restart Everything

If things aren't working:

### 1. Stop All:
- Close both terminal windows
- Or press `Ctrl+C` in each terminal

### 2. Kill all Node processes:
```powershell
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
```

### 3. Start Fresh:
- Terminal 1: `cd backend` → `node server.js`
- Wait for "Server running..." message
- Terminal 2: `cd my-app` → `npx expo start`
- Wait for QR code
- Scan with phone

---

## ✅ Success Checklist

- [ ] Terminal 1 shows "Server running"
- [ ] Terminal 2 shows QR code  
- [ ] Both terminals stay open
- [ ] Phone scans QR code
- [ ] App loads on phone
- [ ] Can see login screen
- [ ] Can create account
- [ ] Can login
- [ ] Name appears in header

---

## 📞 Quick Test Backend

**Test if backend is working:**

```powershell
# In a NEW terminal (Terminal 3):
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
```

**Should return:**
```
StatusCode: 200
Content: {"message":"🎣 Fishnet API with MongoDB"...}
```

If you get "Unable to connect", backend isn't running!

---

## 🎯 Common Mistakes

❌ **Closing terminal after starting server**
   - Both terminals must stay open!

❌ **Wrong IP address in App.js**
   - Use your computer's actual IP (find with `ipconfig`)

❌ **Different WiFi networks**
   - Phone and computer MUST be on same WiFi

❌ **Port already in use**
   - Another program using port 3000
   - Kill all node: `Stop-Process -Name "node" -Force`

❌ **Firewall blocking**
   - Windows Firewall might block Node.js
   - Allow when prompted

---

## 📱 Your Phone App Should Show:

✅ Login screen with fish emoji 🐟
✅ "Welcome Back" text
✅ Email and Password fields
✅ "Sign Up" link at bottom

After login:
✅ Home screen with map
✅ Bottom navigation (Home, Record, Market, Settings, Profile)
✅ Header shows "Hello, [Your Name]"

---

## 🎉 When Everything Works:

You'll be able to:
- Create accounts (stored in MongoDB)
- Login (verified against MongoDB)
- Auto-login (token stored locally)
- See your name in header
- Navigate between tabs
- Record catches
- View fish market
- Check settings
- View profile

**All authentication is now powered by MongoDB Atlas!** 🔐🎣

---

Need help? Check:
1. Both terminals are running
2. No error messages in terminals
3. Phone and computer on same WiFi
4. Correct IP in App.js
5. Backend responds to `http://localhost:3000`

Good luck! 🚀
