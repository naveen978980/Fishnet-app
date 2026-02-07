import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('Home'); // Track active navbar tab

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
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Record Your Catch</Text>
              <View style={styles.recordCatchCard}>
                <View style={styles.recordCatchHeader}>
                  <Text style={styles.recordCatchIcon}>🎣</Text>
                  <View style={styles.recordCatchHeaderText}>
                    <Text style={styles.recordCatchTitle}>Log Today's Catch</Text>
                    <Text style={styles.recordCatchSubtitle}>Track your fishing activity and earn rewards</Text>
                  </View>
                </View>

                <View style={styles.catchInputSection}>
                  <View style={styles.catchInputRow}>
                    <View style={styles.catchInputField}>
                      <Text style={styles.catchInputLabel}>Fish Type</Text>
                      <View style={styles.catchInput}>
                        <Text style={styles.catchInputPlaceholder}>Select species</Text>
                        <Text style={styles.catchInputIcon}>▼</Text>
                      </View>
                    </View>
                    <View style={styles.catchInputField}>
                      <Text style={styles.catchInputLabel}>Quantity</Text>
                      <View style={styles.catchInput}>
                        <Text style={styles.catchInputPlaceholder}>Enter count</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.catchInputRow}>
                    <View style={styles.catchInputField}>
                      <Text style={styles.catchInputLabel}>Weight (kg)</Text>
                      <View style={styles.catchInput}>
                        <Text style={styles.catchInputPlaceholder}>Total weight</Text>
                      </View>
                    </View>
                    <View style={styles.catchInputField}>
                      <Text style={styles.catchInputLabel}>Location</Text>
                      <View style={styles.catchInput}>
                        <Text style={styles.catchInputPlaceholder}>Current GPS</Text>
                        <Text style={styles.catchInputIcon}>📍</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.catchQuickStats}>
                  <View style={styles.quickStatItem}>
                    <Text style={styles.quickStatLabel}>Today's Total</Text>
                    <Text style={styles.quickStatValue}>12 fish</Text>
                  </View>
                  <View style={styles.quickStatDivider} />
                  <View style={styles.quickStatItem}>
                    <Text style={styles.quickStatLabel}>This Week</Text>
                    <Text style={styles.quickStatValue}>87 fish</Text>
                  </View>
                  <View style={styles.quickStatDivider} />
                  <View style={styles.quickStatItem}>
                    <Text style={styles.quickStatLabel}>Best Catch</Text>
                    <Text style={styles.quickStatValue}>15.2 kg</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.recordFishButton}>
                  <Text style={styles.recordFishButtonIcon}>📝</Text>
                  <Text style={styles.recordFishButtonText}>Record Fish Catch</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomSpacer} />
          </>
        )}

        {/* Home/Dashboard Screen */}
        {activeTab !== 'Profile' && activeTab !== 'Update' && activeTab !== 'Notifications' && (
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

        {/* Map Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fishing Locations</Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapIcon}>🗺️</Text>
              <Text style={styles.mapText}>Location 7</Text>
              <Text style={styles.mapSubtext}>📍 Multiple hotspots marked</Text>
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
    height: 250,
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

  // Record Catch Section
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
});
