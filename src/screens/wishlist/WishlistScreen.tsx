import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Movie, MovieItem } from '../../components/MovieList';
import appTheme from '../../constants/theme';

export const WishlistScreen: React.FC = () => {
    const { isDarkMode } = useTheme();

    // This would typically come from a state management solution or API
    const WISHLISTMOVIES: Movie[] = [
        {
            id: 1,
            title: 'The Shawshank Redemption',
            poster: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Redemption.jpg',
            rating: 9.2,
        },
        {
            id: 2,
            title: 'The Godfather',
            poster: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Redemption.jpg',
            rating: 9.2,
        },
        {
            id: 3,
            title: 'The Dark Knight',
            poster: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg',
            rating: 9.0,
        },
        {
            id: 4,
            title: '12 Angry Men',
            poster: 'https://upload.wikimedia.org/wikipedia/en/e/ec/12_Angry_Men_%281957_film%29.jpg',
            rating: 9.0,
        },
        {
            id: 5,
            title: "Schindler's List",
            poster: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Schindler%27s_List_movie_poster.jpg',
            rating: 8.9,
        }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? appTheme.COLORS.black : appTheme.COLORS.white }}>
            <Text style={{ color: isDarkMode ? appTheme.COLORS.white : appTheme.COLORS.black , fontSize: 24, padding: 16 }}>My Wishlist</Text>
            <FlatList
                data={WISHLISTMOVIES}
                renderItem={({ item }) => <MovieItem movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
};
