// Clean Backend Server - No "next is not a function" error
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

console.log('🚀 Starting Backend...\n');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected: fishnet'))
  .catch((err) => console.error('❌ MongoDB Error:', err.message));

// Models
const User = require('./models/User');
const Catch = require('./models/Catch');

// Import auth routes
const authRoutes = require('./routes/auth');

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🎣 Fishnet API',
    version: '2.0',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', db: mongoose.connection.readyState === 1 });
});

app.get('/api/catches', async (req, res) => {
  try {
    const catches = await Catch.find().limit(100);
    res.json({ success: true, count: catches.length, data: catches });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/catches', async (req, res) => {
  try {
    const catchData = new Catch(req.body);
    await catchData.save();
    res.status(201).json({ success: true, data: catchData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 404 - Must be after all routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found', path: req.path });
});

// Error handler - Must have 4 parameters
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, error: err.message || 'Server error' });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n✅ SERVER RUNNING');
  console.log(`📡 http://localhost:${PORT}`);
  console.log(`📱 http://10.47.177.52:${PORT}`);
  console.log('\n📋 Endpoints:');
  console.log('  POST /api/auth/register');
  console.log('  POST /api/auth/login');
  console.log('  GET  /api/auth/me\n');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
