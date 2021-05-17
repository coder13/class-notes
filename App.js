import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import NotesScreen from './screens/Notes';
import HomeScreen from './screens/Home';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="CWU / Spring 2021 / CS446 " />
      </Appbar>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Notes">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notes" component={NotesScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}