require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Testing MongoDB Connection...\n');
console.log('Connection String:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('\n✅ MongoDB Connected Successfully!');
  console.log('📊 Database:', mongoose.connection.name);
  console.log('🌐 Host:', mongoose.connection.host);
  console.log('📡 Port:', mongoose.connection.port);
  console.log('\n🎉 Connection test passed!');
  process.exit(0);
})
.catch((error) => {
  console.error('\n❌ MongoDB Connection Failed!');
  console.error('Error:', error.message);
  console.error('\n📝 Troubleshooting:');
  console.error('1. Check your MongoDB Atlas IP whitelist');
  console.error('2. Verify username and password in .env');
  console.error('3. Ensure network connectivity');
  process.exit(1);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.error('\n⏱️  Connection timeout!');
  process.exit(1);
}, 10000);
