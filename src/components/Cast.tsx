import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '../constants';
import { useTheme } from '../context/ThemeContext';

export type Cast = {
    cast: string[];
    crew: string[];
    id: number;
    name: string;
    profile_path: string;
    character: string;
    job: string;
    department: string;
}

const Cast = ({ cast }) => {
    const { isDarkMode } = useTheme();
    const characterName = 'test test';
    const personName = 'test test';

    return (
        <View>
            <Text className={`text-lg mx-4 mb-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4"
            >
                {cast && cast.map((person, index) => {
                    <TouchableOpacity key={index} className="mr-4 items-center">
                        <Image source={images.STRANGER}
                            className="w-20 h-24 rounded-2xl"
                        />
                        <Text className={`text-xs mt-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            {
                                characterName.length > 10 ? characterName.slice(0, 10) + '...' : characterName
                            }
                        </Text>
                        <Text className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-secondary'}`}>
                            {
                                personName.length > 10 ? personName.slice(0, 10) + '...' : characterName
                            }
                        </Text>
                    </TouchableOpacity>;
                })}
            </ScrollView>
        </View>
    );
};

export default Cast;
