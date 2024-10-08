import React from 'react';
import {
  SafeAreaView,
  // StyleSheet,
  useColorScheme,
} from 'react-native';
import appTheme from './src/constants/theme';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNavigator';
import './global.css';
import { ThemeProvider } from './src/context/ThemeContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? appTheme.COLORS.backgroundDark : appTheme.COLORS.backgroundLight,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <AuthProvider>
        <ThemeProvider>
          <AppNav />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
