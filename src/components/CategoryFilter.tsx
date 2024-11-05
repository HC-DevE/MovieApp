import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MovieGenre } from '../interfaces/movie.interface';
// import { useTheme } from '../context/ThemeContext';
// import {CustomButton} from './CustomButton';

export interface CategoryFilterProps {
    className: string;
    genres: MovieGenre[];
    selectedGenre: MovieGenre;
    setSelectedGenre: (genre: MovieGenre) => void;
}

export const CategoryFilter = ({
    className,
    genres,
    selectedGenre,
    setSelectedGenre,
}: CategoryFilterProps) => {
    const allGenres = [
        { id: 0, name: 'All' },
        ...genres,
    ];

    // const [selectedGenre, setSelectedGenre] = useState<Pick<MovieGenre, 'name'>>(allGenres[0]);
    // const { isDarkMode } = useTheme();

    return (
        <View className={className} >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {allGenres.length > 0 && allGenres?.map((genre) => (
                    // <CustomButton
                    //     className={`px-4 py-2 mx-1 rounded-full ${selectedGenre === genre ? 'bg-white' : 'bg-gray-800'}`}
                    //     textClassName={`text-sm ${selectedGenre === genre ? 'text-black' : 'text-white'
                    //         }`}
                    //     title={genre}
                    //     onPress={() => setSelectedGenre(genre)} />
                    <TouchableOpacity
                        key={genre.id}
                        onPress={() => setSelectedGenre(genre)}
                        className={`rounded-full ${selectedGenre.name === genre.name ? 'bg-white' : 'bg-transparent'
                            }`}
                    >
                        <Text
                            className={`px-6 py-3 text-sm ${selectedGenre.name === genre.name ? 'text-black' : 'text-white'
                                }`}
                        >
                            {genre.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View >
    );
};
