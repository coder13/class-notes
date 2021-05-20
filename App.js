import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

// components/screens
import { ThemeProvider } from './screens/ThemeController';
import StartScreen from './screens/StartScreen';

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
