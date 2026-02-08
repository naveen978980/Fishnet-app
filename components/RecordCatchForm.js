import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert, 
  StyleSheet 
} from 'react-native';
import * as Location from 'expo-location';

export default function RecordCatchForm({ onSuccess }) {
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

const styles = StyleSheet.create({
  recordCatchContainer: {
    flex: 1,
    backgroundColor: '#F5F6F8',
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
    color: '#1F2937',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#1F2937',
  },
  formTextArea: {
    height: 100,
    paddingTop: 16,
  },
  locationBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  locationLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  locationLoadingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  refreshLocationButton: {
    padding: 8,
  },
  refreshLocationText: {
    fontSize: 20,
  },
  getLocationButton: {
    padding: 16,
    alignItems: 'center',
  },
  getLocationButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  submitCatchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitCatchButtonDisabled: {
    opacity: 0.7,
  },
  submitCatchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
