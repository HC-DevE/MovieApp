import React from 'react';
import { View, Image, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import appTheme from '../constants/theme';

export type TabIconProps = {
    icon: any;
    focused?: boolean;
    color?: string;
    size?: number;
    name?: string;
}



export const TabIcon = ({ icon, focused = false, color = 'black', size, name = 'Home' }: TabIconProps) => {
    const { isDarkMode } = useTheme();

    return (
        <View className="items-center justify-center">
            <Image
                source={icon}
                resizeMode="contain"
                // tintColor={(isDarkMode && !focused) ? appTheme.COLORS.white : appTheme.COLORS.black}
                tintColor={focused ? appTheme.COLORS.primary : (isDarkMode ? appTheme.COLORS.white : appTheme.COLORS.black)}
                className="w-6 h-6"
            />
            {/* <Text className={`${focused ? 'text-primary' : (isDarkMode ? 'text-white' : 'text-black')} text-xs`}> */}
            {/* <Text className={`${(isDarkMode && !focused) ? 'text-white' : 'text-black'} text-xs`}>
                {name}
            </Text> */}
        </View>
    );

};
