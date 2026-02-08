// Script to update all existing users to 800 tokens
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const updateTokens = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Update all users to have 800 tokens
    const result = await User.updateMany(
      {}, // Match all users
      { $set: { tokens: 800 } }
    );

    console.log(`✅ Updated ${result.modifiedCount} users to 800 tokens`);
    
    // Show all users with their new token balance
    const users = await User.find({}, 'name email tokens');
    console.log('\n📊 User Token Balances:');
    users.forEach(user => {
      console.log(`   ${user.name} (${user.email}): ${user.tokens} tokens 🪙`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateTokens();
