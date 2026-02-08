import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.47.177.52:3000';

export default function SettingsScreen({ userName: initialUserName, userData: initialUserData, onLogout, onEditProfile, onLanguageChange, profilePhoto: initialProfilePhoto }) {
  const [userName, setUserName] = useState(initialUserName);
  const [userData, setUserData] = useState(initialUserData);
  const [profilePhoto, setProfilePhoto] = useState(initialProfilePhoto);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Fetch fresh user data from MongoDB on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        console.log('No token found');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Backend returns data directly, not nested
        const profileData = data.data;
        setUserData(profileData);
        setUserName(profileData.name);
        setProfilePhoto(profileData.profilePhoto);
        // Update AsyncStorage with fresh data
        await AsyncStorage.setItem('userData', JSON.stringify(profileData));
        await AsyncStorage.setItem('userName', profileData.name);
        if (profileData.profilePhoto) {
          await AsyncStorage.setItem('profilePhoto', profileData.profilePhoto);
        }
        console.log('Settings loaded from MongoDB:', profileData.name);
      } else {
        console.log('Failed to fetch profile:', data.error);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    if (onLanguageChange) {
      onLanguageChange(language.code);
    }
    Alert.alert('Language Changed', `App language set to ${language.name}`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: onLogout 
        },
      ]
    );
  };

  return (
    <View style={styles.settingsContainer}>
      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#2196F3" />
        </View>
      )}

      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileAvatar}>
          {profilePhoto ? (
            <Image source={{ uri: profilePhoto }} style={styles.profileAvatarImage} />
          ) : (
            <Text style={styles.profileAvatarText}>👤</Text>
          )}
        </View>
        <Text style={styles.profileName}>{userName || 'Fisherman'}</Text>
        <Text style={styles.profileEmail}>{userData?.email || 'fisherman@example.com'}</Text>
        {userData?.phone && (
          <Text style={styles.profilePhone}>{userData.phone}</Text>
        )}
      </View>

      {/* Language Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌐 Language / மொழி</Text>
        <View style={styles.card}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageItem,
                selectedLanguage === language.name && styles.languageItemActive
              ]}
              onPress={() => handleLanguageSelect(language)}
            >
              <View style={styles.languageLeft}>
                <Text style={styles.languageFlag}>{language.flag}</Text>
                <Text style={[
                  styles.languageName,
                  selectedLanguage === language.name && styles.languageNameActive
                ]}>
                  {language.name}
                </Text>
              </View>
              {selectedLanguage === language.name && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ App Settings</Text>
        <View style={styles.card}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔔</Text>
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E7EB', true: '#4CAF50' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingDivider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🌙</Text>
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#E5E7EB', true: '#4CAF50' }}
              thumbColor={darkModeEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Account</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.actionItem} onPress={onEditProfile}>
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={styles.actionLabel}>Edit Profile</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.settingDivider} />

          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionIcon}>🔒</Text>
            <Text style={styles.actionLabel}>Change Password</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.settingDivider} />

          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionIcon}>❓</Text>
            <Text style={styles.actionLabel}>Help & Support</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.settingDivider} />

          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionIcon}>📄</Text>
            <Text style={styles.actionLabel}>Privacy Policy</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>FISHNET v2.0.0</Text>
        <Text style={styles.versionSubtext}>© 2026 FISHNET. All rights reserved.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  profileSection: {
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileAvatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileAvatarText: {
    fontSize: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  profilePhone: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  languageItemActive: {
    backgroundColor: '#F0F9FF',
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  languageNameActive: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  actionArrow: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
