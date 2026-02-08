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

export default function HomeScreen({ onMapPress }) {
  return (
    <>
      {/* What's New Today Banner */}
      <View style={styles.updateBanner}>
        <View style={styles.updateBannerHeader}>
          <Text style={styles.updateBannerIcon}>📢</Text>
          <Text style={styles.updateBannerTitle}>What's New Today</Text>
        </View>
        <Text style={styles.updateBannerText}>
          Stay informed with real-time updates on fishing zones, weather alerts, 
          achievements, and ocean conservation efforts.
        </Text>
        <View style={styles.updateStats}>
          <View style={styles.updateStatItem}>
            <Text style={styles.updateStatNumber}>5</Text>
            <Text style={styles.updateStatLabel}>New Updates</Text>
          </View>
          <View style={styles.updateStatDivider} />
          <View style={styles.updateStatItem}>
            <Text style={styles.updateStatNumber}>2</Text>
            <Text style={styles.updateStatLabel}>Urgent Alerts</Text>
          </View>
          <View style={styles.updateStatDivider} />
          <View style={styles.updateStatItem}>
            <Text style={styles.updateStatNumber}>1</Text>
            <Text style={styles.updateStatLabel}>Rewards</Text>
          </View>
        </View>
      </View>

      {/* Map Section with Fishing Locations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🗺️ Fishing Locations</Text>
        <TouchableOpacity 
          style={styles.mapContainer}
          onPress={onMapPress}
          activeOpacity={0.9}
        >
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 13.0827,
              longitude: 80.2707,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
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
          <View style={styles.mapLegend}>
            <Text style={styles.mapLegendText}>📍 7 Fishing Hotspots Near Chennai • Tap to expand</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Weather Card */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weather Conditions</Text>
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <View>
              <Text style={styles.weatherLocation}>Chennai, Tamil Nadu</Text>
              <Text style={styles.weatherTime}>15:26:44 • Updated a few minutes ago</Text>
            </View>
          </View>
          <View style={styles.weatherMain}>
            <Text style={styles.weatherTemp}>26.5°C</Text>
            <Text style={styles.weatherCondition}>☀️ Sunny</Text>
            <Text style={styles.weatherDetails}>H 26.7° L 21.6°</Text>
          </View>
          <View style={styles.weatherStats}>
            <View style={styles.weatherStatItem}>
              <Text style={styles.weatherStatLabel}>Humidity</Text>
              <Text style={styles.weatherStatValue}>57%</Text>
            </View>
            <View style={styles.weatherStatItem}>
              <Text style={styles.weatherStatLabel}>Wind</Text>
              <Text style={styles.weatherStatValue}>16.6 km/h</Text>
            </View>
            <View style={styles.weatherStatItem}>
              <Text style={styles.weatherStatLabel}>Visibility</Text>
              <Text style={styles.weatherStatValue}>10 km</Text>
            </View>
          </View>
          <View style={styles.aqiContainer}>
            <Text style={styles.aqiLabel}>AQI: 35.5</Text>
            <View style={styles.aqiBadge}>
              <Text style={styles.aqiBadgeText}>✓ Safe</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Ready to Dive In Section */}
      <View style={styles.diveInSection}>
        <Text style={styles.diveInTitle}>Ready to Dive In?</Text>
        <Text style={styles.diveInSubtitle}>Explore the potential of sustainable fishing with us.</Text>
        <Text style={styles.diveInSubtitle}>Join the movement to preserve our oceans and boost your yield.</Text>
        <TouchableOpacity style={styles.getStartedButton}>
          <Text style={styles.getStartedButtonText}>Get Started For Free ›</Text>
        </TouchableOpacity>
      </View>

      {/* Ocean Insight Section */}
      <View style={styles.oceanInsightSection}>
        <View style={styles.oceanInsightContent}>
          <Text style={styles.oceanInsightTitle}>Ocean Insight</Text>
          <Text style={styles.oceanInsightText}>Discover the diverse marine life.</Text>
          <Text style={styles.oceanInsightText}>Learn about species, habitats,</Text>
          <Text style={styles.oceanInsightText}>and ocean conservation efforts.</Text>
          <Text style={styles.oceanInsightText}>Join the movement for a better future.</Text>
        </View>
        <View style={styles.oceanInsightImage}>
          <Text style={styles.oceanInsightIcon}>🌊</Text>
          <Text style={styles.oceanInsightIcon}>🐟</Text>
        </View>
      </View>

      {/* About This App Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutIcon}>🐟</Text>
        <Text style={styles.aboutTitle}>About FISHNET</Text>
        <Text style={styles.aboutTagline}>Connecting Fishermen. Protecting Oceans. Building Future.</Text>
        
        <View style={styles.aboutContent}>
          <Text style={styles.aboutDescription}>
            FISHNET is your ultimate companion for sustainable fishing practices. 
            We empower fishermen with real-time ocean insights, weather updates, 
            and location tracking to make informed decisions at sea.
          </Text>
          
          <View style={styles.aboutFeatures}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🗺️</Text>
              <Text style={styles.featureText}>Track fishing hotspots</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🌦️</Text>
              <Text style={styles.featureText}>Live weather updates</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🪙</Text>
              <Text style={styles.featureText}>Earn rewards & coins</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🌊</Text>
              <Text style={styles.featureText}>Ocean conservation</Text>
            </View>
          </View>

          <Text style={styles.aboutMission}>
            Our mission is to bridge technology and tradition, helping fishermen 
            thrive while preserving marine ecosystems for generations to come.
          </Text>

          <Text style={styles.aboutFooter}>
            Join thousands of fishermen already using FISHNET! 🌊🐟
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  updateBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  updateBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateBannerIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  updateBannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  updateBannerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  updateStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  updateStatItem: {
    alignItems: 'center',
  },
  updateStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  updateStatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  updateStatDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  mapContainer: {
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  mapLegend: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapLegendText: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  weatherHeader: {
    marginBottom: 20,
  },
  weatherLocation: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  weatherTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  weatherMain: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  weatherTemp: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  weatherCondition: {
    fontSize: 24,
    marginTop: 8,
    marginBottom: 8,
  },
  weatherDetails: {
    fontSize: 16,
    color: '#6B7280',
  },
  weatherStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  weatherStatItem: {
    alignItems: 'center',
  },
  weatherStatLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  weatherStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  aqiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  aqiLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  aqiBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  aqiBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  diveInSection: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 32,
    marginHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  diveInTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  diveInSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 8,
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  getStartedButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  oceanInsightSection: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  oceanInsightContent: {
    flex: 1,
  },
  oceanInsightTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  oceanInsightText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  oceanInsightImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  oceanInsightIcon: {
    fontSize: 40,
    marginVertical: 4,
  },
  aboutSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  aboutIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  aboutTagline: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20,
  },
  aboutContent: {
    marginTop: 8,
  },
  aboutDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  aboutFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '600',
    flex: 1,
  },
  aboutMission: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  aboutFooter: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Export fishing locations for use in full-screen map
export { fishingLocations };
