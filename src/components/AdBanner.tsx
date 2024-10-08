import React from 'react';
import { Image, Text, View } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Button from './Button';
import { useTheme } from '../context/ThemeContext';
// import { useTheme } from '@react-navigation/native';

interface Ad {
    title: string;
    description: string;
    image: any;
    className?: string;
    onPress: () => void;
}

export const AdBanner: React.FC<{ ad: Ad }> = ({ ad }) => {
    const { isDarkMode } = useTheme();

    return (
        <View className={`m-6 rounded-lg ${ad.className} ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <Image
                source={ad.image}
                className="w-full"
                resizeMode="contain"
            />
            <Text className={`${isDarkMode ? 'text-white' : 'text-black'} text-xl font-bold my-4`}>
                {ad.title}
            </Text>
            <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-4 text-balance`}>
                {ad.description}
            </Text>
            <Button title="Check details" onPress={ad.onPress} textClassName={`${isDarkMode ? 'text-black' : 'text-white'}`} />
        </View>
    );
};
