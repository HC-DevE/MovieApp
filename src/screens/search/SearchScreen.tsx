import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { View, TextInput, FlatList, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, Image } from 'react-native';
import { Movie, MovieItem } from '../../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import { MOVIESLIST } from '../../constants';
// import { Search as SearchIcon } from 'lucide-react-native';

// FAKE MOVIES DATA RESULTS
// const MOVIESLIST = [
//     {
//         id: 1,
//         title: 'The Dark Knight',
//         poster:
//             'https://images.unsplash.com/photo-1611787640592-ebf78080d96e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         rating: 9.0,
//     },
//     {
//         id: 2,
//         title: 'The Godfather',
//         poster:
//             'https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         rating: 9.2,
//     },
//     {
//         id: 3,
//         title: 'The Dark Knight',
//         poster:
//             'https://images.unsplash.com/photo-1611787640592-ebf78080d96e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         rating: 9.0,
//     },
// ];

export const SearchScreen: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>(MOVIESLIST);

    const navigation = useNavigation();



    // const textColor = isDarkMode ? appTheme.COLORS.white : appTheme.COLORS.black;

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const results = MOVIESLIST.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
        setSearchResults(results);
    };

    return (
        <SafeAreaView>
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                className="space-y-3"
            >
                <Text
                    className={`${isDarkMode ? 'text-white' : 'text-black'} font-semibold ml-1`}
                >
                    Results ({searchResults.length})
                </Text>
                <View className="flex-row justify-between flex-wrap">
                    {searchResults.map((movie) => {
                        // <MovieItem key={movie.id} movie={movie} />
                        return (
                            <TouchableWithoutFeedback
                                key={movie.id}
                                onPress={() => navigation.push("Movie", movie)}
                            >
                                <View className="space-y-2 mb-4">
                                    <Image source={movie.poster} className="rounded-3xl" />
                                    <Text className={`${isDarkMode ? 'text-white' : 'text-black'} ml-1`}>{movie.title}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );

                    }
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
