import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import appTheme from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import Button, { ButtonVariant } from './Button';

interface Movie {
    id: number;
    title: string;
    poster: any;
    rating?: number;
}

interface MovieListProps {
    title: string;
    movies: Movie[];
}

const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => {
    const { isDarkMode } = useTheme();

    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white';

    return (
        <TouchableOpacity className={`mr-3 ${backgroundColor}`}>
            <Image source={movie.poster} className="w-24 h-36 rounded" />
            <Text className={`${textColor} text-xs mt-1`}>{movie.title}</Text>
            {/* {movie.rating && (
            <Text className="text-yellow-500 text-xs">{movie.rating.toFixed(1)}</Text>
        )} */}
        </TouchableOpacity>
    )
};

export const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
    const { isDarkMode } = useTheme();

    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white';

    return (
        <View className={`my-4 ${backgroundColor}`}>
            <View className="flex-row justify-between items-center mx-4 mb-2">
                <Text className={`${textColor} text-lg font-bold`}>{title}</Text>
                {/* <TouchableOpacity>
                    <Text className={`${appTheme.COLORS.primary} text-sm`}>See more</Text>
                </TouchableOpacity> */}
                <Button variant={ButtonVariant.NAKED} title={'See more'} onPress={()=> null} />
            </View>
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieItem movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
};
