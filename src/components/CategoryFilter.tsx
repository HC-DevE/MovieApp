import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MovieGenre } from '../interfaces/movie.interface';
import { BlurView } from '@react-native-community/blur';
import { useTheme } from '../context/ThemeContext';
import appTheme from '../constants/theme';
// import { useTheme } from '../context/ThemeContext';
// import {CustomButton} from './CustomButton';

export interface CategoryFilterProps {
    className?: string;
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
        { id: 'all', name: 'All' },
        ...genres,
    ];
    const width = appTheme.SIZES.screenWidth;

    return (
        <View
            className={`${className} bg-transparent overflow-hidden absolute z-10 top-0 left-1/2 transform -translate-x-1/2 justify-center items-center mt-4 p-[3px]  rounded-[90px] `}
            style={{ width: width * 0.9 }}
        >
            <BlurView
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ backgroundColor: 'rgba(255,255,255, 0.67)', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
                blurAmount={0}
                blurType="extraDark"
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {allGenres.length > 0 && allGenres?.map((genre) => (
                    <TouchableOpacity
                        key={genre.id}
                        onPress={() => setSelectedGenre(genre)}
                        className={`px-6 py-3 rounded-full ${selectedGenre.name === genre.name ? 'bg-white' : 'bg-transparent'
                            }`}
                    >
                        <Text
                            className={`text-md ${selectedGenre.name === genre.name ? 'text-black' : 'text-white'
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
