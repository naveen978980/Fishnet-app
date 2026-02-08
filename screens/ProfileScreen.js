import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = ({ userName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
  },
  text: {
    fontSize: 20,
    color: '#1F2937',
  },
});
