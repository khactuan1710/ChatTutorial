import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './source/login';
import Home from './source/Home';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        
      </Stack.Navigator>
  </NavigationContainer>
  );
}

