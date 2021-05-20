import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

// components/screens
import { ThemeProvider } from './app/screens/ThemeController';
import StartScreen from './app/screens/StartScreen';

function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <StartScreen />
      </PaperProvider>
    </ThemeProvider>
  )
}

export default App;
