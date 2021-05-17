import React from 'react';
import { FlatList, StyleSheet, Text, Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import NotesScreen from './screens/Notes';
import HomeScreen from './screens/Home';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Notes">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notes" component={NotesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}