import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { addLocation, getLocations } from "../services";

const LocationsScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  // Load locations when the screen loads
  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocations();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Locations</Text>

      {/* Input fields for adding new locations */}
      <TextInput style={styles.input} placeholder="Location Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" />
      
      <Button title="Add Location" onPress={async () => {
        if (name.trim() && description.trim() && rating.trim()) {
          await addLocation({ name, description, rating });
          setName(""); setDescription(""); setRating("");
        }
      }} />

      {/* Display the list of saved locations */}
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate("Map", { locationName: item.name })}
          >
            <Text style={styles.itemText}>{item.name} - {item.rating}⭐</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  listItem: { padding: 10, borderBottomWidth: 1 },
  itemText: { fontWeight: "bold" },
  description: { color: "gray" },
});

export default LocationsScreen;
