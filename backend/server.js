require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Catch = require('./models/Catch');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const { protect, optionalAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount auth routes
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🎣 Fishnet API with MongoDB',
    version: '2.0.0',
    endpoints: {
      catches: '/api/catches',
      users: '/api/users',
      stats: '/api/stats'
    }
  });
});

// ==================== CATCH ENDPOINTS ====================

// Get all catches
app.get('/api/catches', async (req, res) => {
  try {
    const { fishType, userId, limit = 100, page = 1 } = req.query;
    
    let query = {};
    if (fishType) query.fishType = fishType;
    if (userId) query.userId = userId;
    
    const skip = (page - 1) * limit;
    
    const catches = await Catch.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Catch.countDocuments(query);
    
    res.json({
      success: true,
      count: catches.length,
      total: total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: catches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get single catch by ID
app.get('/api/catches/:id', async (req, res) => {
  try {
    const catchData = await Catch.findById(req.params.id);
    
    if (!catchData) {
      return res.status(404).json({
        success: false,
        error: 'Catch not found'
      });
    }
    
    res.json({
      success: true,
      data: catchData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create new catch
app.post('/api/catches', async (req, res) => {
  try {
    const catchData = new Catch(req.body);
    await catchData.save();
    
    // Update user stats if userId is provided
    if (req.body.userId && req.body.userId !== 'anonymous') {
      const user = await User.findById(req.body.userId);
      if (user) {
        await user.updateStats();
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Catch recorded successfully',
      data: catchData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Update catch
app.put('/api/catches/:id', async (req, res) => {
  try {
    const catchData = await Catch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!catchData) {
      return res.status(404).json({
        success: false,
        error: 'Catch not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Catch updated successfully',
      data: catchData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Delete catch
app.delete('/api/catches/:id', async (req, res) => {
  try {
    const catchData = await Catch.findByIdAndDelete(req.params.id);
    
    if (!catchData) {
      return res.status(404).json({
        success: false,
        error: 'Catch not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Catch deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get catches by fish type
app.get('/api/catches/fishtype/:fishType', async (req, res) => {
  try {
    const catches = await Catch.getByFishType(req.params.fishType);
    
    res.json({
      success: true,
      count: catches.length,
      data: catches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==================== USER ENDPOINTS ====================

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user.getProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create new user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user.getProfile()
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email or License ID already exists'
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password; // Don't allow password update here
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: user.getProfile()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ==================== STATISTICS ENDPOINTS ====================

// Get overall statistics
app.get('/api/stats', async (req, res) => {
  try {
    const catchStats = await Catch.getStatistics();
    const userCount = await User.countDocuments();
    const fishTypes = await Catch.distinct('fishType');
    
    res.json({
      success: true,
      data: {
        catches: catchStats,
        users: userCount,
        fishTypes: fishTypes.length,
        uniqueFishTypes: fishTypes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get user statistics
app.get('/api/stats/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    await user.updateStats();
    
    const recentCatches = await Catch.find({ userId: req.params.userId })
      .sort({ date: -1 })
      .limit(10);
    
    res.json({
      success: true,
      data: {
        user: user.getProfile(),
        recentCatches: recentCatches
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get fish type statistics
app.get('/api/stats/fishtypes', async (req, res) => {
  try {
    const stats = await Catch.aggregate([
      {
        $group: {
          _id: '$fishType',
          count: { $sum: 1 },
          totalWeight: { $sum: '$weight' },
          totalQuantity: { $sum: '$quantity' },
          avgWeight: { $avg: '$weight' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    res.json({
      success: true,
      count: stats.length,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🎣 Fishnet Backend API with MongoDB');
  console.log(`📡 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📱 Access from phone: http://10.47.177.52:${PORT}`);
  console.log(`🗄️  MongoDB: ${process.env.MONGODB_URI}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});
