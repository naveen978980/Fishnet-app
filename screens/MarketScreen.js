import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions, Image, TextInput, Alert } from 'react-native';
import MapView, { Marker, Polyline, Circle } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// Fish species data with migration patterns
const fishSpeciesData = [
  {
    id: 1,
    name: 'Tuna',
    scientificName: 'Thunnus',
    emoji: '🐟',
    image: 'https://images.unsplash.com/photo-1560155477-f2b43375d8d0?w=400&h=300&fit=crop',
    color: '#3B82F6',
    description: 'Highly migratory species found in warm waters',
    historicalData: [
      { latitude: 8.7832, longitude: 78.1348, date: '2026-01-15', type: 'historical' },
      { latitude: 8.8234, longitude: 78.2156, date: '2026-01-20', type: 'historical' },
      { latitude: 8.9123, longitude: 78.3421, date: '2026-01-25', type: 'historical' },
      { latitude: 9.0234, longitude: 78.4567, date: '2026-02-01', type: 'historical' },
    ],
    predictions: [
      { latitude: 9.1345, longitude: 78.5789, date: '2026-02-15', confidence: 0.92 },
      { latitude: 9.2456, longitude: 78.6234, date: '2026-02-20', confidence: 0.88 },
      { latitude: 9.3567, longitude: 78.7456, date: '2026-02-25', confidence: 0.85 },
      { latitude: 9.4678, longitude: 78.8123, date: '2026-03-01', confidence: 0.80 },
    ],
    currentZone: { latitude: 9.0234, longitude: 78.4567, radius: 5000 },
  },
  {
    id: 2,
    name: 'Mackerel',
    scientificName: 'Scomber',
    emoji: '🐠',
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop',
    color: '#10B981',
    description: 'Common in coastal waters, found in large schools',
    historicalData: [
      { latitude: 8.5123, longitude: 78.0234, date: '2026-01-15', type: 'historical' },
      { latitude: 8.5789, longitude: 78.0987, date: '2026-01-20', type: 'historical' },
      { latitude: 8.6234, longitude: 78.1456, date: '2026-01-25', type: 'historical' },
      { latitude: 8.6789, longitude: 78.1987, date: '2026-02-01', type: 'historical' },
    ],
    predictions: [
      { latitude: 8.7234, longitude: 78.2456, date: '2026-02-15', confidence: 0.94 },
      { latitude: 8.7789, longitude: 78.2987, date: '2026-02-20', confidence: 0.90 },
      { latitude: 8.8234, longitude: 78.3456, date: '2026-02-25', confidence: 0.87 },
      { latitude: 8.8789, longitude: 78.3987, date: '2026-03-01', confidence: 0.83 },
    ],
    currentZone: { latitude: 8.6789, longitude: 78.1987, radius: 3000 },
  },
  {
    id: 3,
    name: 'Sardine',
    scientificName: 'Sardinella',
    emoji: '🐡',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
    color: '#F59E0B',
    description: 'Small pelagic fish, abundant in coastal areas',
    historicalData: [
      { latitude: 8.4567, longitude: 77.9123, date: '2026-01-15', type: 'historical' },
      { latitude: 8.5012, longitude: 77.9678, date: '2026-01-20', type: 'historical' },
      { latitude: 8.5456, longitude: 78.0234, date: '2026-01-25', type: 'historical' },
      { latitude: 8.5901, longitude: 78.0789, date: '2026-02-01', type: 'historical' },
    ],
    predictions: [
      { latitude: 8.6345, longitude: 78.1234, date: '2026-02-15', confidence: 0.91 },
      { latitude: 8.6789, longitude: 78.1678, date: '2026-02-20', confidence: 0.89 },
      { latitude: 8.7234, longitude: 78.2123, date: '2026-02-25', confidence: 0.86 },
      { latitude: 8.7678, longitude: 78.2567, date: '2026-03-01', confidence: 0.82 },
    ],
    currentZone: { latitude: 8.5901, longitude: 78.0789, radius: 4000 },
  },
  {
    id: 4,
    name: 'Snapper',
    scientificName: 'Lutjanus',
    emoji: '🎣',
    image: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=400&h=300&fit=crop',
    color: '#EF4444',
    description: 'Reef-dwelling fish, popular among fishermen',
    historicalData: [
      { latitude: 8.9234, longitude: 78.5123, date: '2026-01-15', type: 'historical' },
      { latitude: 8.9567, longitude: 78.5456, date: '2026-01-20', type: 'historical' },
      { latitude: 8.9901, longitude: 78.5789, date: '2026-01-25', type: 'historical' },
      { latitude: 9.0234, longitude: 78.6123, date: '2026-02-01', type: 'historical' },
    ],
    predictions: [
      { latitude: 9.0567, longitude: 78.6456, date: '2026-02-15', confidence: 0.93 },
      { latitude: 9.0901, longitude: 78.6789, date: '2026-02-20', confidence: 0.91 },
      { latitude: 9.1234, longitude: 78.7123, date: '2026-02-25', confidence: 0.88 },
      { latitude: 9.1567, longitude: 78.7456, date: '2026-03-01', confidence: 0.84 },
    ],
    currentZone: { latitude: 9.0234, longitude: 78.6123, radius: 4500 },
  },
  {
    id: 5,
    name: 'Grouper',
    scientificName: 'Epinephelus',
    emoji: '🐋',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop',
    color: '#8B5CF6',
    description: 'Large fish found near reefs and rocky areas',
    historicalData: [
      { latitude: 8.6789, longitude: 78.3456, date: '2026-01-15', type: 'historical' },
      { latitude: 8.7123, longitude: 78.3789, date: '2026-01-20', type: 'historical' },
      { latitude: 8.7456, longitude: 78.4123, date: '2026-01-25', type: 'historical' },
      { latitude: 8.7789, longitude: 78.4456, date: '2026-02-01', type: 'historical' },
    ],
    predictions: [
      { latitude: 8.8123, longitude: 78.4789, date: '2026-02-15', confidence: 0.90 },
      { latitude: 8.8456, longitude: 78.5123, date: '2026-02-20', confidence: 0.87 },
      { latitude: 8.8789, longitude: 78.5456, date: '2026-02-25', confidence: 0.84 },
      { latitude: 8.9123, longitude: 78.5789, date: '2026-03-01', confidence: 0.81 },
    ],
    currentZone: { latitude: 8.7789, longitude: 78.4456, radius: 3500 },
  },
  {
    id: 6,
    name: 'Barracuda',
    scientificName: 'Sphyraena',
    emoji: '🦈',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    color: '#06B6D4',
    description: 'Predatory fish found in tropical waters',
    historicalData: [
      { latitude: 8.8456, longitude: 78.6789, date: '2026-01-15', type: 'historical' },
      { latitude: 8.8789, longitude: 78.7123, date: '2026-01-20', type: 'historical' },
      { latitude: 8.9123, longitude: 78.7456, date: '2026-01-25', type: 'historical' },
      { latitude: 8.9456, longitude: 78.7789, date: '2026-02-01', type: 'historical' },
    ],
    predictions: [
      { latitude: 8.9789, longitude: 78.8123, date: '2026-02-15', confidence: 0.89 },
      { latitude: 9.0123, longitude: 78.8456, date: '2026-02-20', confidence: 0.86 },
      { latitude: 9.0456, longitude: 78.8789, date: '2026-02-25', confidence: 0.83 },
      { latitude: 9.0789, longitude: 78.9123, date: '2026-03-01', confidence: 0.79 },
    ],
    currentZone: { latitude: 8.9456, longitude: 78.7789, radius: 4000 },
  },
];

const MarketScreen = ({ spendTokens }) => {
  const [selectedFish, setSelectedFish] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openFishMap = async (fish) => {
    // Charge 40 tokens to view fish details
    const success = await spendTokens(40, `viewing ${fish.name} details`);
    if (success) {
      setSelectedFish(fish);
      setMapVisible(true);
      Alert.alert(
        `${fish.emoji} ${fish.name} Details`,
        `You can now view ${fish.name} migration patterns and predictions!\n\n-40 tokens spent 🪙`,
        [{ text: 'OK' }]
      );
    }
    // If spendTokens returns false, it already showed an insufficient tokens alert
  };

  const closeFishMap = () => {
    setMapVisible(false);
    setSelectedFish(null);
  };

  // Filter fish based on search query
  const filteredFish = fishSpeciesData.filter(fish => 
    fish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fish.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fish.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fish Species Explorer</Text>
        <Text style={styles.headerSubtitle}>Select a fish to view migration patterns & predictions</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search fish species..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Fish Species List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredFish.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsEmoji}>🐟</Text>
            <Text style={styles.noResultsText}>No fish species found</Text>
            <Text style={styles.noResultsSubtext}>Try searching with different keywords</Text>
          </View>
        ) : (
          <View style={styles.fishGrid}>
            {filteredFish.map((fish) => (
            <TouchableOpacity
              key={fish.id}
              style={[styles.fishCard, { borderLeftColor: fish.color }]}
              onPress={() => openFishMap(fish)}
              activeOpacity={0.7}
            >
              {/* Fish Image */}
              <Image 
                source={{ uri: fish.image }}
                style={styles.fishImage}
                resizeMode="cover"
              />
              
              <View style={styles.fishCardContent}>
                <View style={styles.fishCardHeader}>
                  <Text style={styles.fishEmoji}>{fish.emoji}</Text>
                  <View style={styles.fishInfo}>
                    <Text style={styles.fishName}>{fish.name}</Text>
                    <Text style={styles.fishScientific}>{fish.scientificName}</Text>
                  </View>
                </View>
                <Text style={styles.fishDescription}>{fish.description}</Text>
                <View style={styles.fishFooter}>
                  <View style={styles.dataTag}>
                    <Text style={styles.dataTagText}>📍 {fish.historicalData.length} tracking points</Text>
                  </View>
                  <View style={styles.dataTag}>
                    <Text style={styles.dataTagText}>🤖 {fish.predictions.length} predictions</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.viewMapButton}>
                  <Text style={styles.viewMapButtonText}>View on Map →</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          </View>
        )}
      </ScrollView>

      {/* Full Screen Map Modal */}
      <Modal
        visible={mapVisible}
        animationType="slide"
        onRequestClose={closeFishMap}
      >
        <View style={styles.modalContainer}>
          {/* Map Header */}
          <View style={styles.mapHeader}>
            <TouchableOpacity style={styles.backButton} onPress={closeFishMap}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            {selectedFish && (
              <View style={styles.mapHeaderInfo}>
                <Text style={styles.mapHeaderEmoji}>{selectedFish.emoji}</Text>
                <View>
                  <Text style={styles.mapHeaderTitle}>{selectedFish.name}</Text>
                  <Text style={styles.mapHeaderSubtitle}>{selectedFish.scientificName}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Map */}
          {selectedFish && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: selectedFish.currentZone.latitude,
                longitude: selectedFish.currentZone.longitude,
                latitudeDelta: 0.8,
                longitudeDelta: 0.8,
              }}
            >
              {/* Current Zone (Circle) */}
              <Circle
                center={{
                  latitude: selectedFish.currentZone.latitude,
                  longitude: selectedFish.currentZone.longitude,
                }}
                radius={selectedFish.currentZone.radius}
                fillColor={`${selectedFish.color}30`}
                strokeColor={selectedFish.color}
                strokeWidth={2}
              />

              {/* Historical Tracking Points */}
              {selectedFish.historicalData.map((point, index) => (
                <Marker
                  key={`historical-${index}`}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  title={`Historical - ${point.date}`}
                  description="Past tracking data"
                >
                  <View style={[styles.historicalMarker, { backgroundColor: selectedFish.color }]}>
                    <Text style={styles.markerText}>📍</Text>
                  </View>
                </Marker>
              ))}

              {/* Historical Movement Path */}
              <Polyline
                coordinates={selectedFish.historicalData.map(point => ({
                  latitude: point.latitude,
                  longitude: point.longitude,
                }))}
                strokeColor={selectedFish.color}
                strokeWidth={3}
                lineDashPattern={[1]}
              />

              {/* AI Predictions */}
              {selectedFish.predictions.map((point, index) => (
                <Marker
                  key={`prediction-${index}`}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  title={`AI Prediction - ${point.date}`}
                  description={`Confidence: ${(point.confidence * 100).toFixed(0)}%`}
                >
                  <View style={[styles.predictionMarker, { borderColor: selectedFish.color }]}>
                    <Text style={styles.markerText}>🤖</Text>
                  </View>
                </Marker>
              ))}

              {/* Predicted Movement Path */}
              <Polyline
                coordinates={[
                  {
                    latitude: selectedFish.historicalData[selectedFish.historicalData.length - 1].latitude,
                    longitude: selectedFish.historicalData[selectedFish.historicalData.length - 1].longitude,
                  },
                  ...selectedFish.predictions.map(point => ({
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }))
                ]}
                strokeColor={selectedFish.color}
                strokeWidth={3}
                lineDashPattern={[10, 5]}
              />

              {/* Current Location Marker */}
              <Marker
                coordinate={{
                  latitude: selectedFish.currentZone.latitude,
                  longitude: selectedFish.currentZone.longitude,
                }}
                title="Current Zone"
                description="Most recent location"
              >
                <View style={[styles.currentMarker, { backgroundColor: selectedFish.color }]}>
                  <Text style={styles.currentMarkerText}>{selectedFish.emoji}</Text>
                </View>
              </Marker>
            </MapView>
          )}

          {/* Legend */}
          {selectedFish && (
            <View style={styles.legend}>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: selectedFish.color }]} />
                  <Text style={styles.legendText}>📍 Historical Data</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#FFFFFF', borderColor: selectedFish.color, borderWidth: 2 }]} />
                  <Text style={styles.legendText}>🤖 AI Predictions</Text>
                </View>
              </View>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: selectedFish.color }]} />
                  <Text style={styles.legendText}>{selectedFish.emoji} Current Zone</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={styles.legendLine} />
                  <Text style={styles.legendText}>━━ Solid: Past | ┈┈ Dash: Future</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  noResultsEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  fishGrid: {
    padding: 16,
  },
  fishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  fishImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F3F4F6',
  },
  fishCardContent: {
    padding: 16,
  },
  fishCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fishEmoji: {
    fontSize: 36,
    marginRight: 12,
  },
  fishInfo: {
    flex: 1,
  },
  fishName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  fishScientific: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  fishDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  fishFooter: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  dataTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dataTagText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
  viewMapButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewMapButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  mapHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapHeaderEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  mapHeaderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  mapHeaderSubtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  map: {
    flex: 1,
  },
  historicalMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  predictionMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  currentMarker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  markerText: {
    fontSize: 16,
  },
  currentMarkerText: {
    fontSize: 28,
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLine: {
    width: 20,
    height: 2,
    backgroundColor: '#4B5563',
    marginRight: 8,
  },
  legendText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
  },
});

export default MarketScreen;
