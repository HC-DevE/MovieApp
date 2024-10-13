import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CustomButton, ButtonSize, ButtonType, ButtonVariant } from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import MovieScreen from '../screens/movies/MovieScreen';

export interface Movie {
    id: number;
    title: string;
    poster: any;
    rating?: number;
}

interface MovieListProps {
    title: string;
    movies: Movie[];
}

export const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => {
    const { isDarkMode } = useTheme();
    const navigation = useNavigation();

    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white';

    return (
        <TouchableOpacity className={`mr-3 ${backgroundColor}`} onPress={() => navigation.navigate('Movie')}>
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
                <CustomButton size={ButtonSize.SMALL} type={ButtonType.NAKED} variant={ButtonVariant.PRIMARY} title={'See more'} onPress={() => null} />
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
