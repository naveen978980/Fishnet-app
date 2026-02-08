import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Configure how notifications should be handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push notifications and get token
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    // Set notification channel for Android
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#2196F3',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Push notification permission not granted');
      return;
    }
    
    // Get push token - for Expo Go, we don't need projectId
    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push notification token:', token);
    } catch (error) {
      console.log('Error getting push token:', error.message);
      // Continue without push token - local notifications will still work
    }
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}

// Schedule a local notification
export async function schedulePushNotification(title, body, data = {}, seconds = 0) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
      sound: true,
    },
    trigger: seconds > 0 ? { seconds: seconds } : null,
  });
}

// Send immediate notification
export async function sendLocalNotification(title, body, data = {}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
      sound: true,
    },
    trigger: null, // Send immediately
  });
}

// Cancel all scheduled notifications
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Get notification badge count
export async function getBadgeCount() {
  return await Notifications.getBadgeCountAsync();
}

// Set notification badge count
export async function setBadgeCount(count) {
  await Notifications.setBadgeCountAsync(count);
}

// Clear badge
export async function clearBadge() {
  await Notifications.setBadgeCountAsync(0);
}

// Example notification functions for your app
export const FishnetNotifications = {
  // When a fish is caught
  fishCaught: async (fishType, weight, userName = 'Fisherman') => {
    await sendLocalNotification(
      `🎣 ${userName} - Fish Caught!`,
      `You caught a ${fishType} weighing ${weight}kg`,
      { type: 'fish_caught', fishType, weight }
    );
  },

  // When weather alert
  weatherAlert: async (message, userName = 'Fisherman') => {
    await sendLocalNotification(
      `⚠️ ${userName} - Weather Alert`,
      message,
      { type: 'weather_alert' }
    );
  },

  // When profile updated
  profileUpdated: async (userName = 'Fisherman') => {
    await sendLocalNotification(
      `✅ ${userName} - Profile Updated`,
      'Your fisherman profile has been updated successfully',
      { type: 'profile_update' }
    );
  },

  // Daily reminder
  dailyReminder: async (userName = 'Fisherman') => {
    await schedulePushNotification(
      `🌊 ${userName} - Time to Fish!`,
      'Good weather today for fishing. Check the fish zones!',
      { type: 'daily_reminder' },
      86400 // 24 hours in seconds
    );
  },

  // Research data sync
  dataSynced: async (count, userName = 'Fisherman') => {
    await sendLocalNotification(
      `📊 ${userName} - Data Synced`,
      `${count} catch records uploaded to research database`,
      { type: 'data_sync', count }
    );
  },
};
