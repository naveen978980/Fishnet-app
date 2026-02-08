import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const ProfileScreen1 = ({ userName, userData }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Photo Section */}
      {userData?.profilePhoto && (
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image source={{ uri: userData.profilePhoto }} style={styles.profilePhoto} />
          </View>
        </View>
      )}

      {/* Fisherman Profile Card */}
      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Fisherman Profile</Text>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{userName || userData?.name || 'Dobby Fisher'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{userData?.phone || '+91 91234 56789'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Experience</Text>
              <Text style={styles.infoValue}>{userData?.experience ? `${userData.experience} Years` : '12 Years'}</Text>
            </View>
          </View>

          <View style={styles.infoColumn}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>License ID</Text>
              <Text style={styles.infoValue}>{userData?.licenseId || 'TN-FSH-2025-0093'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Region</Text>
              <Text style={styles.infoValue}>{userData?.region || 'Tamil Nadu Coast'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Boat Name</Text>
              <Text style={styles.infoValue}>{userData?.boatName || 'Sea Rider'}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Fish Tracking Project Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Fish Tracking Project Summary</Text>
        
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Unique Fish Types</Text>
            <Text style={styles.summaryNumber}>4</Text>
          </View>
          
          <View style={[styles.summaryBox, styles.summaryBoxLast]}>
            <Text style={styles.summaryLabel}>Fish Zones Marked</Text>
            <Text style={styles.summaryValue}>1 coastal hotspot</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Last Sync</Text>
            <Text style={styles.summaryValue}>3 days ago</Text>
          </View>
          
          <View style={[styles.summaryBox, styles.summaryBoxLast]}>
            <Text style={styles.summaryLabel}>Research Partners</Text>
            <Text style={styles.summaryValue}>2 institutes</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default ProfileScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    padding: 16,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4CAF50',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
  },
  infoItem: {
    marginBottom: 20,
    paddingRight: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginRight: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  summaryBoxLast: {
    marginRight: 0,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#3B82F6',
    marginBottom: 8,
    fontWeight: '600',
  },
  summaryNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 40,
  },
  summaryValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 20,
  },
});
