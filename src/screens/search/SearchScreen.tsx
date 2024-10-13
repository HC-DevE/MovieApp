import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { View, TextInput, FlatList } from 'react-native';
import { Movie, MovieItem } from '../../components/MovieList';
import { MOVIESLIST } from '../../constants';
// import { Search as SearchIcon } from 'lucide-react-native';


export const SearchScreen: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    // const textColor = isDarkMode ? appTheme.COLORS.white : appTheme.COLORS.black;

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const results = MOVIESLIST.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
        setSearchResults(results);
    };

    return (
        <View className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <View className="flex-row items-center p-4">
                {/* <SearchIcon color={isDarkMode ? 'white' : 'black'} size={24} /> */}
                <TextInput
                    className={`flex-1 ml-2 focus:border-2 rounded-full -shadow-sm shadow-primary border-primary ${isDarkMode ? 'text-white ' : 'text-black'}`}
                    placeholder="Search movies..."
                    placeholderTextColor={isDarkMode ? 'gray' : 'darkgray'}
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
