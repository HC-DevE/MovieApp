import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CastMember } from '../interfaces/movie.interface';
import { buildImageUrl } from '../../lib/api';

export const Cast = (cast : CastMember[]) => {
    const { isDarkMode } = useTheme();


    return (
        <View>
            <Text className={`text-lg mx-4 mb-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4"
            >
                {cast && cast.map((person, index) => (
                    <TouchableOpacity key={index} className="mr-4 items-center">
                        <Image source={{ uri: buildImageUrl(person?.profile_path) }}
                            className="w-20 h-24 rounded-2xl"
                        />
                        <Text className={`text-xs mt-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            {
                                person.character.length > 10 ? person.character.slice(0, 10) + '...' : person.character
                            }
                        </Text>
                        <Text className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-secondary'}`}>
                            {
                                person.name.length > 10 ? person.name.slice(0, 10) + '...' : person.name
                            }
                        </Text>
                    </TouchableOpacity>
                )
                )}
            </ScrollView>
        </View>
    );
};
