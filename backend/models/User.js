const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  licenseId: {
    type: String,
    unique: true,
    trim: true
  },
  region: {
    type: String,
    default: 'Tamil Nadu Coast'
  },
  boatName: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    default: 0
  },
  profilePhoto: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['fisherman', 'researcher', 'admin'],
    default: 'fisherman'
  },
  verified: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  stats: {
    totalCatches: {
      type: Number,
      default: 0
    },
    totalWeight: {
      type: Number,
      default: 0
    },
    uniqueFishTypes: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ licenseId: 1 });

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Method to update user stats
userSchema.methods.updateStats = async function() {
  const Catch = mongoose.model('Catch');
  
  const catches = await Catch.find({ userId: this._id.toString() });
  const uniqueFishTypes = [...new Set(catches.map(c => c.fishType))];
  const totalWeight = catches.reduce((sum, c) => sum + c.weight, 0);
  
  this.stats.totalCatches = catches.length;
  this.stats.totalWeight = totalWeight;
  this.stats.uniqueFishTypes = uniqueFishTypes.length;
  
  await this.save();
};

// Method to get user profile
userSchema.methods.getProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    licenseId: this.licenseId,
    region: this.region,
    boatName: this.boatName,
    experience: this.experience,
    profilePhoto: this.profilePhoto,
    role: this.role,
    stats: this.stats,
    createdAt: this.createdAt
  };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
