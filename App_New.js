import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

// Import screens
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import UpdateScreen from './screens/UpdateScreen';

// Import components
import RecordCatchForm from './components/RecordCatchForm';
import FullScreenMap from './components/FullScreenMap';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const [showFullScreenMap, setShowFullScreenMap] = useState(false);
  
  // Catch form states
  const [catchFishType, setCatchFishType] = useState('');
  const [catchQuantity, setCatchQuantity] = useState('');
  const [catchWeight, setCatchWeight] = useState('');
  const [catchLocation, setCatchLocation] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
      Alert.alert('Welcome! 👋', 'Login successful');
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  const handleSignup = () => {
    if (name && email && password) {
      setIsLoggedIn(true);
      setShowSignup(false);
      Alert.alert('Success! 🎉', 'Account created successfully');
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setName('');
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
        Alert.alert('Success! 🎣', 'Your catch has been recorded successfully!');
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
            <Text style={styles.userName}>{name || 'Mark Cooper'}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => setActiveTab('Notifications')}
            >
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>5</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarButton}>
              <Text style={styles.avatarIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Notifications Screen */}
        {activeTab === 'Notifications' && <NotificationsScreen />}

        {/* Profile Screen */}
        {activeTab === 'Profile' && <ProfileScreen userName={name} />}

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
        {activeTab !== 'Profile' && activeTab !== 'Update' && activeTab !== 'Notifications' && activeTab !== 'RecordCatch' && (
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
          <Text style={[styles.navIcon, activeTab === 'Update' && styles.navIconActive]}>🔄</Text>
          <Text style={[styles.navLabel, activeTab === 'Update' && styles.navLabelActive]}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Market' && styles.navItemActive]}
          onPress={() => setActiveTab('Market')}
        >
          <Text style={[styles.navIcon, activeTab === 'Market' && styles.navIconActive]}>🛒</Text>
          <Text style={[styles.navLabel, activeTab === 'Market' && styles.navLabelActive]}>Market</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Logout' && styles.navItemActive]}
          onPress={handleLogout}
        >
          <Text style={[styles.navIcon, activeTab === 'Logout' && styles.navIconActive]}>🚪</Text>
          <Text style={[styles.navLabel, activeTab === 'Logout' && styles.navLabelActive]}>Logout</Text>
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
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    fontSize: 20,
  },
  
  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  
  // Bottom Navbar
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 25,
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
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
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
