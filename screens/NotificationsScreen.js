import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function NotificationsScreen({ notifications = [], onMarkAllRead }) {
  // If no notifications passed, show default message
  if (notifications.length === 0) {
    return (
      <>
        <View style={styles.notificationsHeader}>
          <Text style={styles.notificationsTitle}>Notifications</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyText}>No notifications yet</Text>
          <Text style={styles.emptySubtext}>You'll see notifications here when you earn or spend tokens</Text>
        </View>
      </>
    );
  }

  return (
    <>
      {/* Notifications Header */}
      <View style={styles.notificationsHeader}>
        <Text style={styles.notificationsTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllReadButton} onPress={onMarkAllRead}>
          <Text style={styles.markAllReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Notification Items */}
      <ScrollView style={styles.section} showsVerticalScrollIndicator={false}>
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
      </ScrollView>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
