const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Path to JSON data file
const dataFilePath = path.join(__dirname, 'data', 'catches.json');

// Ensure data directory and file exist
const ensureDataFile = () => {
  const dataDir = path.join(__dirname, 'data');
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ catches: [] }, null, 2));
  }
};

// Read catches from JSON file
const readCatches = () => {
  try {
    ensureDataFile();
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading catches:', error);
    return { catches: [] };
  }
};

// Write catches to JSON file
const writeCatches = (data) => {
  try {
    ensureDataFile();
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing catches:', error);
    return false;
  }
};

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Fishnet API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Get all catches
app.get('/api/catches', (req, res) => {
  try {
    const data = readCatches();
    res.json({
      success: true,
      count: data.catches.length,
      data: data.catches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving catches',
      error: error.message
    });
  }
});

// Get single catch by ID
app.get('/api/catches/:id', (req, res) => {
  try {
    const data = readCatches();
    const catchData = data.catches.find(c => c.id === req.params.id);
    
    if (!catchData) {
      return res.status(404).json({
        success: false,
        message: 'Catch not found'
      });
    }
    
    res.json({
      success: true,
      data: catchData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving catch',
      error: error.message
    });
  }
});

// Create new catch record
app.post('/api/catches', (req, res) => {
  try {
    const { fishType, weight, length, location, date, time, image, notes } = req.body;
    
    // Validation
    if (!fishType || !weight || !location) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: fishType, weight, and location are required'
      });
    }
    
    const data = readCatches();
    
    // Create new catch record
    const newCatch = {
      id: Date.now().toString(),
      fishType,
      weight: parseFloat(weight),
      length: length ? parseFloat(length) : null,
      location,
      date: date || new Date().toISOString().split('T')[0],
      time: time || new Date().toLocaleTimeString(),
      image: image || null,
      notes: notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    data.catches.push(newCatch);
    
    if (writeCatches(data)) {
      res.status(201).json({
        success: true,
        message: 'Catch recorded successfully',
        data: newCatch
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error saving catch data'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating catch record',
      error: error.message
    });
  }
});

// Update catch record
app.put('/api/catches/:id', (req, res) => {
  try {
    const data = readCatches();
    const catchIndex = data.catches.findIndex(c => c.id === req.params.id);
    
    if (catchIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Catch not found'
      });
    }
    
    // Update catch record
    const updatedCatch = {
      ...data.catches[catchIndex],
      ...req.body,
      id: req.params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    data.catches[catchIndex] = updatedCatch;
    
    if (writeCatches(data)) {
      res.json({
        success: true,
        message: 'Catch updated successfully',
        data: updatedCatch
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error updating catch data'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating catch record',
      error: error.message
    });
  }
});

// Delete catch record
app.delete('/api/catches/:id', (req, res) => {
  try {
    const data = readCatches();
    const catchIndex = data.catches.findIndex(c => c.id === req.params.id);
    
    if (catchIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Catch not found'
      });
    }
    
    const deletedCatch = data.catches[catchIndex];
    data.catches.splice(catchIndex, 1);
    
    if (writeCatches(data)) {
      res.json({
        success: true,
        message: 'Catch deleted successfully',
        data: deletedCatch
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error deleting catch data'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting catch record',
      error: error.message
    });
  }
});

// Get statistics
app.get('/api/stats', (req, res) => {
  try {
    const data = readCatches();
    const catches = data.catches;
    
    const stats = {
      totalCatches: catches.length,
      totalWeight: catches.reduce((sum, c) => sum + c.weight, 0),
      averageWeight: catches.length > 0 
        ? (catches.reduce((sum, c) => sum + c.weight, 0) / catches.length).toFixed(2)
        : 0,
      fishTypes: [...new Set(catches.map(c => c.fishType))],
      largestCatch: catches.length > 0 
        ? catches.reduce((max, c) => c.weight > max.weight ? c : max, catches[0])
        : null
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving statistics',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  ensureDataFile();
  console.log(`🎣 Fishnet Backend API running on http://localhost:${PORT}`);
  console.log(`📊 Data file: ${dataFilePath}`);
});
