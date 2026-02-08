import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function UpdateScreen({
  catchFishType,
  setCatchFishType,
  catchQuantity,
  setCatchQuantity,
  catchWeight,
  setCatchWeight,
  catchLocation,
  isGettingLocation,
  isSubmitting,
  onGetLocation,
  onSubmit,
}) {
  return (
    <>
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
                onPress={onGetLocation}
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
            onPress={onSubmit}
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
    </>
  );
}

const styles = StyleSheet.create({
  modernCatchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingTop: 8,
  },
  modernCatchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  modernCardHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  modernSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modernSectionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  modernSectionTextContainer: {
    flex: 1,
  },
  modernSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  modernSectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  modernFormGrid: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  modernFormColumn: {
    flex: 1,
  },
  modernInputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  modernInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modernLocationInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modernLocationText: {
    flex: 1,
    fontSize: 12,
    color: '#1F2937',
  },
  modernLocationPlaceholder: {
    color: '#9CA3AF',
    fontSize: 15,
  },
  modernGpsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  modernStatsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginVertical: 20,
  },
  modernStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  modernStatDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  modernStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  modernStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modernSubmitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  modernSubmitButtonDisabled: {
    opacity: 0.7,
  },
  modernSubmitIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  modernSubmitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
