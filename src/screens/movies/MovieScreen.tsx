import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon, { IconsName } from '../../components/CustomIcon';
import { MovieList } from '../../components/MovieList';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { MOVIES } from '../../constants';
import appTheme from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../../components/Cast';
import { MovieDetails, MovieResult } from '../../interfaces/movie.interface';
import { useQuery } from '@tanstack/react-query';
import { buildImageUrl, getMovieDetails, getSimilarMovies } from '../../../lib/api';
import { useTheme } from '../../context/ThemeContext';

export const MovieScreen = () => {
    type MovieScreenRouteProp = RouteProp<{ MovieScreen: MovieResult }, 'MovieScreen'>;
    const { params: movie } = useRoute<MovieScreenRouteProp>();

    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white';
    const [isFav, setIsFav] = useState(false);
    const [cast, setCast] = useState([1, 2, 3, 4, 5]);
    // const [similarMovies, setSimilarMovies] = useState(MOVIES.similarMovies);

    const height = appTheme.SIZES.screenHeight;
    const width = appTheme.SIZES.screenWidth;

    const { data: movieDetails, isFetching: isDetailsFetching, error: isDetailsError } = useQuery({
        queryKey: ['movieDetails', movie.id],
        queryFn: async () => await getMovieDetails(movie.id),
    });

    const { data: similarMovies, isFetching: isSimilarFetching, error: isSimilarError } = useQuery({
        queryKey: ['similarMovies', movie.id],
        queryFn: async () => await getSimilarMovies(movie.id),
    });

    const handleFav = () => {
        console.log('Added to Favorite', movie);
        setIsFav(!isFav);
    };

    return (
        <ScrollView
            contentContainerClassName="pb-20"
            className={`${backgroundColor} flex-1`}
        >
            <View className="w-full">
                <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 py-2">
                    <CustomIcon className="bg-primary rounded-xl p-1" iconName={IconsName.ARROW_LEFT} iconColor={'white'} onPress={() => navigation.goBack()} />
                    <CustomIcon iconName={IconsName.HEART} iconColor={isFav === true ? 'red' : 'white'} onPress={handleFav} />
                </SafeAreaView>
                <View
                    className="w-full justify-center items-center"
                >
                    <Image
                        src={movieDetails?.poster_path ? buildImageUrl(movieDetails.poster_path) : ''}
                        style={{ width: width, height: height * 0.55 }}
                        resizeMode="cover"
                    /><LinearGradient
                        // className="absolute bottom-0"
                        style={{
                            width: width,
                            height: height * 0.20,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            flexShrink: 0,
                        }}
                        colors={isDarkMode
                            ? ['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']
                            : ['transparent', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']
                        }
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
                </View>
            </View>
            <View style={{ marginTop: -(height * 0.1) }} className="space-y-3">
                <Text className={`text-center text-3xl font-bold tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {movieDetails?.title}
                </Text>
                {/* status realease and duration/runtime */}
                <Text className={`text-center fond-semibold ${isDarkMode ? 'text-white' : 'text-secondary'}`}>
                    {movieDetails?.release_date}
                </Text>
                {/* TODO categry / genres */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {movieDetails?.genres && movieDetails.genres.length > 0 && (
                        <Text className={`text-center font-bold ${isDarkMode ? 'text-white' : 'text-secondary'}`}>
                            {movieDetails.genres.map(genre => genre.name).join(' - ')}
                        </Text>
                    )}
                </View>

                {/* description */}
                <Text className={`mt-4 mx-4 tracking-wide ${isDarkMode ? 'text-white' : 'text-gray'}`}>
                    {movieDetails?.overview}
                </Text>
            </View>
            {/* TODO: cast members */}
            <Cast cast={cast} />
            {/* similar movies */}
            <MovieList title={'Similar Movies'} movies={similarMovies} />
        </ScrollView>
    );
};
