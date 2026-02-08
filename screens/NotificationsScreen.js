import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      icon: '🎉',
      title: 'New Fishing Zone!',
      message: 'A high-yield zone detected near Marina Beach',
      timestamp: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      icon: '⚠️',
      title: 'Weather Alert',
      message: 'Heavy winds expected tonight 8 PM - 2 AM',
      timestamp: '5 hours ago',
      unread: true,
    },
    {
      id: 3,
      icon: '🏆',
      title: 'Achievement Unlocked!',
      message: 'You earned 500 coins for tracking 10 fish species',
      timestamp: '1 day ago',
      unread: true,
    },
    {
      id: 4,
      icon: '📊',
      title: 'Weekly Report Ready',
      message: 'Your fishing report is available to view',
      timestamp: '2 days ago',
      unread: false,
    },
    {
      id: 5,
      icon: '🌊',
      title: 'Conservation Update',
      message: '50kg plastic removed from coastal areas',
      timestamp: '3 days ago',
      unread: false,
    },
    {
      id: 6,
      icon: '🪙',
      title: 'Coins Earned',
      message: '+100 coins for daily check-in streak',
      timestamp: '4 days ago',
      unread: false,
    },
    {
      id: 7,
      icon: '🎣',
      title: 'Catch Recorded',
      message: 'Successfully logged 5 fish catches',
      timestamp: '5 days ago',
      unread: false,
    },
  ];

  return (
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
        {notifications.map((notification) => (
          <View
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.unread && styles.notificationRead,
            ]}
          >
            <View style={styles.notificationIconContainer}>
              <Text style={styles.notifIcon}>{notification.icon}</Text>
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
            </View>
            {notification.unread && <View style={styles.unreadDot} />}
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  notificationsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  markAllReadButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  markAllReadText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationRead: {
    opacity: 0.6,
  },
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notifIcon: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginTop: 8,
  },
});
