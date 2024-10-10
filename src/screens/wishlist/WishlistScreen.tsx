import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MovieItem } from '../../components/MovieList';
// import appTheme from '../../constants/theme';
import { WISHLISTMOVIES } from '../../constants';

export const WishlistScreen: React.FC = () => {
    const { isDarkMode } = useTheme();

    return (
        <View className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <Text className={`text-2xl font-bold p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>My Wishlist</Text>
            <FlatList
                data={WISHLISTMOVIES}
                renderItem={({ item }) => <MovieItem movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerClassName={'p-[16px]'}
            />
        </View>
    );
};
