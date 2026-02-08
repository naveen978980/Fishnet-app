# 🔐 Authentication Setup Guide for Fishnet App

## 🔑 Required Keys for Authentication

### 1. JWT_SECRET (JSON Web Token Secret)
- **Purpose**: Used to sign and verify JWT tokens for user authentication
- **Location**: `.env` file
- **Current Value**: `fishnet_secure_jwt_secret_key_2026_naveen`
- **Security**: Keep this secret! Never commit to GitHub

### 2. MONGODB_URI (Database Connection)
- **Purpose**: Connects your app to MongoDB Atlas
- **Location**: `.env` file
- **Current Setup**: ✅ Already configured

---

## 📋 Current `.env` Configuration

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key_here
```

**⚠️ Security Note**: Replace placeholders with your actual credentials. Never commit real credentials to Git!

---

## 🚀 Authentication Endpoints

### 1. **Register a New User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Dobby Fisher",
  "email": "dobby@fishnet.com",
  "password": "securePassword123",
  "phone": "+91 91234 56789",
  "licenseId": "TN-FSH-2025-0093",
  "region": "Tamil Nadu Coast",
  "boatName": "Sea Rider",
  "experience": 12
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Dobby Fisher",
    "email": "dobby@fishnet.com",
    "licenseId": "TN-FSH-2025-0093",
    "role": "fisherman"
  }
}
```

### 2. **Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "dobby@fishnet.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Dobby Fisher",
    "email": "dobby@fishnet.com",
    "role": "fisherman"
  }
}
```

### 3. **Get Current User Profile**
```http
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Dobby Fisher",
    "email": "dobby@fishnet.com",
    "phone": "+91 91234 56789",
    "licenseId": "TN-FSH-2025-0093",
    "region": "Tamil Nadu Coast",
    "boatName": "Sea Rider",
    "experience": 12,
    "role": "fisherman",
    "stats": {
      "totalCatches": 127,
      "totalWeight": 450,
      "uniqueFishTypes": 4
    }
  }
}
```

### 4. **Update Password**
```http
PUT /api/auth/updatepassword
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

### 5. **Update Profile**
```http
PUT /api/auth/updateprofile
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Dobby Fisher Updated",
  "phone": "+91 98765 43210",
  "boatName": "Ocean Explorer"
}
```

---

## 🔧 How to Use in React Native App

### Step 1: Store Token After Login
```javascript
// LoginScreen.js
const handleLogin = async () => {
  try {
    const response = await fetch('http://10.47.177.52:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('userId', data.user.id);
      await AsyncStorage.setItem('userName', data.user.name);
      
      // Navigate to home screen
      setIsLoggedIn(true);
    }
  } catch (error) {
    Alert.alert('Login Failed', error.message);
  }
};
```

### Step 2: Use Token for Protected Requests
```javascript
// Get token from storage
const token = await AsyncStorage.getItem('authToken');

// Make authenticated request
const response = await fetch('http://10.47.177.52:3000/api/catches', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(catchData)
});
```

### Step 3: Check Authentication Status
```javascript
// Check if user is logged in
const checkAuth = async () => {
  const token = await AsyncStorage.getItem('authToken');
  
  if (token) {
    // Verify token by calling /api/auth/me
    try {
      const response = await fetch('http://10.47.177.52:3000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        return true; // User is authenticated
      }
    } catch (error) {
      // Token invalid or expired
      await AsyncStorage.removeItem('authToken');
      return false;
    }
  }
  return false;
};
```

---

## 🧪 Testing Authentication with cURL

### Test Registration:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Fisher\",\"email\":\"test@fishnet.com\",\"password\":\"test123\",\"phone\":\"+91 12345 67890\"}"
```

### Test Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@fishnet.com\",\"password\":\"test123\"}"
```

### Test Protected Route:
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🔒 Security Features

### Password Security
- ✅ Passwords are hashed using **bcryptjs** before storing
- ✅ Never stored in plain text
- ✅ 10 salt rounds for hashing

### Token Security
- ✅ JWT tokens expire after **30 days**
- ✅ Tokens are signed with your **JWT_SECRET**
- ✅ Cannot be tampered with

### Data Validation
- ✅ Email format validation
- ✅ Required field checking
- ✅ Duplicate email/license ID prevention
- ✅ Password strength can be enforced

---

## 📦 Required npm Packages

Already installed:
```json
{
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^17.2.4",
  "express": "^4.18.2",
  "mongoose": "^8.0.0"
}
```

---

## 🚦 Server Status Check

### Health Check Endpoint:
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-02-08T10:30:00.000Z",
  "database": "Connected",
  "uptime": 3600
}
```

---

## 🎯 Next Steps

1. ✅ **JWT_SECRET is configured** - Your authentication is ready!
2. 🔄 **Update React Native app** - Integrate login/register endpoints
3. 💾 **Store tokens** - Use AsyncStorage to persist login
4. 🔐 **Protect routes** - Add token to API requests
5. 🚪 **Add logout** - Clear AsyncStorage on logout

---

## 🛡️ Important Security Notes

⚠️ **Never share these keys:**
- `JWT_SECRET` - Keep this private!
- MongoDB password - Don't commit to GitHub
- User tokens - Handle securely in the app

✅ **Best Practices:**
- Use HTTPS in production
- Implement token refresh mechanism
- Add rate limiting
- Validate all inputs
- Use strong passwords

---

## 🆘 Troubleshooting

### "Invalid token" error:
- Check if token is correctly formatted
- Verify JWT_SECRET matches
- Check if token has expired

### "User already exists" error:
- Email or License ID is already registered
- Try logging in instead

### Connection errors:
- Check if backend server is running
- Verify correct IP address (10.47.177.52:3000)
- Check MongoDB connection

---

## 📞 API Base URL

**Development:**
- Local: `http://localhost:3000`
- Network: `http://10.47.177.52:3000`

**All Auth Endpoints:**
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Get Profile: `GET /api/auth/me`
- Update Password: `PUT /api/auth/updatepassword`
- Update Profile: `PUT /api/auth/updateprofile`

---

## ✅ Setup Complete!

Your authentication system is fully configured with:
- ✅ JWT_SECRET key
- ✅ MongoDB connection
- ✅ User registration & login
- ✅ Password hashing
- ✅ Protected routes
- ✅ Token-based authentication

Ready to integrate with your React Native app! 🎣🔐
