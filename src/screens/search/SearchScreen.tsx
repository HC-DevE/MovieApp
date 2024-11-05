import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { View, TextInput, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appTheme from '../../constants/theme';
import CustomIcon, { IconsName } from '../../components/CustomIcon';
import { buildImageUrl, searchMovies } from '../../../lib/api';
// import { Search as SearchIcon } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { MovieAPIResponse } from '../../interfaces/movie.interface';

export const SearchScreen: React.FC = () => {
    // const navigation = useNavigation();

    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigation = useNavigation();

    const height = appTheme.SIZES.screenHeight;
    const width = appTheme.SIZES.screenWidth;
    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white';
    const searchIconColor = isDarkMode ? 'white' : 'black';
    const searchBorderColor = isDarkMode ? 'border-white' : 'border-black';

    const { data, isFetching, error } = useQuery<MovieAPIResponse>(
        {
            queryKey: ['searchMovies', searchQuery],
            queryFn: async () => await searchMovies(searchQuery),
            enabled: searchQuery.length >= 3, //TODO: add debounce ?
        }
    );

    const searchResults = data?.results || [];

    const handleSearch = (query: string) => {
        setSearchQuery(query);
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
                {searchQuery?.length > 0 && (
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
            {isFetching && <Text className={`${textColor} text-center mt-4`}>Loading...</Text>}
            {error && <Text className={`${textColor} text-center mt-4`}>Error fetching movies</Text>}

            {
                searchResults?.length > 0 && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        className="space-y-3"
                    >
                        <Text
                            className={`${textColor} font-semibold mb-4`}
                        >
                            Results ({searchResults?.length})
                        </Text>
                        <View className="flex-row justify-between flex-wrap">
                            {searchResults.map((movie, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigation.navigate("Movie", movie)}
                                    >
                                        <View className="space-y-2 mb-4">
                                            <Image src={movie.poster_path && buildImageUrl(movie.poster_path)} className="rounded-3xl" style={{ width: width * 0.45, height: height * 0.3 }} />
                                            <Text className={`${textColor} ml-1 text-center`}>
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
