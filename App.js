import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './source/login';
import Home from './source/home/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './source/Cart';
import AccountManage from './source/AccountManage';
import HomeTab from './source/HomeTab';
import Search from './source/search/Search';
import Detail from './source/Detail';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TabHome" component={HomeTab} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}

