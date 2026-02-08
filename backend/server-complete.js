// Complete Backend Server with MongoDB Authentication
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting Fishnet Backend Server...\n');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
console.log('📡 Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📍 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// Import models and routes
const User = require('./models/User');
const Catch = require('./models/Catch');
const authRoutes = require('./routes/auth');

// Mount auth routes
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🎣 Fishnet API with MongoDB',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      catches: '/api/catches',
      users: '/api/users',
      stats: '/api/stats'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date()
  });
});

// Get all catches
app.get('/api/catches', async (req, res) => {
  try {
    const catches = await Catch.find().limit(100);
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

// Create catch
app.post('/api/catches', async (req, res) => {
  try {
    const catchData = new Catch(req.body);
    await catchData.save();
    res.status(201).json({
      success: true,
      data: catchData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

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

// 404 handler - must be after all routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Error handler - must be LAST
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n🎉 ================================');
  console.log('✅ Backend Server is RUNNING!');
  console.log('================================');
  console.log(`📡 Local: http://localhost:${PORT}`);
  console.log(`📱 Network: http://10.47.177.52:${PORT}`);
  console.log(`🗄️  MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...'}`);
  console.log('================================');
  console.log('\n📋 Available Endpoints:');
  console.log('  POST /api/auth/register');
  console.log('  POST /api/auth/login');
  console.log('  GET  /api/auth/me');
  console.log('  GET  /api/catches');
  console.log('  POST /api/catches');
  console.log('  GET  /api/users');
  console.log('================================\n');
});

// Keep alive heartbeat
setInterval(() => {
  const now = new Date().toLocaleTimeString();
  console.log(`💚 Server running - ${now}`);
}, 60000);

// Error handling
server.on('error', (err) => {
  console.error('❌ Server Error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`\n⚠️  Port ${PORT} is already in use!`);
    console.error('Run this to kill other processes:');
    console.error('Stop-Process -Name "node" -Force\n');
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
});

console.log('⏳ Server starting...\n');
