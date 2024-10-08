import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { View, TextInput, FlatList } from 'react-native';
import { Movie, MovieItem } from '../../components/MovieList';
import appTheme from '../../constants/theme';
// import { Search as SearchIcon } from 'lucide-react-native';


export const SearchScreen: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    const textColor = isDarkMode ? appTheme.COLORS.white : appTheme.COLORS.black;

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // This would typically be an API call
        // For now, we'll just filter a static list
        const results = [
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
        ].filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
        setSearchResults(results);
    };

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? appTheme.COLORS.black : appTheme.COLORS.white }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                {/* <SearchIcon color={colors.text} size={24} /> */}
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: 8,
                        color: textColor,
                        borderBottomWidth: 1,
                        borderBottomColor: textColor,
                    }}
                    placeholder="Search movies..."
                    placeholderTextColor={textColor}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={searchResults}
                renderItem={({ item }) => <MovieItem movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
};