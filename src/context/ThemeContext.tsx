import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
// import appTheme from '../constants/theme';

type ThemeContextProps = {
    theme: string;
    isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <ThemeContext.Provider value={{
            theme: isDarkMode ? 'dark' : 'light',
            isDarkMode: isDarkMode,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
