# Fishnet Backend with MongoDB

MongoDB-powered backend for the Fishnet fish tracking application.

## 🗄️ Database Setup

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB Community Edition:**
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Compass (GUI): https://www.mongodb.com/products/compass

2. **Start MongoDB Service:**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

3. **Connection String (already in .env):**
   ```
   MONGODB_URI=mongodb://localhost:27017/fishnet
   ```

### Option 2: MongoDB Atlas (Cloud - Free Tier)

1. **Create Free Account:**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Create a free M0 cluster

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update .env file:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fishnet?retryWrites=true&w=majority
   ```

## 📦 Installation

```bash
cd backend
npm install
```

## 🚀 Running the Server

```bash
# Start the server
node server.js

# Or with nodemon (auto-restart)
npm install -g nodemon
nodemon server.js
```

## 📊 Database Models

### Catch Model
- `fishType`: String (required)
- `quantity`: Number (required)
- `weight`: Number (required)
- `location`: Object with latitude, longitude, address
- `date`: Date
- `time`: String
- `userId`: String
- `userName`: String
- `notes`: String
- `weather`: Object
- `verified`: Boolean
- Auto-timestamps

### User Model
- `name`: String (required)
- `email`: String (unique, required)
- `password`: String (required)
- `phone`: String
- `licenseId`: String (unique)
- `region`: String
- `boatName`: String
- `experience`: Number
- `role`: Enum (fisherman/researcher/admin)
- `stats`: Object (totalCatches, totalWeight, uniqueFishTypes)
- Auto-timestamps

## 🔌 API Endpoints

### Catches
- `GET /api/catches` - Get all catches (with pagination & filters)
- `GET /api/catches/:id` - Get single catch
- `POST /api/catches` - Create new catch
- `PUT /api/catches/:id` - Update catch
- `DELETE /api/catches/:id` - Delete catch
- `GET /api/catches/fishtype/:fishType` - Get catches by fish type

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user

### Statistics
- `GET /api/stats` - Overall statistics
- `GET /api/stats/user/:userId` - User-specific statistics
- `GET /api/stats/fishtypes` - Fish type statistics

### Health
- `GET /api/health` - Server health check

## 📝 Example API Requests

### Create a Catch
```bash
curl -X POST http://localhost:3000/api/catches \
  -H "Content-Type: application/json" \
  -d '{
    "fishType": "Tuna",
    "quantity": 15,
    "weight": 45.5,
    "location": {
      "latitude": 8.7832,
      "longitude": 78.1348,
      "address": "Tamil Nadu Coast"
    },
    "time": "14:30",
    "userId": "anonymous",
    "userName": "Dobby Fisher"
  }'
```

### Get All Catches
```bash
curl http://localhost:3000/api/catches
```

### Get Catches with Filters
```bash
curl "http://localhost:3000/api/catches?fishType=Tuna&limit=10&page=1"
```

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dobby Fisher",
    "email": "dobby@fishnet.com",
    "password": "securepassword",
    "phone": "+91 91234 56789",
    "licenseId": "TN-FSH-2025-0093",
    "region": "Tamil Nadu Coast",
    "boatName": "Sea Rider",
    "experience": 12
  }'
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/fishnet
PORT=3000
NODE_ENV=development
```

## 📈 Features

- ✅ MongoDB Atlas or Local MongoDB support
- ✅ Mongoose ODM with schemas
- ✅ RESTful API endpoints
- ✅ Pagination support
- ✅ Query filtering
- ✅ Auto-updating user statistics
- ✅ Data validation
- ✅ Error handling
- ✅ Graceful shutdown
- ✅ Health check endpoint

## 🛠️ Migration from JSON

If you have existing catch data in `data/catches.json`, you can migrate it:

1. The old `server_backup.js` contains the JSON-based code
2. Create a migration script if needed

## 📱 Frontend Integration

Update your React Native app API calls to match the new response format:

```javascript
// Old format
const data = { catches: [...] }

// New format
const response = {
  success: true,
  count: 10,
  total: 100,
  page: 1,
  pages: 10,
  data: [...]
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in .env
- Check network/firewall settings

### Deprecation Warnings
- Update to latest mongoose version
- Use recommended connection options

## 📚 Resources

- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/
- Express Docs: https://expressjs.com/

## 🔐 Security Notes

- Don't commit `.env` file
- Use strong passwords
- Implement JWT authentication (future enhancement)
- Validate all inputs
- Use HTTPS in production
