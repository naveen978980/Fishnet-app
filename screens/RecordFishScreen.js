import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';
import * as Location from 'expo-location';

export default function RecordFishScreen({ navigation }) {
  const [fishType, setFishType] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  // Get current location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setGettingLocation(true);
      
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to record your catch location.'
        );
        setGettingLocation(false);
        return;
      }

      // Get current position
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      // Reverse geocode to get location name
      const [address] = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address) {
        const locationStr = [
          address.name,
          address.city,
          address.region,
        ].filter(Boolean).join(', ');
        
        setLocationName(locationStr || 'Unknown Location');
      } else {
        setLocationName(`${currentLocation.coords.latitude.toFixed(4)}, ${currentLocation.coords.longitude.toFixed(4)}`);
      }

      setGettingLocation(false);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not get your current location');
      setGettingLocation(false);
    }
  };

  const handleSubmit = async () => {
    // Validation
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

      // Send to backend API
      const response = await fetch('http://localhost:3000/api/catches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catchData),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert(
          'Success! 🎣',
          'Your catch has been recorded successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form
                setFishType('');
                setWeight('');
                setLength('');
                setQuantity('1');
                setNotes('');
                // Navigate to home or profile
                navigation.navigate('Home');
              },
            },
          ]
        );
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎣 Record Your Catch</Text>
        <Text style={styles.subtitle}>Fill in the details below</Text>
      </View>

      <View style={styles.form}>
        {/* Fish Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fish Type *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Bass, Trout, Salmon"
            value={fishType}
            onChangeText={setFishType}
          />
        </View>

        {/* Weight */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg) *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 2.5"
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Length */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Length (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 45"
            value={length}
            onChangeText={setLength}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Quantity */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of fish caught"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="number-pad"
          />
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location *</Text>
          <View style={styles.locationContainer}>
            {gettingLocation ? (
              <View style={styles.locationLoading}>
                <ActivityIndicator size="small" color="#4A90E2" />
                <Text style={styles.locationLoadingText}>Getting location...</Text>
              </View>
            ) : location ? (
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>📍 {locationName}</Text>
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={getCurrentLocation}
                >
                  <Text style={styles.refreshButtonText}>🔄 Refresh</Text>
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Additional details (bait used, weather, etc.)"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>🎣 Record Catch</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  locationContainer: {
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
  refreshButton: {
    padding: 5,
  },
  refreshButtonText: {
    color: '#4A90E2',
    fontSize: 14,
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
  submitButton: {
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
  submitButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
