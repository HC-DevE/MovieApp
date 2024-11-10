import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
// import appTheme from '../../constants/theme';
import { MovieCard } from '../../components/MovieCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addRemoveWatchlist, getWatchlistMovies } from '../../../lib/api';
import { CustomButton } from '../../components/CustomButton';

export const WishlistScreen: React.FC = () => {
    const { isDarkMode } = useTheme();
    const queryClient = useQueryClient();

    const { data: watchlistMovies, isFetching, error } = useQuery({
        queryKey: ['watchlistMovies'],
        queryFn: async () => await getWatchlistMovies(),
    });

    const { mutate: removeFromWatchlist } = useMutation({
        mutationFn: (movieId: number) => addRemoveWatchlist(movieId, false),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['watchlistMovies'] });
        },
    });

    const handleRemoveFromWatchlist = (movieId: number) => {
        removeFromWatchlist(movieId);
    };

    if (isFetching) { return <ActivityIndicator />; }
    if (error) { return <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Error: {error.message}</Text>; }

    return (
        <View className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <Text className={`text-2xl font-bold p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>My Wishlist</Text>
            {watchlistMovies?.length && watchlistMovies.length > 0 && <FlatList
                data={watchlistMovies}
                renderItem={({ item }) => (
                    <View className="flex-row justify-between items-center mb-4">
                        <MovieCard withVoteAverage={true} movie={item} />
                        <CustomButton onPress={() => handleRemoveFromWatchlist(item.id)} title={'Remove from watchlist'} />
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerClassName={'p-[16px]'}
            />}
            {(watchlistMovies?.length === 0 || !watchlistMovies) &&
                <Text className={`text-lg font-bold p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    No movies in your wishlist
                </Text>
            }
        </View>
    );
};
