const mongoose = require('mongoose');

const catchSchema = new mongoose.Schema({
  fishType: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      default: ''
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    default: 'anonymous'
  },
  userName: {
    type: String,
    default: 'Fisher'
  },
  notes: {
    type: String,
    default: ''
  },
  weather: {
    temperature: Number,
    condition: String,
    windSpeed: Number
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
catchSchema.index({ fishType: 1 });
catchSchema.index({ date: -1 });
catchSchema.index({ userId: 1 });
catchSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });

// Virtual for formatted date
catchSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString();
});

// Method to get catch summary
catchSchema.methods.getSummary = function() {
  return {
    id: this._id,
    fishType: this.fishType,
    quantity: this.quantity,
    weight: this.weight,
    date: this.date,
    location: this.location
  };
};

// Static method to get statistics
catchSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalCatches: { $sum: 1 },
        totalQuantity: { $sum: '$quantity' },
        totalWeight: { $sum: '$weight' },
        avgQuantity: { $avg: '$quantity' },
        avgWeight: { $avg: '$weight' }
      }
    }
  ]);
  
  return stats[0] || {
    totalCatches: 0,
    totalQuantity: 0,
    totalWeight: 0,
    avgQuantity: 0,
    avgWeight: 0
  };
};

// Static method to get catches by fish type
catchSchema.statics.getByFishType = async function(fishType) {
  return await this.find({ fishType }).sort({ date: -1 });
};

const Catch = mongoose.model('Catch', catchSchema);

module.exports = Catch;
