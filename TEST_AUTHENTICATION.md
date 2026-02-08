# 🧪 Testing MongoDB Authentication

## ✅ Setup Complete!

Your app is now connected to MongoDB for authentication. Users will be registered and logged in using the MongoDB database.

---

## 🚀 How to Test

### 1. Make Sure Both Servers Are Running:

**Backend Server** (Terminal 1):
```bash
cd backend
node server.js
```
Should show: Server running on http://10.47.177.52:3000

**Frontend App** (Terminal 2):
```bash
npx expo start
```
Scan QR code with Expo Go app

---

## 📱 Testing on Your Phone

### Test Signup (Create New Account):

1. **Open the app** in Expo Go
2. **Tap "Sign Up"** link
3. **Fill in the form**:
   - Name: `John Doe`
   - Email: `john@fishnet.com`
   - Password: `password123` (min 6 characters)
4. **Tap "Sign Up" button**
5. **You should see**: 
   - ✅ Loading spinner while processing
   - ✅ "Success! 🎉 Welcome John Doe!" alert
   - ✅ Automatically logged in to home screen
   - ✅ Header shows "Hello, John Doe"

### Test Login (Existing Account):

1. **Logout** first (tap Settings → Logout)
2. **You'll see the Login screen**
3. **Fill in your credentials**:
   - Email: `john@fishnet.com`
   - Password: `password123`
4. **Tap "Login" button**
5. **You should see**:
   - ✅ Loading spinner
   - ✅ "Welcome! 👋 John Doe, login successful" alert
   - ✅ Taken to home screen

---

## 🔍 What's Happening Behind the Scenes

### When you Sign Up:
1. App sends your data to: `http://10.47.177.52:3000/api/auth/register`
2. Backend hashes your password with bcrypt
3. User is saved to MongoDB Atlas
4. Backend generates a JWT token (expires in 30 days)
5. Token is stored in your phone's AsyncStorage
6. You're automatically logged in

### When you Login:
1. App sends email & password to: `http://10.47.177.52:3000/api/auth/login`
2. Backend finds your user in MongoDB
3. Backend verifies password using bcrypt
4. If correct, backend generates JWT token
5. Token stored in AsyncStorage
6. You're logged in!

### When you Logout:
1. App calls: `http://10.47.177.52:3000/api/auth/logout`
2. Token is removed from AsyncStorage
3. All user data cleared from app state
4. You're returned to login screen

---

## 🗄️ Verify Data in MongoDB

### Check if user was created:

**Option 1: MongoDB Atlas Web UI**
1. Go to https://cloud.mongodb.com
2. Login with your credentials
3. Click "Browse Collections"
4. Select `fishnet` database → `users` collection
5. You'll see your registered user with:
   - Name, email (hashed password won't be visible)
   - License ID, phone number
   - Created timestamp

**Option 2: Using MongoDB Compass**
1. Download MongoDB Compass
2. Connect with your connection string
3. Browse `fishnet` → `users` collection

**Option 3: Backend API**
```bash
# Get all users (for testing)
curl http://10.47.177.52:3000/api/users
```

---

## 🛠️ Testing Different Scenarios

### ✅ Valid Registration
- **Name**: Any name
- **Email**: Valid email format
- **Password**: At least 6 characters
- **Expected**: Account created, auto-login

### ❌ Duplicate Email
- Try signing up with same email twice
- **Expected**: "Email already exists" error

### ❌ Wrong Password on Login
- Use correct email but wrong password
- **Expected**: "Invalid email or password" error

### ❌ Unregistered Email
- Try logging in with email that doesn't exist
- **Expected**: "Invalid email or password" error

### ❌ Short Password
- Try password with less than 6 characters
- **Expected**: "Password must be at least 6 characters" error

### ❌ Empty Fields
- Leave any field empty
- **Expected**: "Please fill all fields" error

---

## 🔐 Security Features Working

✅ **Password Hashing**
- Passwords are hashed with bcrypt (10 rounds)
- Never stored in plain text
- Even database admins can't see real passwords

✅ **JWT Token Authentication**
- Tokens expire after 30 days
- Signed with your JWT_SECRET
- Cannot be tampered with

✅ **Auto-Login**
- Token saved in AsyncStorage
- App checks token on startup
- If valid, auto-login without entering password

✅ **Secure Logout**
- Token removed from storage
- All user data cleared
- Must login again to access app

---

## 📊 Check User Session

### After logging in, check what's stored:

```javascript
// In React Native Debugger Console:
import AsyncStorage from '@react-native-async-storage/async-storage';

// View stored token
AsyncStorage.getItem('authToken').then(console.log);

// View user ID
AsyncStorage.getItem('userId').then(console.log);

// View user name
AsyncStorage.getItem('userName').then(console.log);
```

---

## 🐛 Troubleshooting

### "Could not connect to server"
- ✅ Check backend server is running
- ✅ Verify IP address is correct (10.47.177.52)
- ✅ Make sure phone and computer are on same WiFi
- ✅ Check Windows Firewall isn't blocking port 3000

### "Invalid email or password"
- ✅ Check email format is correct
- ✅ Verify password is at least 6 characters
- ✅ Make sure you registered the account first
- ✅ Check caps lock

### "Email already exists"
- ✅ This email is already registered
- ✅ Try logging in instead
- ✅ Or use a different email

### Loading spinner never stops
- ✅ Check backend server logs for errors
- ✅ Check network connection
- ✅ Try restarting backend server

---

## 📈 Next Steps

Now that authentication is working with MongoDB:

1. ✅ **Test thoroughly** - Try all scenarios above
2. 🔄 **Update catch recording** - Connect to MongoDB catches endpoint
3. 👤 **Profile screen** - Load real user data from MongoDB
4. 📊 **Statistics** - Show real catch stats from database
5. 🔐 **Protected routes** - Require login to record catches

---

## 🎯 Test Checklist

- [ ] Sign up with new account
- [ ] Check user appears in MongoDB
- [ ] Logout
- [ ] Login with same credentials
- [ ] Check auto-login (close and reopen app)
- [ ] Test wrong password
- [ ] Test duplicate email signup
- [ ] Test empty fields validation
- [ ] Test short password validation
- [ ] Verify logout clears everything

---

## 📞 API Endpoints Being Used

✅ **POST /api/auth/register** - Create new account
- Request: `{ name, email, password, phone, licenseId }`
- Response: `{ success, token, user }`

✅ **POST /api/auth/login** - Login
- Request: `{ email, password }`
- Response: `{ success, token, user }`

✅ **POST /api/auth/logout** - Logout
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, message }`

✅ **GET /api/auth/me** - Get current user
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, data: { user } }`

---

## 🎉 Success Indicators

When everything is working correctly:

1. ✅ **Signup creates user in MongoDB**
2. ✅ **Login retrieves user from MongoDB**
3. ✅ **Token is stored locally**
4. ✅ **User stays logged in after app restart**
5. ✅ **Logout clears session**
6. ✅ **Loading states work properly**
7. ✅ **Error messages are clear**
8. ✅ **User name displays in header**

---

Happy Testing! 🎣🔐
