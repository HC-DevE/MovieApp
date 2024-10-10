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
    const textColorPrimaryClassName = focused ? `color-[${appTheme.COLORS.primary}] ` : (isDarkMode ? 'text-white' : 'text-black');
    const mainColor = focused ? appTheme.COLORS.primary : (isDarkMode ? appTheme.COLORS.white : appTheme.COLORS.black);

    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color || mainColor}
                className="w-6 h-6"
            />
            <Text className={`${textColorPrimaryClassName} text-xs`} style={{color: mainColor }}>
                {name}
            </Text>
        </View>
    );

};
