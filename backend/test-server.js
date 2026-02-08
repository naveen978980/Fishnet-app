// Minimal test server
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Test server running', timestamp: new Date() });
});

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API working!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`📱 Network: http://10.47.177.52:${PORT}`);
});
