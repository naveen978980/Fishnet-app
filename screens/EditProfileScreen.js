import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function EditProfileScreen({ 
  userData,
  onSave,
  onCancel,
  isLoading 
}) {
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [licenseId, setLicenseId] = useState(userData?.licenseId || '');
  const [region, setRegion] = useState(userData?.region || 'Tamil Nadu Coast');
  const [experience, setExperience] = useState(userData?.experience?.toString() || '0');
  const [boatName, setBoatName] = useState(userData?.boatName || '');
  const [profilePhoto, setProfilePhoto] = useState(userData?.profilePhoto || null);

  const regions = [
    'Tamil Nadu Coast',
    'Kerala Coast',
    'Karnataka Coast',
    'Goa Coast',
    'Maharashtra Coast',
    'Gujarat Coast',
    'Andhra Pradesh Coast',
    'Odisha Coast',
    'West Bengal Coast',
    'Andaman and Nicobar',
    'Lakshadweep',
    'Puducherry Coast'
  ];

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Please allow access to your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Please allow access to your camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Profile Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSave = () => {
    // No validation - users can save with whatever they have
    // Just send all current values
    onSave({
      name,
      email,
      phone,
      licenseId,
      region,
      experience: parseInt(experience) || 0,
      boatName,
      profilePhoto
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={onCancel}>
          <Text style={styles.headerButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleSave} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : (
            <Text style={styles.headerButtonTextSave}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          {/* Profile Photo */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Profile Photo</Text>
            <TouchableOpacity style={styles.photoContainer} onPress={showImageOptions}>
              {profilePhoto ? (
                <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderText}>📷</Text>
                  <Text style={styles.photoPlaceholderSubtext}>Tap to change</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Full Name */}
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

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              placeholder="your.email@example.com"
              value={email}
              editable={false}
              placeholderTextColor="#999"
            />
            <Text style={styles.helperText}>Email cannot be changed</Text>
          </View>

          {/* Mobile Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 9876543210 (optional)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>

          {/* License ID */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Fishing License ID</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., TN-FSH-12345 (optional)"
              value={licenseId}
              onChangeText={setLicenseId}
              placeholderTextColor="#999"
            />
          </View>

          {/* Region */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Region</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={region}
                onValueChange={(itemValue) => setRegion(itemValue)}
                style={styles.picker}
              >
                {regions.map((reg) => (
                  <Picker.Item key={reg} label={reg} value={reg} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Experience */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Fishing Experience (years)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 5"
              value={experience}
              onChangeText={setExperience}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          {/* Boat Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Boat Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your boat name"
              value={boatName}
              onChangeText={setBoatName}
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    width: 60,
    height: 40,
    justifyContent: 'center',
  },
  headerButtonText: {
    fontSize: 24,
    color: '#6B7280',
  },
  headerButtonTextSave: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'right',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scrollContent: {
    padding: 20,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#1F2937',
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6',
    color: '#9CA3AF',
  },
  helperText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 40,
    marginBottom: 4,
  },
  photoPlaceholderSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  pickerContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
