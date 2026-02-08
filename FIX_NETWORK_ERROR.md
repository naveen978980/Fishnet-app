# 🔧 FIX: Network Request Failed Error

## Problem
Your app shows "Network request failed" because the backend server isn't running properly.

---

## ✅ SOLUTION: Start Servers Manually

### Step 1: Open TWO PowerShell Windows

**Important**: You MUST use 2 separate windows, not VS Code terminals!

---

### Step 2: Start Backend (Window 1)

1. **Open PowerShell** (Windows key + X → PowerShell)
2. **Run these commands:**

```powershell
cd "C:\Users\my pc\OneDrive\Desktop\EE\my-app\backend"
node simple-server.js
```

3. **You should see:**
```
✅ Backend Server is RUNNING!
📡 Local: http://localhost:3000
📱 Network: http://10.47.177.52:3000
```

4. **✅ KEEP THIS WINDOW OPEN!** Don't close it!

---

### Step 3: Test Backend (Optional)

**Open your browser:**
- Go to: http://localhost:3000
- You should see: `{"message":"🎣 Fishnet API Running"...}`

**Or open another PowerShell and run:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
```

Should return `StatusCode: 200`

---

### Step 4: Start Frontend (Window 2)

1. **Open ANOTHER PowerShell** window
2. **Run these commands:**

```powershell
cd "C:\Users\my pc\OneDrive\Desktop\EE\my-app"
npx expo start
```

3. **Wait for QR code** to appear
4. **✅ KEEP THIS WINDOW OPEN TOO!**

---

### Step 5: Open on Phone

1. **Open Expo Go** app on your phone
2. **Make sure**:
   - Phone and computer on SAME WiFi
   - Backend window still shows "Server is RUNNING"
3. **Scan QR code**
4. **App should load!**

---

## 🎯 To Fix "Network Request Failed":

The backend needs authentication routes. Let me add them to simple-server.js:

### Update Backend with Auth

**Close the backend server** (Ctrl+C in Window 1)

Then **run this** in PowerShell:

```powershell
cd "C:\Users\my pc\OneDrive\Desktop\EE\my-app\backend"
node server.js
```

**If server.js doesn't show output**, use simple-server.js for now to test connection.

---

## 🔍 Troubleshooting

### Error: "Port 3000 is already in use"

**Kill all Node processes:**
```powershell
Stop-Process -Name "node" -Force
```

Then start backend again.

---

### Error: "Network request failed" persists

**Check 1: Is backend actually running?**
- Look at Backend Window 1
- Should say "Server is RUNNING"
- If not, restart it

**Check 2: Test backend from browser**
- Open: http://localhost:3000
- Should see JSON response
- If browser can't connect, backend isn't running

**Check 3: Correct IP in App.js?**
- Open: `C:\Users\my pc\OneDrive\Desktop\EE\my-app\App.js`
- Line 22: `const API_URL = 'http://10.47.177.52:3000';`
- Get your real IP:
  ```powershell
  ipconfig | Select-String "IPv4"
  ```
- Update if different

**Check 4: Same WiFi?**
- Computer and phone MUST be on same WiFi network

**Check 5: Windows Firewall?**
- Allow Node.js through firewall when prompted
- Or temporarily disable firewall to test

---

## 📱 Quick Test

### Test if backend is accessible from phone:

1. **On your phone's browser**, go to:
   ```
   http://10.47.177.52:3000
   ```

2. **Should see:**
   ```json
   {"message":"🎣 Fishnet API Running","version":"2.0.0"}
   ```

3. **If you see this**, backend is accessible!
4. **If "can't connect"**, check:
   - Backend running?
   - Same WiFi?
   - Correct IP address?
   - Firewall blocking?

---

## ✅ Success Checklist

- [ ] Backend Window 1 shows "Server is RUNNING"
- [ ] Browser can access http://localhost:3000
- [ ] Frontend Window 2 shows QR code
- [ ] Phone and computer on same WiFi
- [ ] Phone can access http://10.47.177.52:3000 in browser
- [ ] Expo Go app loads without errors

---

## 🚀 Once Both Running:

### In your app:
1. Tap "Sign Up"
2. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Tap "Sign Up"
4. **Should work now!** ✅

---

## 💡 Pro Tip

If simple-server.js works but server.js doesn't, there might be an issue with MongoDB connection or auth routes. For now, use simple-server.js to verify the network connection is working.

To add auth to simple-server.js, I can help you merge the routes!

---

## 🆘 Still Not Working?

**Run these diagnostics:**

```powershell
# 1. Check if port 3000 is in use
netstat -ano | findstr :3000

# 2. Get your IP address
ipconfig | Select-String "IPv4"

# 3. Test localhost
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing

# 4. Test network IP  
Invoke-WebRequest -Uri "http://10.47.177.52:3000" -UseBasicParsing
```

Send me the results if it still doesn't work!

---

**Remember**: Keep BOTH PowerShell windows open while using the app! 🚀
