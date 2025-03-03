import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = ({ route }) => {
  const { locationName } = route.params || {}; // Get location name from navigation params
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        if (locationName) {
          let geo = await Location.geocodeAsync(locationName);
          if (geo.length > 0) {
            setRegion({
              latitude: geo[0].latitude,
              longitude: geo[0].longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        }
      } catch (error) {
        console.error("Geolocation error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCoordinates();
  }, [locationName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map View</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : region ? (
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={region} title={locationName} />
        </MapView>
      ) : (
        <Text style={styles.errorText}>Location not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  map: { width: "100%", height: "80%" },
  errorText: { color: "red", fontSize: 16 },
});

export default MapScreen;
