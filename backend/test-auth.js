const axios = require('axios');

const API_URL = 'http://10.47.177.52:3000/api/auth';

// Test data
const testUser = {
  name: 'Test Fisherman',
  email: 'test@fishnet.com',
  password: 'test123456',
  phone: '+91 9876543210',
  licenseId: 'TN-FSH-TEST-001',
  region: 'Chennai Coast',
  boatName: 'Sea Explorer',
  experience: 5
};

let authToken = '';

// Test 1: Register new user
async function testRegister() {
  console.log('\n🔹 TEST 1: Register New User');
  console.log('===================================');
  
  try {
    const response = await axios.post(`${API_URL}/register`, testUser);
    console.log('✅ Registration successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.data.token) {
      authToken = response.data.data.token;
      console.log('\n🎟️  Token saved:', authToken.substring(0, 20) + '...');
    }
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('❌ Registration failed:', error.response.data.error);
      
      // If user exists, try logging in instead
      if (error.response.data.error.includes('already exists')) {
        console.log('\n📌 User exists, trying login instead...');
        return await testLogin();
      }
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

// Test 2: Login existing user
async function testLogin() {
  console.log('\n🔹 TEST 2: Login User');
  console.log('===================================');
  
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password
    });
    
    console.log('✅ Login successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.data.token) {
      authToken = response.data.data.token;
      console.log('\n🎟️  Token saved:', authToken.substring(0, 20) + '...');
    }
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('❌ Login failed:', error.response.data.error);
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

// Test 3: Get current user profile
async function testGetProfile() {
  console.log('\n🔹 TEST 3: Get User Profile (Protected Route)');
  console.log('===================================');
  
  if (!authToken) {
    console.log('❌ No auth token available. Skipping test.');
    return;
  }
  
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    console.log('✅ Profile retrieved successfully!');
    console.log('User Profile:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('❌ Profile fetch failed:', error.response.data.error);
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

// Test 4: Test invalid login
async function testInvalidLogin() {
  console.log('\n🔹 TEST 4: Invalid Login (Wrong Password)');
  console.log('===================================');
  
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: 'wrongpassword123'
    });
    
    console.log('❌ This should have failed!');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('✅ Correctly rejected invalid credentials');
      console.log('Error message:', error.response.data.error);
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }
}

// Test 5: Test protected route without token
async function testNoToken() {
  console.log('\n🔹 TEST 5: Protected Route Without Token');
  console.log('===================================');
  
  try {
    const response = await axios.get(`${API_URL}/me`);
    console.log('❌ This should have failed!');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('✅ Correctly rejected request without token');
      console.log('Error message:', error.response.data.error);
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n🎣 FISHNET AUTHENTICATION API TESTS');
  console.log('=====================================');
  console.log('API URL:', API_URL);
  console.log('=====================================');
  
  try {
    await testRegister();
    await testLogin();
    await testGetProfile();
    await testInvalidLogin();
    await testNoToken();
    
    console.log('\n\n✅ ALL TESTS COMPLETED!');
    console.log('=====================================\n');
  } catch (error) {
    console.log('\n\n❌ Tests failed with error:', error.message);
  }
}

// Run tests
runAllTests();
