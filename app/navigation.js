import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from "./context";

// Import screens
import LocationsScreen from "./screens/LocationsScreen";
import MapScreen from "./screens/MapScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack for locations
function LocationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Locations" component={LocationsScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}

// Main app navigation
export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Locations" component={LocationStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
