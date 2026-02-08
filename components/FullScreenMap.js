import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const fishingLocations = [
  {
    id: 1,
    coordinate: { latitude: 13.0500, longitude: 80.2809 },
    title: "Marina Beach",
    description: "Popular fishing spot - Good for Mackerel",
    pinColor: "#4CAF50"
  },
  {
    id: 2,
    coordinate: { latitude: 12.7897, longitude: 80.2538 },
    title: "Kovalam Beach",
    description: "Deep sea fishing - Tuna & Barracuda",
    pinColor: "#2196F3"
  },
  {
    id: 3,
    coordinate: { latitude: 13.2239, longitude: 80.3066 },
    title: "Ennore Creek",
    description: "Creek fishing - Pomfret & Snapper",
    pinColor: "#FF9800"
  },
  {
    id: 4,
    coordinate: { latitude: 12.6208, longitude: 80.1989 },
    title: "Mahabalipuram Shore",
    description: "Coastal fishing - Sardines & Prawns",
    pinColor: "#9C27B0"
  },
  {
    id: 5,
    coordinate: { latitude: 13.4167, longitude: 80.3167 },
    title: "Pulicat Lake",
    description: "Brackish water - Mullet & Catfish",
    pinColor: "#F44336"
  },
  {
    id: 6,
    coordinate: { latitude: 13.1147, longitude: 80.2906 },
    title: "Royapuram Harbor",
    description: "Major fishing port - Various species",
    pinColor: "#00BCD4"
  },
  {
    id: 7,
    coordinate: { latitude: 13.1187, longitude: 80.2944 },
    title: "Kasimedu Harbor",
    description: "Active harbor - Fresh catch daily",
    pinColor: "#FFEB3B"
  }
];

export default function FullScreenMap({ onClose }) {
  return (
    <View style={styles.fullScreenMapContainer}>
      <MapView
        style={styles.fullScreenMap}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {fishingLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={location.coordinate}
            title={location.title}
            description={location.description}
            pinColor={location.pinColor}
          />
        ))}
      </MapView>
      
      {/* Back Button - Above Bottom Navbar */}
      <TouchableOpacity 
        style={styles.mapBackButton}
        onPress={onClose}
      >
        <Text style={styles.mapBackButtonText}>←</Text>
      </TouchableOpacity>

      {/* Bottom Legend */}
      <View style={styles.fullScreenMapLegend}>
        <Text style={styles.fullScreenMapLegendText}>
          📍 7 Fishing Hotspots Near Chennai • Tap to explore
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenMapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
  },
  fullScreenMap: {
    flex: 1,
    zIndex: 10,
  },
  mapBackButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    zIndex: 15,
  },
  mapBackButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 60,
    textAlign: 'center',
  },
  fullScreenMapLegend: {
    position: 'absolute',
    bottom: 180,
    left: 20,
    right: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 14,
  },
  fullScreenMapLegendText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
  },
});
