import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen({ userName }) {
  return (
    <View style={styles.profileScreen}>
      {/* Fisherman Profile Card */}
      <View style={styles.profileCard}>
        <Text style={styles.profileCardTitle}>Fisherman Profile</Text>
        
        <View style={styles.profileRow}>
          <View style={styles.profileField}>
            <Text style={styles.profileLabel}>Name</Text>
            <Text style={styles.profileValue}>{userName || 'Dobby Fisher'}</Text>
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
  );
}

const styles = StyleSheet.create({
  profileScreen: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  profileCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  profileRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  profileField: {
    flex: 1,
  },
  profileLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '600',
  },
  profileValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  projectSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  summaryGrid: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  summaryValue: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '600',
  },
});
