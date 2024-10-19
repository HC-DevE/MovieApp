import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { View, TextInput, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, Image } from 'react-native';
import { Movie } from '../../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import appTheme from '../../constants/theme';
import CustomIcon, { IconsName } from '../../components/CustomIcon';
import { MOVIES } from '../../constants';
// import { Search as SearchIcon } from 'lucide-react-native';

const movies = [...MOVIES.marvelMovies, ...MOVIES.bestMovies];
const height = appTheme.SIZES.screenHeight;
const width = appTheme.SIZES.screenWidth;

export const SearchScreen: React.FC = () => {
    const { isDarkMode } = useTheme();
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Movie[]>(movies);


    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white';
    const searchIconColor = isDarkMode ? 'white' : 'black';
    const searchBorderColor = isDarkMode ? 'border-white' : 'border-black';

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const results = movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
        setSearchResults(results);
    };

    return (
        <SafeAreaView className={`flex-1 ${backgroundColor}`}>
            <View className={`flex-row justify-between items-center mx-4 mb-3 mt-2 border focus:border-primary rounded-full ${searchBorderColor}`}>
                <CustomIcon className="ml-4" iconName={IconsName.SEARCH} iconColor={searchIconColor} iconSize={24} />
                <TextInput
                    className={`flex-1 ml-2 tracking-wider ${textColor}`}
                    placeholder="Search movies..."
                    placeholderTextColor={isDarkMode ? 'gray' : 'black'}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                {searchQuery.length > 0 && (
                    <CustomIcon onPress={() => setSearchQuery('')} className="mr-4" iconName={IconsName.XMARK} iconColor={appTheme.COLORS.primary} />
                )
                }
            </View>
            {/* <FlatList
                    data={searchResults}
                    renderItem={({ item }) => <MovieItem movie={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                /> */}
            {
                searchResults.length > 0 && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        className="space-y-3"
                    >
                        <Text
                            className={`${textColor} font-semibold ml-1 mb-4`}
                        >
                            Results ({searchResults.length})
                        </Text>
                        <View className="flex-row justify-between flex-wrap">
                            {searchResults.map((movie, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigation.navigate("Movie", movie)}
                                    >
                                        <View className="space-y-2 mb-4">
                                            <Image source={movie.poster} className="rounded-3xl" style={{ width: width * 0.45, height: height * 0.3 }} />
                                            <Text className={`${textColor} ml-1`}>
                                                {movie.title.length > 22 ? movie.title.slice(0, 22) + '...' : movie.title}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );

                            }
                            )}
                        </View>
                    </ScrollView>
                )
            }
        </SafeAreaView>

    );
};
