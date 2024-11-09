import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon, { IconsName } from '../../components/CustomIcon';
import { MovieList } from '../../components/MovieList';
import { useRoute, useNavigation, RouteProp, CommonActions } from '@react-navigation/native';
import appTheme from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
// import { Cast } from '../../components/Cast';
import { MovieResult } from '../../interfaces/movie.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addRemoveFavorite, buildImageUrl, getFavoriteMovies, getMovieCredits, getMovieDetails, getSimilarMovies } from '../../../lib/api';
import { useTheme } from '../../context/ThemeContext';

export const MovieScreen = () => {
    type MovieScreenRouteProp = RouteProp<{ MovieScreen: MovieResult }, 'MovieScreen'>;
    const { params: movie } = useRoute<MovieScreenRouteProp>();
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const queryClient = useQueryClient();
    const [isFav, setIsFav] = useState(false);

    const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white';

    const height = appTheme.SIZES.screenHeight;
    const width = appTheme.SIZES.screenWidth;

    const { data: movieDetails, isFetching: isDetailFetching, error: isDetailError } = useQuery({
        queryKey: ['movieDetails', movie.id],
        queryFn: async () => await getMovieDetails(movie.id),
    });

    const { data: similarMovies, isFetching: isSimilarFetching, error: isSimilarError } = useQuery({
        queryKey: ['similarMovies', movie.id],
        queryFn: async () => await getSimilarMovies(movie.id),
    });

    // const { data: movieCredits, isFetching: isCreditFetching, error: isCreditError } = useQuery({
    //     queryKey: ['MovieCredits', movie.id],
    //     queryFn: async () => await getMovieCredits(movie.id),
    // });

    const { data: favoriteMovies, isFetching: isFavoriteFetching, error: isFavoriteError } = useQuery({
        queryKey: ['favoriteMovies'],
        queryFn: async () => await getFavoriteMovies(),
    });

    const { mutate: addRemoveFav } = useMutation({
        mutationFn: (movieId: number) => addRemoveFavorite(movieId, !isFav),
        onSuccess: () => {
            setIsFav(!isFav);
            queryClient.invalidateQueries({ queryKey: ['favoriteMovies'] });
        },
    });

    const handleFav = async () => {
        addRemoveFav(movie.id);
    };

    useEffect(() => {
        const isMovieFav = favoriteMovies?.find((fav) => fav.id === movie.id);
        setIsFav(!!isMovieFav);
    }, [favoriteMovies, movie.id]);

    return (
        <ScrollView
            contentContainerClassName="pb-20"
            className={`${backgroundColor} flex-1`}
        >
            <View className="w-full">
                <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 py-2">
                    <CustomIcon className="bg-primary rounded-xl p-1" iconName={IconsName.ARROW_LEFT} iconColor={'white'} onPress={() => navigation.dispatch(
                        CommonActions.goBack()
                    )} />
                    <CustomIcon iconName={IconsName.HEART} iconColor={isFav === true ? 'red' : 'white'} onPress={handleFav} />
                </SafeAreaView>
                <View
                    className="w-full justify-center items-center"
                >
                    <Image
                        source={{ uri: buildImageUrl(movieDetails?.poster_path || '') }}
                        style={{ width: width, height: height * 0.55 }}
                        resizeMode="cover"
                    />
                    <LinearGradient
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
                <Text className={`text-center fond-semibold ${isDarkMode ? 'text-white' : 'text-secondary'}`}>
                    {movieDetails?.release_date?.split('-')[0]} - {movieDetails?.runtime} min - {movieDetails?.status}
                </Text>
                <View className="flex-row justify-center mx-4 space-x-2">
                    {movieDetails?.genres && movieDetails.genres.length > 0 && (
                        <Text className={`text-center font-bold ${isDarkMode ? 'text-white' : 'text-secondary'}`}>
                            {movieDetails.genres.map(genre => genre.name).join(' - ')}
                        </Text>
                    )}
                </View>
                <View className="flex-row justify-center items-center mt-2 gap-2">
                    <CustomIcon iconName={IconsName.STAR} iconColor={appTheme.COLORS.primary} iconSize={16} />
                    <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-secondary'}`}>
                        {movieDetails?.vote_average.toFixed(1)} ( {movieDetails?.vote_count} )
                    </Text>
                </View>
                <Text className={`mt-4 mx-4 tracking-wide ${isDarkMode ? 'text-white' : 'text-gray'}`}>
                    {movieDetails?.overview}
                </Text>
            </View>


            {/* {movieCredits && <Cast cast={movieCredits?.cast} />} */}

            <MovieList title={'Similar Movies'} movies={(similarMovies || [])} />

            <View className="flex-column justify-center items-center mt-4 gap-2">
                <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-secondary'}`}>Budget: {movieDetails?.budget.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</Text>
                <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-secondary'}`}>Revenue: {movieDetails?.revenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</Text>
            </View >
        </ScrollView >
    );
};
