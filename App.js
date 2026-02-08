import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

// Record Catch Form Component
function RecordCatchForm({ onSuccess }) {
  const [fishType, setFishType] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setGettingLocation(true);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to record your catch location.'
        );
        setGettingLocation(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      // Display as Latitude and Longitude
      setLocationName(`Lat: ${currentLocation.coords.latitude.toFixed(6)}, Long: ${currentLocation.coords.longitude.toFixed(6)}`);

      setGettingLocation(false);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not get your current location');
      setGettingLocation(false);
    }
  };

  const handleSubmit = async () => {
    if (!fishType.trim()) {
      Alert.alert('Missing Information', 'Please enter the fish type');
      return;
    }

    if (!weight.trim()) {
      Alert.alert('Missing Information', 'Please enter the weight');
      return;
    }

    if (!location) {
      Alert.alert('Missing Information', 'Please allow location access to record your catch');
      return;
    }

    setLoading(true);

    try {
      const catchData = {
        fishType: fishType.trim(),
        weight: parseFloat(weight),
        length: length ? parseFloat(length) : null,
        quantity: parseInt(quantity) || 1,
        location: locationName || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`,
        coordinates: location,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        notes: notes.trim(),
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
        onSuccess();
      } else {
        Alert.alert('Error', result.message || 'Failed to record catch');
      }
    } catch (error) {
      console.error('Error submitting catch:', error);
      Alert.alert(
        'Error',
        'Could not connect to the server. Make sure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.recordCatchContainer}>
      <View style={styles.recordCatchForm}>
        {/* Fish Type */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Fish Type *</Text>
          <TextInput
            style={styles.formInput}
            placeholder="e.g., Bass, Trout, Salmon"
            value={fishType}
            onChangeText={setFishType}
            placeholderTextColor="#999"
          />
        </View>

        {/* Weight */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Weight (kg) *</Text>
          <TextInput
            style={styles.formInput}
            placeholder="e.g., 2.5"
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* Length */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Length (cm)</Text>
          <TextInput
            style={styles.formInput}
            placeholder="e.g., 45"
            value={length}
            onChangeText={setLength}
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* Quantity */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Quantity</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Number of fish caught"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="number-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* Location */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Location *</Text>
          <View style={styles.locationBox}>
            {gettingLocation ? (
              <View style={styles.locationLoading}>
                <ActivityIndicator size="small" color="#4A90E2" />
                <Text style={styles.locationLoadingText}>Getting location...</Text>
              </View>
            ) : location ? (
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>📍 {locationName}</Text>
                <TouchableOpacity
                  style={styles.refreshLocationButton}
                  onPress={getCurrentLocation}
                >
                  <Text style={styles.refreshLocationText}>🔄</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.getLocationButton}
                onPress={getCurrentLocation}
              >
                <Text style={styles.getLocationButtonText}>📍 Get Current Location</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Notes</Text>
          <TextInput
            style={[styles.formInput, styles.formTextArea]}
            placeholder="Additional details (bait used, weather, etc.)"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitCatchButton, loading && styles.submitCatchButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitCatchButtonText}>🎣 Record Catch</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('Home'); // Track active navbar tab
  
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

  // Signup Screen
  if (!isLoggedIn && showSignup) {
    return (
      <View style={styles.authContainer}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.authScroll}>
          <View style={styles.authHeader}>
            <Text style={styles.authLogo}>🐟</Text>
            <Text style={styles.authTitle}>Create Account</Text>
            <Text style={styles.authSubtitle}>Join FISHNET today</Text>
          </View>

          <View style={styles.authForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => setShowSignup(false)}
            >
              <Text style={styles.linkText}>Already have an account? <Text style={styles.linkTextBold}>Login</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <View style={styles.authContainer}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.authScroll}>
          <View style={styles.authHeader}>
            <Text style={styles.authLogo}>🐟</Text>
            <Text style={styles.authTitle}>Welcome Back</Text>
            <Text style={styles.authSubtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.authForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.primaryButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => setShowSignup(true)}
            >
              <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
        {activeTab === 'Notifications' && (
          <>
            {/* Notifications Header */}
            <View style={styles.notificationsHeader}>
              <Text style={styles.notificationsTitle}>Notifications</Text>
              <TouchableOpacity style={styles.markAllReadButton}>
                <Text style={styles.markAllReadText}>Mark all as read</Text>
              </TouchableOpacity>
            </View>

            {/* Notification Items */}
            <View style={styles.section}>
              <View style={styles.notificationItem}>
                <View style={styles.notificationIconContainer}>
                  <Text style={styles.notifIcon}>🎉</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>New Fishing Zone!</Text>
                  <Text style={styles.notificationMessage}>
                    A high-yield zone detected near Marina Beach
                  </Text>
                  <Text style={styles.notificationTimestamp}>2 hours ago</Text>
                </View>
                <View style={styles.unreadDot} />
              </View>

              <View style={styles.notificationItem}>
                <View style={styles.notificationIconContainer}>
                  <Text style={styles.notifIcon}>⚠️</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Weather Alert</Text>
                  <Text style={styles.notificationMessage}>
                    Heavy winds expected tonight 8 PM - 2 AM
                  </Text>
                  <Text style={styles.notificationTimestamp}>5 hours ago</Text>
                </View>
                <View style={styles.unreadDot} />
              </View>

              <View style={styles.notificationItem}>
                <View style={styles.notificationIconContainer}>
                  <Text style={styles.notifIcon}>🏆</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Achievement Unlocked!</Text>
                  <Text style={styles.notificationMessage}>
                    You earned 500 coins for tracking 10 fish species
                  </Text>
                  <Text style={styles.notificationTimestamp}>1 day ago</Text>
                </View>
                <View style={styles.unreadDot} />
              </View>

              <View style={[styles.notificationItem, styles.notificationRead]}>
                <View style={styles.notificationIconContainer}>
                  <Text style={styles.notifIcon}>📊</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Weekly Report Ready</Text>
                  <Text style={styles.notificationMessage}>
                    Your fishing report is available to view
                  </Text>
                  <Text style={styles.notificationTimestamp}>2 days ago</Text>
                </View>
              </View>

              <View style={[styles.notificationItem, styles.notificationRead]}>
                <View style={styles.notificationIconContainer}>
                  <Text style={styles.notifIcon}>🌊</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Conservation Update</Text>
                  <Text style={styles.notificationMessage}>
                    50kg plastic removed from coastal areas
                  </Text>
                  <Text style={styles.notificationTimestamp}>3 days ago</Text>
                </View>
              </View>

              <View style={[styles.notificationItem, styles.notificationRead]}>
                <View style={styles.notificationIconContainer}>
                  <Text style={styles.notifIcon}>🪙</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Coins Earned</Text>
                  <Text style={styles.notificationMessage}>
                    +100 coins for daily check-in streak
                  </Text>
                  <Text style={styles.notificationTimestamp}>4 days ago</Text>
                </View>
              </View>

              <View style={[styles.notificationItem, styles.notificationRead]}>
                <View style={styles.notificationIconContainer}>
                  <Text style={styles.notifIcon}>🎣</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Catch Recorded</Text>
                  <Text style={styles.notificationMessage}>
                    Successfully logged 5 fish catches
                  </Text>
                  <Text style={styles.notificationTimestamp}>5 days ago</Text>
                </View>
              </View>
            </View>

            <View style={styles.bottomSpacer} />
          </>
        )}

        {/* Profile Screen */}
        {activeTab === 'Profile' && (
          <View style={styles.profileScreen}>
            {/* Fisherman Profile Card */}
            <View style={styles.profileCard}>
              <Text style={styles.profileCardTitle}>Fisherman Profile</Text>
              
              <View style={styles.profileRow}>
                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Name</Text>
                  <Text style={styles.profileValue}>{name || 'Dobby Fisher'}</Text>
                </View>
                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>License ID</Text>
                  <Text style={styles.profileValue}>TN-FSH-2025-0093</Text>
                </View>
              </View>

              <View style={styles.profileRow}>
                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Phone</Text>
                  <Text style={styles.profileValue}>+91 91234 56789</Text>
                </View>
                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Region</Text>
                  <Text style={styles.profileValue}>Tamil Nadu Coast</Text>
                </View>
              </View>

              <View style={styles.profileRow}>
                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Experience</Text>
                  <Text style={styles.profileValue}>12 Years</Text>
                </View>
                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Boat Name</Text>
                  <Text style={styles.profileValue}>Sea Rider</Text>
                </View>
              </View>
            </View>

            {/* Fish Tracking Project Summary */}
            <View style={styles.projectSummaryCard}>
              <Text style={styles.profileCardTitle}>Fish Tracking Project Summary</Text>
              
              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Unique Fish Types</Text>
                  <Text style={styles.summaryNumber}>4</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Fish Zones Marked</Text>
                  <Text style={styles.summaryValue}>1 coastal hotspot</Text>
                </View>
              </View>

              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Last Sync</Text>
                  <Text style={styles.summaryValue}>3 days ago</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Research Partners</Text>
                  <Text style={styles.summaryValue}>2 institutes</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Update Screen */}
        {activeTab === 'Update' && (
          <>
            {/* Coins/Rewards Card */}
            <View style={styles.coinsCard}>
              <View style={styles.coinsContent}>
                <Text style={styles.coinsIcon}>🪙</Text>
                <View style={styles.coinsInfo}>
                  <Text style={styles.coinsLabel}>Your Rewards</Text>
                  <Text style={styles.coinsAmount}>2,450 Coins</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.redeemButton}>
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>

            {/* Record Catch Section */}
            {/* Modern Record Catch Section */}
            <View style={styles.modernCatchContainer}>
              <View style={styles.modernCatchCard}>
                {/* Card Header */}
                <Text style={styles.modernCardHeading}>Record Your Catch</Text>
                
                {/* Section Title with Icon */}
                <View style={styles.modernSectionHeader}>
                  <Text style={styles.modernSectionIcon}>🎣</Text>
                  <View style={styles.modernSectionTextContainer}>
                    <Text style={styles.modernSectionTitle}>Log Today's Catch</Text>
                    <Text style={styles.modernSectionSubtitle}>Track your fishing activity and earn rewards</Text>
                  </View>
                </View>

                {/* Two-Column Form Grid */}
                <View style={styles.modernFormGrid}>
                  <View style={styles.modernFormColumn}>
                    <Text style={styles.modernInputLabel}>Fish Type</Text>
                    <TextInput
                      style={styles.modernInput}
                      placeholder="e.g., Tuna"
                      value={catchFishType}
                      onChangeText={setCatchFishType}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                  <View style={styles.modernFormColumn}>
                    <Text style={styles.modernInputLabel}>Quantity</Text>
                    <TextInput
                      style={styles.modernInput}
                      placeholder="0"
                      value={catchQuantity}
                      onChangeText={setCatchQuantity}
                      keyboardType="number-pad"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>

                <View style={styles.modernFormGrid}>
                  <View style={styles.modernFormColumn}>
                    <Text style={styles.modernInputLabel}>Weight (kg)</Text>
                    <TextInput
                      style={styles.modernInput}
                      placeholder="0.0"
                      value={catchWeight}
                      onChangeText={setCatchWeight}
                      keyboardType="decimal-pad"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                  <View style={styles.modernFormColumn}>
                    <Text style={styles.modernInputLabel}>Location</Text>
                    <TouchableOpacity
                      style={styles.modernLocationInput}
                      onPress={getCatchLocation}
                      disabled={isGettingLocation}
                    >
                      {isGettingLocation ? (
                        <ActivityIndicator size="small" color="#4CAF50" />
                      ) : catchLocation ? (
                        <Text style={styles.modernLocationText} numberOfLines={1}>{catchLocation}</Text>
                      ) : (
                        <Text style={styles.modernLocationPlaceholder}>Get GPS</Text>
                      )}
                      {!isGettingLocation && (
                        <View style={styles.modernGpsDot} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Stats Section */}
                <View style={styles.modernStatsContainer}>
                  <View style={styles.modernStatItem}>
                    <Text style={styles.modernStatLabel}>Today's Total</Text>
                    <Text style={styles.modernStatValue}>12 fish</Text>
                  </View>
                  <View style={styles.modernStatDivider} />
                  <View style={styles.modernStatItem}>
                    <Text style={styles.modernStatLabel}>This Week</Text>
                    <Text style={styles.modernStatValue}>87 fish</Text>
                  </View>
                  <View style={styles.modernStatDivider} />
                  <View style={styles.modernStatItem}>
                    <Text style={styles.modernStatLabel}>Best Catch</Text>
                    <Text style={styles.modernStatValue}>15.2 kg</Text>
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity 
                  style={[styles.modernSubmitButton, isSubmitting && styles.modernSubmitButtonDisabled]}
                  onPress={submitCatchRecord}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <>
                      <Text style={styles.modernSubmitIcon}>✏️</Text>
                      <Text style={styles.modernSubmitText}>Record Fish Catch</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomSpacer} />
          </>
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
          <>
        {/* Coins/Rewards Card */}
        <View style={styles.coinsCard}>
          <View style={styles.coinsContent}>
            <Text style={styles.coinsIcon}>🪙</Text>
            <View style={styles.coinsInfo}>
              <Text style={styles.coinsLabel}>Your Rewards</Text>
              <Text style={styles.coinsAmount}>2,450 Coins</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.redeemButton}>
            <Text style={styles.redeemButtonText}>Redeem</Text>
          </TouchableOpacity>
        </View>

        {/* What's New Today Banner */}
        <View style={styles.updateBanner}>
          <View style={styles.updateBannerHeader}>
            <Text style={styles.updateBannerIcon}>📢</Text>
            <Text style={styles.updateBannerTitle}>What's New Today</Text>
          </View>
          <Text style={styles.updateBannerText}>
            Stay informed with real-time updates on fishing zones, weather alerts, 
            achievements, and ocean conservation efforts.
          </Text>
          <View style={styles.updateStats}>
            <View style={styles.updateStatItem}>
              <Text style={styles.updateStatNumber}>5</Text>
              <Text style={styles.updateStatLabel}>New Updates</Text>
            </View>
            <View style={styles.updateStatDivider} />
            <View style={styles.updateStatItem}>
              <Text style={styles.updateStatNumber}>2</Text>
              <Text style={styles.updateStatLabel}>Urgent Alerts</Text>
            </View>
            <View style={styles.updateStatDivider} />
            <View style={styles.updateStatItem}>
              <Text style={styles.updateStatNumber}>1</Text>
              <Text style={styles.updateStatLabel}>Rewards</Text>
            </View>
          </View>
        </View>

        {/* Map Section with Fishing Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗺️ Fishing Locations</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 13.0827,
                longitude: 80.2707,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
            >
              {/* Marina Beach Area */}
              <Marker
                coordinate={{ latitude: 13.0500, longitude: 80.2809 }}
                title="Marina Beach"
                description="Popular fishing spot - Good for Mackerel"
                pinColor="#4CAF50"
              />
              
              {/* Kovalam Beach */}
              <Marker
                coordinate={{ latitude: 12.7897, longitude: 80.2538 }}
                title="Kovalam Beach"
                description="Deep sea fishing - Tuna & Barracuda"
                pinColor="#2196F3"
              />
              
              {/* Ennore Creek */}
              <Marker
                coordinate={{ latitude: 13.2239, longitude: 80.3066 }}
                title="Ennore Creek"
                description="Creek fishing - Pomfret & Snapper"
                pinColor="#FF9800"
              />
              
              {/* Mahabalipuram Shore */}
              <Marker
                coordinate={{ latitude: 12.6208, longitude: 80.1989 }}
                title="Mahabalipuram Shore"
                description="Coastal fishing - Sardines & Prawns"
                pinColor="#9C27B0"
              />
              
              {/* Pulicat Lake */}
              <Marker
                coordinate={{ latitude: 13.4167, longitude: 80.3167 }}
                title="Pulicat Lake"
                description="Brackish water - Mullet & Catfish"
                pinColor="#F44336"
              />
              
              {/* Royapuram Fishing Harbor */}
              <Marker
                coordinate={{ latitude: 13.1147, longitude: 80.2906 }}
                title="Royapuram Harbor"
                description="Major fishing port - Various species"
                pinColor="#00BCD4"
              />
              
              {/* Kasimedu Fishing Harbor */}
              <Marker
                coordinate={{ latitude: 13.1187, longitude: 80.2944 }}
                title="Kasimedu Harbor"
                description="Active harbor - Fresh catch daily"
                pinColor="#FFEB3B"
              />
            </MapView>
            <View style={styles.mapLegend}>
              <Text style={styles.mapLegendText}>📍 7 Fishing Hotspots Near Chennai</Text>
            </View>
          </View>
        </View>

        {/* Weather Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather Conditions</Text>
          <View style={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <View>
                <Text style={styles.weatherLocation}>Chennai, Tamil Nadu</Text>
                <Text style={styles.weatherTime}>15:26:44 • Updated a few minutes ago</Text>
              </View>
            </View>
            <View style={styles.weatherMain}>
              <Text style={styles.weatherTemp}>26.5°C</Text>
              <Text style={styles.weatherCondition}>☀️ Sunny</Text>
              <Text style={styles.weatherDetails}>H 26.7° L 21.6°</Text>
            </View>
            <View style={styles.weatherStats}>
              <View style={styles.weatherStatItem}>
                <Text style={styles.weatherStatLabel}>Humidity</Text>
                <Text style={styles.weatherStatValue}>57%</Text>
              </View>
              <View style={styles.weatherStatItem}>
                <Text style={styles.weatherStatLabel}>Wind</Text>
                <Text style={styles.weatherStatValue}>16.6 km/h</Text>
              </View>
              <View style={styles.weatherStatItem}>
                <Text style={styles.weatherStatLabel}>Visibility</Text>
                <Text style={styles.weatherStatValue}>10 km</Text>
              </View>
            </View>
            <View style={styles.aqiContainer}>
              <Text style={styles.aqiLabel}>AQI: 35.5</Text>
              <View style={styles.aqiBadge}>
                <Text style={styles.aqiBadgeText}>✓ Safe</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ready to Dive In Section */}
        <View style={styles.diveInSection}>
          <Text style={styles.diveInTitle}>Ready to Dive In?</Text>
          <Text style={styles.diveInSubtitle}>Explore the potential of sustainable fishing with us.</Text>
          <Text style={styles.diveInSubtitle}>Join the movement to preserve our oceans and boost your yield.</Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedButtonText}>Get Started For Free ›</Text>
          </TouchableOpacity>
        </View>

        {/* Ocean Insight Section */}
        <View style={styles.oceanInsightSection}>
          <View style={styles.oceanInsightContent}>
            <Text style={styles.oceanInsightTitle}>Ocean Insight</Text>
            <Text style={styles.oceanInsightText}>Discover the diverse marine life.</Text>
            <Text style={styles.oceanInsightText}>Learn about species, habitats,</Text>
            <Text style={styles.oceanInsightText}>and ocean conservation efforts.</Text>
            <Text style={styles.oceanInsightText}>Join the movement for a better future.</Text>
          </View>
          <View style={styles.oceanInsightImage}>
            <Text style={styles.oceanInsightIcon}>🌊</Text>
            <Text style={styles.oceanInsightIcon}>🐟</Text>
          </View>
        </View>

        {/* About This App Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutIcon}>🐟</Text>
          <Text style={styles.aboutTitle}>About FISHNET</Text>
          <Text style={styles.aboutTagline}>Connecting Fishermen. Protecting Oceans. Building Future.</Text>
          
          <View style={styles.aboutContent}>
            <Text style={styles.aboutDescription}>
              FISHNET is your ultimate companion for sustainable fishing practices. 
              We empower fishermen with real-time ocean insights, weather updates, 
              and location tracking to make informed decisions at sea.
            </Text>
            
            <View style={styles.aboutFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🗺️</Text>
                <Text style={styles.featureText}>Track fishing hotspots</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🌦️</Text>
                <Text style={styles.featureText}>Live weather updates</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🪙</Text>
                <Text style={styles.featureText}>Earn rewards & coins</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🌊</Text>
                <Text style={styles.featureText}>Ocean conservation</Text>
              </View>
            </View>

            <Text style={styles.aboutMission}>
              Our mission is to bridge technology and tradition, helping fishermen 
              thrive while preserving marine ecosystems for generations to come.
            </Text>

            <Text style={styles.aboutFooter}>
              Join thousands of fishermen already using FISHNET! 🌊🐟
            </Text>
          </View>
        </View>

      <View style={styles.bottomSpacer} />
          </>
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
          <Text style={[styles.navIcon, activeTab === 'Market' && styles.navIconActive]}>�</Text>
          <Text style={[styles.navLabel, activeTab === 'Market' && styles.navLabelActive]}>Market</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Logout' && styles.navItemActive]}
          onPress={handleLogout}
        >
          <Text style={[styles.navIcon, activeTab === 'Logout' && styles.navIconActive]}>�</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  // Main Container
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f3f0',
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f3f0',
  },

  // Header
  headerContainer: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 24,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff5252',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  avatarButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    fontSize: 24,
  },

  // Bottom Navbar
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
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
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },

  // Auth Screens (Login/Signup)
  authContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  authScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  authLogo: {
    fontSize: 70,
    marginBottom: 20,
  },
  authTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  authForm: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    padding: 12,
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  linkTextBold: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },

  // Dashboard Content
  dashboardContent: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },

  // Balance Card
  balanceCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: -40,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff5252',
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },

  // Sections
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  seeAllButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  detailsButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  seeAllText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Transaction Item
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  transactionAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffeaa7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  transactionSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionTime: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },

  // Spending
  spendingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spendingCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
  },
  spendingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  chartPlaceholder: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartLine: {
    fontSize: 32,
  },
  spendingAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },

  // Profile Stats
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },

  // Logout Button
  logoutButton: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff5252',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#ff5252',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Bottom Spacer
  bottomSpacer: {
    height: 40,
  },

  // Coins/Rewards Card
  coinsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    margin: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  coinsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinsIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  coinsInfo: {
    justifyContent: 'center',
  },
  coinsLabel: {
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  coinsAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  redeemButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  redeemButtonText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Map Section
  mapContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    height: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapLegend: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  mapLegendText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 60,
    marginBottom: 12,
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666',
  },

  // Modern Record Catch Section
  modernCatchContainer: {
    backgroundColor: '#F5F6F8',
    padding: 16,
  },
  modernCatchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  modernCardHeading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  modernSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modernSectionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  modernSectionTextContainer: {
    flex: 1,
  },
  modernSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  modernSectionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  modernFormGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 14,
  },
  modernFormColumn: {
    flex: 1,
  },
  modernInputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  modernInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 11,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1F2937',
  },
  modernLocationInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 11,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 45,
  },
  modernLocationText: {
    fontSize: 13,
    color: '#1F2937',
    flex: 1,
  },
  modernLocationPlaceholder: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  modernGpsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginLeft: 8,
  },
  modernStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  modernStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  modernStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  modernStatValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modernStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  modernSubmitButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  modernSubmitButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.6,
  },
  modernSubmitIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  modernSubmitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Record Catch Section (OLD - Keep for backward compatibility)
  recordCatchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  recordCatchBlueBanner: {
    backgroundColor: '#4A90E2',
    padding: 30,
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 20,
  },
  recordCatchBannerIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  recordCatchBannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  recordCatchBannerSubtitle: {
    fontSize: 15,
    color: '#E8F4FF',
    textAlign: 'center',
  },
  recordCatchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recordCatchIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  recordCatchHeaderText: {
    flex: 1,
  },
  recordCatchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  recordCatchSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  catchInputSection: {
    marginBottom: 20,
  },
  catchInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  catchInputField: {
    flex: 1,
    marginHorizontal: 4,
  },
  catchInputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  catchInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  catchInputBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 14,
    color: '#333',
    minHeight: 45,
  },
  catchInputText: {
    fontSize: 13,
    color: '#333',
  },
  catchInputPlaceholder: {
    fontSize: 14,
    color: '#999',
  },
  catchInputIcon: {
    fontSize: 14,
    color: '#666',
  },
  catchQuickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  quickStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  quickStatDivider: {
    width: 1,
    height: 35,
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
  recordFishButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  recordFishButtonDisabled: {
    backgroundColor: '#A5D6A7',
    opacity: 0.7,
  },
  recordFishButtonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  recordFishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Weather Card
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  weatherHeader: {
    marginBottom: 16,
  },
  weatherLocation: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  weatherTime: {
    fontSize: 12,
    color: '#999',
  },
  weatherMain: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  weatherCondition: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  weatherDetails: {
    fontSize: 14,
    color: '#999',
  },
  weatherStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  weatherStatItem: {
    alignItems: 'center',
  },
  weatherStatLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  weatherStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  aqiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  aqiLabel: {
    fontSize: 14,
    color: '#666',
  },
  aqiBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  aqiBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Dive In Section
  diveInSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  diveInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  diveInSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  getStartedButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 20,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Ocean Insight Section
  oceanInsightSection: {
    backgroundColor: '#E8F5E9',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  oceanInsightContent: {
    flex: 1,
  },
  oceanInsightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  oceanInsightText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  oceanInsightImage: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 16,
  },
  oceanInsightIcon: {
    fontSize: 40,
    marginVertical: 4,
  },

  // About Section
  aboutSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderTopWidth: 4,
    borderTopColor: '#007bff',
  },
  aboutIcon: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 12,
  },
  aboutTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  aboutTagline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  aboutContent: {
    marginTop: 8,
  },
  aboutDescription: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  aboutFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  featureText: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '600',
    flex: 1,
  },
  aboutMission: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  aboutFooter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  // Notifications Screen
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  notificationsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  markAllReadButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markAllReadText: {
    fontSize: 13,
    color: '#007bff',
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  notificationRead: {
    backgroundColor: '#f8f9fa',
  },
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notifIcon: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
    paddingRight: 12,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 6,
  },
  notificationTimestamp: {
    fontSize: 11,
    color: '#999',
  },
  unreadDot: {
    position: 'absolute',
    top: 20,
    right: 16,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },

  // Update Screen
  updateBanner: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  updateBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateBannerIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  updateBannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  updateBannerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  updateStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  updateStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  updateStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  updateStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  updateStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  updateCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  updateHeaderText: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  updateTime: {
    fontSize: 12,
    color: '#999',
  },
  updateDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  updateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Profile Screen
  profileScreen: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  profileCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileField: {
    flex: 1,
    marginHorizontal: 8,
  },
  profileLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  profileValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  projectSummaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#007bff',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#007bff',
    marginBottom: 8,
    fontWeight: '600',
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  
  // Record Catch Form Styles
  recordCatchContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  recordCatchForm: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  formTextArea: {
    height: 100,
    paddingTop: 12,
  },
  locationBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
  },
  locationLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLoadingText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  locationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  refreshLocationButton: {
    padding: 5,
  },
  refreshLocationText: {
    fontSize: 20,
  },
  getLocationButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  getLocationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  submitCatchButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitCatchButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  submitCatchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

