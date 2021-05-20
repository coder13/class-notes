import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

// components/screens
import { ThemeProvider } from './screens/ThemeController';
import { SchoolsProvider } from './screens/SchoolsProvider';
import StartScreen from './screens/StartScreen';

function App() {
  return (
    <SchoolsProvider>
      <ThemeProvider>
        <PaperProvider>
          <StartScreen />
        </PaperProvider>
      </ThemeProvider>
    </SchoolsProvider>
  )
}

export default App;
