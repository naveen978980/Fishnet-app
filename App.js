import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('Profile'); // Track active navbar tab

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
          <TouchableOpacity style={styles.avatarButton}>
            <Text style={styles.avatarIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total balance</Text>
            <View style={styles.notificationDot} />
          </View>
          <Text style={styles.balanceAmount}>$231.68</Text>
        </View>

      {/* Transactions Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionItem}>
          <View style={styles.transactionAvatar}>
            <Text style={styles.avatarEmoji}>👩</Text>
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Mila Epson</Text>
            <Text style={styles.transactionSubtitle}>Instagram Reel</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionTime}>10 Nov, 12:00 pm</Text>
            <Text style={styles.transactionAmount}>$210.00</Text>
          </View>
        </View>

        <View style={styles.transactionItem}>
          <View style={styles.transactionAvatar}>
            <Text style={styles.avatarEmoji}>👨</Text>
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Axmad Li</Text>
            <Text style={styles.transactionSubtitle}>TikTok Reel</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionTime}>10 Nov, 12:00 pm</Text>
            <Text style={styles.transactionAmount}>$809.99</Text>
          </View>
        </View>

        <View style={styles.transactionItem}>
          <View style={styles.transactionAvatar}>
            <Text style={styles.avatarEmoji}>👩</Text>
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>Mary Tyler</Text>
            <Text style={styles.transactionSubtitle}>Instagram Reel</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionTime}>10 Nov, 12:00 pm</Text>
            <Text style={styles.transactionAmount}>$499.00</Text>
          </View>
        </View>
      </View>

      {/* Spending Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spending</Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.seeAllText}>Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spendingRow}>
          <View style={styles.spendingCard}>
            <Text style={styles.spendingLabel}>Today</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartLine}>📈</Text>
            </View>
            <Text style={styles.spendingAmount}>$1,270</Text>
          </View>

          <View style={styles.spendingCard}>
            <Text style={styles.spendingLabel}>This month</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartLine}>📊</Text>
            </View>
            <Text style={styles.spendingAmount}>$4,760</Text>
          </View>
        </View>
      </View>

      {/* Profile Stats */}
      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>867</Text>
          <Text style={styles.statLabel}>Connections</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>253</Text>
          <Text style={styles.statLabel}>Collabs</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>104</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
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
});
