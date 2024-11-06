import React from 'react';
import { Image, Text, View } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { CustomButton } from './CustomButton';
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
        <View className={`mt-[16px] px-[16px] rounded-lg ${ad.className} ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <Image
                className="w-full h-[200px]"
                source={ad.image}
                resizeMode="cover"
            />
            <Text className={`${isDarkMode ? 'text-white' : 'text-black'} text-xl font-bold my-4`}>
                {ad.title}
            </Text>
            <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-4 text-balance`}>
                {ad.description}
            </Text>
            <CustomButton title="Check details" onPress={ad.onPress} textClassName={`${isDarkMode ? 'text-black' : 'text-white'}`} />
        </View>
    );
};
