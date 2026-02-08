import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Alert, ActivityIndicator, Image } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync, FishnetNotifications, sendLocalNotification } from './services/notificationService';

// Import screens
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import HomeScreen from './screens/HomeScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen1 from './screens/ProfileScreen1';
import UpdateScreen from './screens/UpdateScreen';
import SettingsScreen from './screens/SettingsScreen';
import MarketScreen from './screens/MarketScreen';

// Import components
import RecordCatchForm from './components/RecordCatchForm';
import FullScreenMap from './components/FullScreenMap';

// API Base URL
const API_URL = 'http://10.47.177.52:3000';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const [showFullScreenMap, setShowFullScreenMap] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userTokens, setUserTokens] = useState(800); // User tokens for rewards
  const [isLoading, setIsLoading] = useState(false);
  
  // Notification states
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // Badge count
  const [notificationHistory, setNotificationHistory] = useState([]); // Store all notifications
  const notificationListener = useRef();
  const responseListener = useRef();
  
  // Catch form states
  const [catchFishType, setCatchFishType] = useState('');
  const [catchQuantity, setCatchQuantity] = useState('');
  const [catchWeight, setCatchWeight] = useState('');
  const [catchLocation, setCatchLocation] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is already logged in on app start & setup notifications
  useEffect(() => {
    checkLoginStatus();
    setupNotifications();
    
    // Cleanup notification listeners on unmount
    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  // Setup push notifications
  const setupNotifications = async () => {
    try {
      console.log('🔔 Setting up notifications...');
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
        console.log('✅ Notification token received');
      } else {
        console.log('⚠️ No push token, but local notifications will work');
      }

      // Listen for incoming notifications
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log('📲 Notification received:', notification);
        setNotification(notification);
        setNotificationCount(prev => prev + 1); // Increment badge count
        Notifications.setBadgeCountAsync(notificationCount + 1); // Update app badge
      });

      // Listen for notification responses (when user taps notification)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log('👆 Notification tapped:', response);
        const data = response.notification.request.content.data;
        
        // Handle notification tap based on type
        if (data.type === 'fish_caught') {
          setActiveTab('Home');
        } else if (data.type === 'profile_update') {
          setActiveTab('Profile');
        } else if (data.type === 'token_change') {
          setActiveTab('Profile'); // Show profile where tokens are visible
        }
      });
    } catch (error) {
      console.error('Error setting up notifications:', error);
    }
  };

  // Add notification to history
  const addNotificationToHistory = (icon, title, message) => {
    const newNotification = {
      id: Date.now(),
      icon,
      title,
      message,
      timestamp: 'Just now',
      unread: true,
    };
    setNotificationHistory(prev => [newNotification, ...prev]);
  };

  // Mark all notifications as read
  const markAllNotificationsRead = () => {
    setNotificationHistory(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedUserData = await AsyncStorage.getItem('userData');
      const storedProfilePhoto = await AsyncStorage.getItem('profilePhoto');
      
      if (token) {
        setUserToken(token);
        setUserId(storedUserId);
        setUserName(storedUserName);
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
          setUserTokens(parsedData.tokens || 800);
        }
        if (storedProfilePhoto) {
          setProfilePhoto(storedProfilePhoto);
        }
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password
        })
      });

      const data = await response.json();

      if (data.success) {
        // Store token and user info
        const token = data.data?.token || data.token;
        const user = data.data?.user || data.user;
        
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userId', user.id);
        await AsyncStorage.setItem('userName', user.name);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        if (user.profilePhoto) {
          await AsyncStorage.setItem('profilePhoto', user.profilePhoto);
        }
        
        setUserToken(token);
        setUserId(user.id);
        setUserName(user.name);
        setUserData(user);
        setProfilePhoto(user.profilePhoto || null);
        setUserTokens(user.tokens || 800);
        setIsLoggedIn(true);
        
        Alert.alert('Welcome! 👋', `${user.name}, login successful`);
      } else {
        Alert.alert('Login Failed', data.message || data.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Could not connect to server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (userData) => {
    // If called without userData (old way), use state variables
    const signupData = userData || {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      phone: '+91 12345 67890',
      licenseId: `FSH-${Date.now()}`
    };

    if (!signupData.name || !signupData.email || !signupData.password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (signupData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (!signupData.phone) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare data for API (without profilePhoto for now)
      const apiData = {
        name: signupData.name.trim(),
        email: signupData.email.trim().toLowerCase(),
        password: signupData.password,
        phone: signupData.phone,
        licenseId: signupData.licenseId || `FSH-${Date.now()}`,
        region: signupData.region || 'Tamil Nadu Coast',
        experience: signupData.experience || 0,
        boatName: signupData.boatName || ''
      };

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      const data = await response.json();
      
      // DEBUG LOG
      console.log('📝 SIGNUP RESPONSE:', JSON.stringify(data, null, 2));
      console.log('📝 Response status:', response.status);

      if (data.success) {
        // Store token and user info
        const token = data.data?.token || data.token;
        const user = data.data?.user || data.user;
        
        console.log('✅ Token exists:', !!token);
        console.log('✅ User exists:', !!user);
        
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userId', user.id);
        await AsyncStorage.setItem('userName', user.name);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        if (signupData.profilePhoto || user.profilePhoto) {
          await AsyncStorage.setItem('profilePhoto', signupData.profilePhoto || user.profilePhoto);
        }
        
        setUserToken(token);
        setUserId(user.id);
        setUserName(user.name);
        setUserData(user);
        setProfilePhoto(signupData.profilePhoto || user.profilePhoto || null);
        setIsLoggedIn(true);
        setShowSignup(false);
        
        Alert.alert('Success! 🎉', `Welcome ${user.name}! Account created successfully.`);
      } else {
        Alert.alert('Signup Failed', data.message || data.error || 'Could not create account');
      }
    } catch (error) {
      console.error('❌ SIGNUP ERROR:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error type:', error.name);
      Alert.alert('Error', 'Could not connect to server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Optional: Call logout API
      if (userToken) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
      }
      
      // Clear local storage
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('profilePhoto');
      
      // Clear state
      setIsLoggedIn(false);
      setUserToken(null);
      setUserId(null);
      setUserName('');
      setUserData(null);
      setProfilePhoto(null);
      setEmail('');
      setPassword('');
      setName('');
      
      Alert.alert('Goodbye! 👋', 'Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggedIn(false);
    }
  };

  const handleEditProfile = async (updatedData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(updatedData)
      });

      const data = await response.json();

      if (data.success) {
        const updatedUser = data.data.user || data.data;
        
        // Update local storage
        await AsyncStorage.setItem('userName', updatedUser.name);
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        if (updatedData.profilePhoto) {
          await AsyncStorage.setItem('profilePhoto', updatedData.profilePhoto);
          setProfilePhoto(updatedData.profilePhoto);
        } else if (updatedUser.profilePhoto) {
          await AsyncStorage.setItem('profilePhoto', updatedUser.profilePhoto);
          setProfilePhoto(updatedUser.profilePhoto);
        }
        
        // Update state
        setUserName(updatedUser.name);
        setUserData(updatedUser);
        setShowEditProfile(false);
        
        Alert.alert('Success! ✅', 'Profile updated successfully');
        
        // Send notification with user name
        await FishnetNotifications.profileUpdated(updatedUser.name || 'Fisherman');
        
        // Add to notification history
        addNotificationToHistory('✅', 'Profile Updated', 'Your profile information has been saved successfully');
      } else {
        Alert.alert('Update Failed', data.message || data.error || 'Could not update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      Alert.alert('Error', 'Could not connect to server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get current location for catch form
  const getCatchLocation = async () => {
    try {
      setIsGettingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        setIsGettingLocation(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const locationStr = `Lat: ${currentLocation.coords.latitude.toFixed(6)}, Long: ${currentLocation.coords.longitude.toFixed(6)}`;
      setCatchLocation(locationStr);
      setIsGettingLocation(false);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not get your current location');
      setIsGettingLocation(false);
    }
  };

  // Submit catch record
  const submitCatchRecord = async () => {
    if (!catchFishType.trim()) {
      Alert.alert('Missing Information', 'Please enter the fish type');
      return;
    }
    if (!catchQuantity.trim()) {
      Alert.alert('Missing Information', 'Please enter the quantity');
      return;
    }
    if (!catchWeight.trim()) {
      Alert.alert('Missing Information', 'Please enter the weight');
      return;
    }
    if (!catchLocation.trim()) {
      Alert.alert('Missing Information', 'Please get location first');
      return;
    }

    setIsSubmitting(true);

    try {
      const catchData = {
        fishType: catchFishType.trim(),
        weight: parseFloat(catchWeight),
        quantity: parseInt(catchQuantity) || 1,
        location: catchLocation,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
      };

      const response = await fetch('http://10.47.177.52:3000/api/catches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catchData),
      });

      const result = await response.json();

      if (result.success) {
        // Earn 40 tokens for recording catch
        await earnTokens(40, 'recording catch');
        
        Alert.alert('Success! 🎣', 'Your catch has been recorded successfully!\n\n+40 tokens earned! 🪙');
        
        // Send notification with user name
        await FishnetNotifications.fishCaught(
          catchFishType.trim(),
          parseFloat(catchWeight),
          userName || 'Fisherman'
        );
        
        // Reset form
        setCatchFishType('');
        setCatchQuantity('');
        setCatchWeight('');
        setCatchLocation('');
      } else {
        Alert.alert('Error', result.message || 'Failed to record catch');
      }
    } catch (error) {
      console.error('Error submitting catch:', error);
      Alert.alert('Error', 'Could not connect to the server. Make sure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Earn tokens (for recording catch)
  const earnTokens = async (amount, reason) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/tokens/earn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ amount, reason })
      });

      const data = await response.json();
      if (data.success) {
        setUserTokens(data.tokens);
        // Update userData
        const updatedUserData = { ...userData, tokens: data.tokens };
        setUserData(updatedUserData);
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        
        // Send notification for tokens earned
        const notifMessage = `You earned +${amount} tokens! New balance: ${data.tokens} 🪙`;
        await sendLocalNotification(
          '🪙 Tokens Earned!',
          notifMessage,
          { type: 'token_change', action: 'earned', amount }
        );
        
        // Add to notification history
        addNotificationToHistory('🪙', 'Tokens Earned!', notifMessage);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error earning tokens:', error);
      return false;
    }
  };

  // Spend tokens (for market access)
  const spendTokens = async (amount, reason) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/tokens/spend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ amount, reason })
      });

      const data = await response.json();
      if (data.success) {
        setUserTokens(data.tokens);
        // Update userData
        const updatedUserData = { ...userData, tokens: data.tokens };
        setUserData(updatedUserData);
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        
        // Send notification for tokens spent
        const notifMessage = `You spent -${amount} tokens for ${reason}. Remaining: ${data.tokens} 🪙`;
        await sendLocalNotification(
          '💰 Tokens Spent',
          notifMessage,
          { type: 'token_change', action: 'spent', amount }
        );
        
        // Add to notification history
        addNotificationToHistory('💰', 'Tokens Spent', notifMessage);
        
        return true;
      } else {
        Alert.alert('Insufficient Tokens', `You need ${amount} tokens. Current balance: ${userTokens}`);
        return false;
      }
    } catch (error) {
      console.error('Error spending tokens:', error);
      Alert.alert('Error', 'Could not process token transaction');
      return false;
    }
  };

  // Show Signup Screen
  if (!isLoggedIn && showSignup) {
    return (
      <SignupScreen
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSignup={handleSignup}
        onSwitchToLogin={() => setShowSignup(false)}
        isLoading={isLoading}
      />
    );
  }

  // Show Edit Profile Screen
  if (showEditProfile) {
    return (
      <EditProfileScreen
        userData={userData}
        onSave={handleEditProfile}
        onCancel={() => setShowEditProfile(false)}
        isLoading={isLoading}
      />
    );
  }

  // Show Login Screen
  if (!isLoggedIn) {
    return (
      <LoginScreen
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
        onSwitchToSignup={() => setShowSignup(true)}
        isLoading={isLoading}
      />
    );
  }

  // Main Dashboard Screen
  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" />
      
      {/* Header with Navbar */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>{userName || name || 'Fisherman'}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => {
                setActiveTab('Notifications');
                setNotificationCount(0); // Reset badge when opening notifications
                Notifications.setBadgeCountAsync(0);
              }}
            >
              <Text style={styles.notificationIcon}>🔔</Text>
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{notificationCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.coinsHeaderButton}>
              <Text style={styles.coinsHeaderIcon}>🪙</Text>
              <Text style={styles.coinsHeaderText}>{userTokens.toLocaleString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarButton}>
              {profilePhoto ? (
                <Image source={{ uri: profilePhoto }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarIcon}>👤</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Notifications Screen */}
        {activeTab === 'Notifications' && (
          <NotificationsScreen 
            notifications={notificationHistory} 
            onMarkAllRead={markAllNotificationsRead}
          />
        )}

        {/* Profile Screen */}
        {activeTab === 'Profile' && <ProfileScreen1 userName={userName} userData={userData} profilePhoto={profilePhoto} />}

        {/* Settings Screen */}
        {activeTab === 'Settings' && (
          <SettingsScreen 
            userName={userName} 
            userData={userData}
            onLogout={handleLogout}
            onEditProfile={() => setShowEditProfile(true)}
            onLanguageChange={(code) => console.log('Language changed to:', code)}
          />
        )}

        {/* Market Screen - Fish Species Explorer */}
        {activeTab === 'Market' && <MarketScreen spendTokens={spendTokens} />}

        {/* Update Screen */}
        {activeTab === 'Update' && (
          <UpdateScreen
            catchFishType={catchFishType}
            setCatchFishType={setCatchFishType}
            catchQuantity={catchQuantity}
            setCatchQuantity={setCatchQuantity}
            catchWeight={catchWeight}
            setCatchWeight={setCatchWeight}
            catchLocation={catchLocation}
            isGettingLocation={isGettingLocation}
            isSubmitting={isSubmitting}
            onGetLocation={getCatchLocation}
            onSubmit={submitCatchRecord}
          />
        )}

        {/* Record Catch Screen */}
        {activeTab === 'RecordCatch' && (
          <RecordCatchForm 
            onSuccess={() => {
              setActiveTab('Home');
              Alert.alert('Success! 🎣', 'Your catch has been recorded successfully!');
            }}
          />
        )}

        {/* Home/Dashboard Screen */}
        {activeTab !== 'Profile' && activeTab !== 'Update' && activeTab !== 'Notifications' && activeTab !== 'RecordCatch' && activeTab !== 'Settings' && activeTab !== 'Market' && (
          <HomeScreen onMapPress={() => setShowFullScreenMap(true)} />
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Home' && styles.navItemActive]}
          onPress={() => setActiveTab('Home')}
        >
          <Text style={[styles.navIcon, activeTab === 'Home' && styles.navIconActive]}>🏠</Text>
          <Text style={[styles.navLabel, activeTab === 'Home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Update' && styles.navItemActive]}
          onPress={() => setActiveTab('Update')}
        >
          <Text style={[styles.navIcon, activeTab === 'Update' && styles.navIconActive]}>🎣</Text>
          <Text style={[styles.navLabel, activeTab === 'Update' && styles.navLabelActive]}>Record</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Market' && styles.navItemActive]}
          onPress={() => setActiveTab('Market')}
        >
          <Text style={[styles.navIcon, activeTab === 'Market' && styles.navIconActive]}>🐟</Text>
          <Text style={[styles.navLabel, activeTab === 'Market' && styles.navLabelActive]}>Market</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Settings' && styles.navItemActive]}
          onPress={() => setActiveTab('Settings')}
        >
          <Text style={[styles.navIcon, activeTab === 'Settings' && styles.navIconActive]}>⚙️</Text>
          <Text style={[styles.navLabel, activeTab === 'Settings' && styles.navLabelActive]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Profile' && styles.navItemActive]}
          onPress={() => setActiveTab('Profile')}
        >
          <Text style={[styles.navIcon, activeTab === 'Profile' && styles.navIconActive]}>👤</Text>
          <Text style={[styles.navLabel, activeTab === 'Profile' && styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Full Screen Map Modal */}
      {showFullScreenMap && (
        <FullScreenMap onClose={() => setShowFullScreenMap(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Main Container
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  
  // Header
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  coinsHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  coinsHeaderIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  coinsHeaderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarIcon: {
    fontSize: 20,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  
  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  
  // Bottom Navbar
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 50,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navItemActive: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  navLabelActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});
