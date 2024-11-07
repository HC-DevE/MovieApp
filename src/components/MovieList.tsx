import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CustomButton, ButtonSize, ButtonType, ButtonVariant } from './CustomButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MovieResult } from '../interfaces/movie.interface';
import { buildImageUrl } from '../../lib/api';
import { MovieBox } from './MovieBox';

export type MovieRootStackParamList = {
    Movie: MovieResult;
};

type MovieListProps = {
    title: string;
    movies: MovieResult[];
    withAverageVote?: boolean;
}

export const MovieItem: React.FC<{ movie: MovieResult }> = ({ movie }) => {
    const { isDarkMode } = useTheme();
    const navigation = useNavigation<NavigationProp<MovieRootStackParamList>>();

    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const backgroundColor = 'bg-transparent';
    // const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white';

    return (
        <TouchableOpacity className={`mr-3 ${backgroundColor}`} onPress={() => navigation.navigate('Movie', movie)}>
            <Image className="w-24 h-36 rounded" src={movie.poster_path && buildImageUrl(movie.poster_path)} />
            <Text className={`${textColor} text-xs mt-1`}>{
                movie.title.length > 13 ? movie.title.slice(0, 13) + '...' : movie.title}</Text>
            {/* <Text className="text-yellow-500 text-xs">{movie.vote_average.toFixed(1)}</Text> */}
        </TouchableOpacity>
    )
};

export const MovieList: React.FC<MovieListProps> = ({ title, movies, withAverageVote = false }) => {
    const { isDarkMode } = useTheme();

    const textColor = isDarkMode ? 'text-white' : 'text-black';

    return (
        <View className={'my-4 bg-transparent'}>
            <View className="flex-row justify-between items-center mx-4 mb-2">
                <Text className={`${textColor} text-lg font-bold`}>{title}</Text>
                <CustomButton size={ButtonSize.SMALL} type={ButtonType.NAKED} variant={ButtonVariant.PRIMARY} title={'See more'} onPress={() => null} />
            </View>
            <FlatList
                data={movies}
                renderItem={({ item }) => withAverageVote ? <MovieBox withAverageVote={withAverageVote} movie={item} /> : <MovieItem movie={item} />}
                // renderItem={({ item }) => <MovieItem movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
};
