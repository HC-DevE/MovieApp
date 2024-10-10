import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import appTheme from './src/constants/theme';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNavigator';
import './global.css';
import { ThemeProvider } from './src/context/ThemeContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView className={`h-full flex-1 ${isDarkMode ? appTheme.COLORS.backgroundDark : appTheme.COLORS.backgroundLight}`}>
      <AuthProvider>
        <ThemeProvider>
          <AppNav />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

export default App;
