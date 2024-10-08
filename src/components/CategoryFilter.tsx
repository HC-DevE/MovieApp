import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { useTheme } from '../context/ThemeContext';
// import Button from './Button';

const genres = ['All', 'Romance', 'Sport', 'Kids', 'Horror'];

export interface CategoryFilterProps {
    className: string;
}

export const CategoryFilter = ({ className }: CategoryFilterProps) => {
    const [selectedGenre, setSelectedGenre] = useState('All');
    // const { isDarkMode } = useTheme();

    return (
        <View className={className}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {genres.map((genre) => (
                    // <Button
                    //     className={`px-4 py-2 mx-1 rounded-full ${selectedGenre === genre ? 'bg-white' : 'bg-gray-800'}`}
                    //     textClassName={`text-sm ${selectedGenre === genre ? 'text-black' : 'text-white'
                    //         }`}
                    //     title={genre}
                    //     onPress={() => setSelectedGenre(genre)} />
                    <TouchableOpacity
                        key={genre}
                        onPress={() => setSelectedGenre(genre)}
                        className={`rounded-full ${selectedGenre === genre ? 'bg-white' : 'bg-transparent'
                            }`}
                    >
                        <Text
                            className={`px-6 py-3 text-sm ${selectedGenre === genre ? 'text-black' : 'text-white'
                                }`}
                        >
                            {genre}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
