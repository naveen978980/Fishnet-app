// Server runner with explicit output
console.log('🔄 Loading environment variables...');
require('dotenv').config();

console.log('📦 Loading dependencies...');
const express = require('express');
const cors = require('cors');

console.log('🚀 Creating Express app...');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🎣 Fishnet API Running', 
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n🎉 ================================');
  console.log('✅ Backend Server is RUNNING!');
  console.log('================================');
  console.log(`📡 Local: http://localhost:${PORT}`);
  console.log(`📱 Network: http://10.47.177.52:${PORT}`);
  console.log('================================\n');
});

// Keep alive
setInterval(() => {
  console.log(`💚 Server alive - ${new Date().toLocaleTimeString()}`);
}, 30000);

// Error handling
server.on('error', (err) => {
  console.error('❌ Server Error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️  Port ${PORT} is already in use!`);
    console.error('Kill other process: Stop-Process -Name "node" -Force');
  }
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

console.log('⏳ Starting server...');
