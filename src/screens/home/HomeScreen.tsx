import React, { useState } from 'react';
import { ScrollView, ActivityIndicator, Text, View } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useAuth } from '../../context/AuthContext';
// import {CustomButton} from '../../components/CustomButton';
import { HeroCarousel } from '../../components/HeroCarousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryFilter } from '../../components/CategoryFilter';
import { AdBanner } from '../../components/AdBanner';
import { images } from '../../constants';
import { NavigationProp } from '@react-navigation/native';
import { MovieList } from '../../components/MovieList';
import { useTheme } from '../../context/ThemeContext';
import { useQuery } from '@tanstack/react-query';
import { getDiscoverMovies, getMovieGenres, getNowPlayingMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from '../../../lib/api';
import { BlurView } from '@react-native-community/blur';
import { MovieGenre } from '../../interfaces/movie.interface';

interface HomeScreenProps {
    // navigation: StackNavigationProp<any, 'Home'>;
    navigation: NavigationProp<any, 'Home'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const { isDarkMode } = useTheme();
    const [selectedGenre, setSelectedGenre] = useState<MovieGenre>({
        id: 'all',
        name: 'All',
    });

    const ad = {
        title: 'Black Friday is here!',
        description: 'Get 20% off on your first purchase Get 20% off on your first purchase Get 20% off on your first purchase',
        image: images.BLACKFRIDAY,
        onPress: () => navigation.navigate('OfferDetails'),
        className: ' rounded-lg',
    };

    const { data: movieGenres, isFetching: isGenresFetching, error: genresError } = useQuery({
        queryKey: ['movieListGenres'],
        queryFn: async () => await getMovieGenres(),
    });

    const { data: marvelMovies, isFetching: isMarvelFetching, error: marvelError } = useQuery({
        queryKey: ['marvelMovies'],
        queryFn: async () => await getDiscoverMovies({
            isMarvel: true,
        }),
    });

    const { data: trendingMovies, isFetching: isTrendingFetching, error: trendingError } = useQuery({
        queryKey: ['trendingMovies'],
        queryFn: async () => await getTrendingMovies(),
    });

    const { data: nowPlayingMovies, isFetching: isNowPlayingFetching, error: nowPlayingError } = useQuery({
        queryKey: ['nowPlayingMovies'],
        queryFn: async () => await getNowPlayingMovies(),
    });

    // const { data: upcomingMovies, isFetching: isUpcomingFetching, error: upcomingError } = useQuery({
    //     queryKey: ['upcomingMovies'],
    //     queryFn: async () => await getUpcomingMovies(),
    // });

    const { data: topRatedMovies, isFetching: isTopRatedFetching, error: topRatedError } = useQuery({
        queryKey: ['topRatedMovies'],
        queryFn: async () => await getTopRatedMovies(),
    });

    if (isMarvelFetching || isTrendingFetching || isNowPlayingFetching || isGenresFetching) {
        return (
            <SafeAreaView className={`h-full items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <ActivityIndicator />
            </SafeAreaView>
        );
    }

    // if (discoverError || trendingError || nowPlayingError || genresError) {
    //     return (
    //         <SafeAreaView className={`h-full items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
    //             <Text>Error fetching data</Text>
    //         </SafeAreaView>
    //     );
    // }

    return (
        <SafeAreaView className={`flex-1 w-full h-full items-center justify-between ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <ScrollView>
                <CategoryFilter
                    genres={movieGenres || []}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                />

                <HeroCarousel movies={trendingMovies} />
                <MovieList title={'Marvel Studios'}
                    movies={(marvelMovies || [])?.filter((movie) => selectedGenre.name === 'All' || movie.genre_ids.some(
                        (genre) => genre === selectedGenre.id
                    ))}
                />
                <MovieList withAverageVote title={'Best Movies'} movies={(topRatedMovies || []).filter(
                    (movie) =>
                        selectedGenre.name === 'All' ||
                        movie.genre_ids?.some((genre) => genre === selectedGenre.id)
                )} />
                <AdBanner ad={ad} />
            </ScrollView>
        </SafeAreaView>
    );

};
