import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CustomButton, ButtonSize, ButtonType, ButtonVariant } from './CustomButton';
import { MovieResult } from '../interfaces/movie.interface';
import { MovieCard } from './MovieCard';

export type MovieRootStackParamList = {
    Movie: MovieResult;
};

type MovieListProps = {
    title: string;
    movies: MovieResult[];
    withAverageVote?: boolean;
}

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
                renderItem={({ item }) => <MovieCard withVoteAverage={withAverageVote} movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
};
