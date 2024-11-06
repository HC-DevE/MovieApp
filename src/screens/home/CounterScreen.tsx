import { View, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon, { IconsName } from '../../components/CustomIcon';
import { MovieList } from '../../components/MovieList';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { MOVIES } from '../../constants';
import appTheme from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../../components/Cast';
import { ImageSizeEnum, MovieDetails, MovieResult } from '../../interfaces/movie.interface';
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

    console.log(movieDetails?.genres);

    return (
        <ScrollView
            contentContainerClassName="pb-20"
            className={'flex-1' + backgroundColor}
        >
            <View className="w-full">
                <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 py-2">
                    <CustomIcon className="bg-primary rounded-xl p-1" iconName={IconsName.ARROW_LEFT} iconColor={'white'} onPress={() => navigation.goBack()} />
                    <CustomIcon iconName={IconsName.HEART} iconColor={isFav === true ? 'red' : 'white'} onPress={() => setIsFav(!isFav)} />
                </SafeAreaView>
                <View
                // className="w-full justify-center items-center"
                >
                    <Image
                        src={movieDetails?.poster_path && buildImageUrl(movieDetails.poster_path)}
                        style={{ width: width, height: height * 0.55 }}
                        resizeMode="cover"
                    />
                    {/* <LinearGradient
                        className="absolute bottom-0"
                        style={{
                            width: width,
                            height: height * 0.30,
                        }}
                        colors={isDarkMode
                            ? ['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']
                            : ['transparent', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']
                        }
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    /> */}
                </View>
            </View>
            <View style={{ marginTop: -(height * 0.1) }} className="space-y-3">
                <Text className={`text-center text-3xl font-bold tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {movieDetails?.title}
                </Text>
                {/* status realease and duration/runtime */}
                <Text className={`text-center fond-semibold ${isDarkMode ? 'text-white' : 'text-secondary'}`}>
                    {new Date(movieDetails?.release_date).toLocaleDateString()} - {movieDetails?.runtime} min
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
                <Text className={`mt-4 mx-4 tracking-wide text-balance ${isDarkMode ? 'text-white' : 'text-secondary'}`}>
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


import React, { useRef } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import { CustomButton, ButtonType, ButtonVariant } from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import appTheme from '../constants/theme';
import { MovieResult } from '../interfaces/movie.interface';
import { buildImageUrl } from '../../lib/api';
import { useTheme } from '../context/ThemeContext';

export const HeroCarousel = ({ className, movies }: { className?: string, movies?: MovieResult[] }) => {
    const swiperRef = useRef<Swiper>(null);
    const height = appTheme.SIZES.screenHeight;
    const width = appTheme.SIZES.screenWidth;
    const { isDarkMode } = useTheme();

    const randomMovies = movies
        ?.map(movie => ({ movie, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ movie }) => movie)
        .slice(0, 5);

    return (
        <SafeAreaView className={`${className} w-full h-full flex-1`}
            // style={{ width: width }}
        >
            <View className={'w-full flex-1'}
                style={{ height: height * 0.55 }}
            >
                <Swiper
                    width={width}
                    ref={swiperRef}
                    loop
                    autoplay
                    dot={
                        <View
                            className="w-2 h-2 bg-[#F2F2F7] rounded-full mx-1"
                            style={{
                                height: 4,
                                width: 4,
                            }} />
                    }
                    activeDot={
                        <View
                            className="w-2 h-2 bg-primary rounded-full mx-1"
                            style={{
                                height: 4,
                                width: 4,
                            }}
                        />
                    }
                    paginationStyle={{
                        bottom: 0
                    }}
                >
                    {randomMovies?.map((movie, index) => (
                        <View
                            key={index}
                            className="w-full h-full py-3 px-3 justify-center items-center"
                            style={{ height: height * 0.5 }}
                        >
                            <View className="flex-1">
                                <Image
                                    // className="h-full w-full"
                                    src={buildImageUrl(movie?.poster_path!)}
                                    style={{ width: width, height: (height * 0.55) * 0.94 }}
                                    resizeMode="cover" //contain
                                />
                                {/* <LinearGradient
                                    className="absolute top-5"
                                    colors={['white', 'rgba(23,23,23,0.5)', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                /> */}
                            </View>
                            {/* <View className={'flex-1 absolute bottom-0 w-full'}>
                                <View className="flex-row justify-around items-center mb-3 py-2 px-7 bg-transparent">
                                    <Text>My List</Text>
                                    <Text>Discover</Text>
                                    <LinearGradient
                                        className="absolute bottom-0"
                                        colors={['black', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                        start={{ x: 0.5, y: 0 }}
                                        end={{ x: 0.5, y: 1 }}
                                    />
                                </View>
                                <View className="w-full flex-row mb-4 justify-between items-center ">
                                    <CustomButton
                                        // className="w-1/2"
                                        style={{ width: width * 0.45 }}
                                        title={'+ Wishlist'}
                                        type={ButtonType.FULL}
                                        variant={ButtonVariant.SECONDARY}
                                        onPress={() => { }}
                                    />
                                    <CustomButton
                                        // className="w-1/2"
                                        style={{ width: width * 0.45 }}
                                        title={'Details'}
                                        type={ButtonType.FULL}
                                        variant={ButtonVariant.PRIMARY}
                                        onPress={() => { }}
                                    />
                                </View>
                            </View> */}
                        </View>
                    ))}
                </Swiper>
                <View className={'flex-1 absolute bottom-0 w-full'}>
                    <View className="flex-row justify-around items-center bg-transparent">
                        <Text>My List</Text>
                        <Text>Discover</Text>
                        {/* <LinearGradient
                            className="absolute bottom-0"
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        /> */}
                        {isDarkMode
                            ? (
                                <>
                                    {/* <LinearGradient
                                        className="absolute bottom-0 left-0 w-[375px] h-[105px] bg-transparent"
                                        locations={[0, 0.5, 1]}
                                        colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']}
                                        useAngle={true}
                                        angle={180} /> */}
                                    <LinearGradient
                                        className="absolute left-0 w-[375px] h-[129px] bg-transparent"
                                        locations={[0, 0.24, 0.52, 1]}
                                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)', 'white']}
                                        useAngle={true}
                                        angle={180} />

                                </>
                            )
                            :
                            <>
                                {/* <LinearGradient
                                    className="absolute bottom-0 left-0 w-[375px] h-[105px] bg-transparent"
                                    locations={[0, 0.5, 1]}
                                    colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']}
                                    useAngle={true}
                                    angle={180} /> */}
                                <LinearGradient
                                    className="absolute top-0 left-0 w-[375px] h-[129px] bg-transparent"
                                    locations={[0, 0.24, 0.52, 1]}
                                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.8)', 'black']}
                                    useAngle={true}
                                    angle={180} />
                            </>
                        }
                    </View>
                    <View className="w-full flex-row mb-5 justify-around items-center">
                        <CustomButton
                            // className="w-1/2"
                            style={{ width: width * 0.45 }}
                            title={'+ Wishlist'}
                            type={ButtonType.FULL}
                            variant={ButtonVariant.SECONDARY}
                            onPress={() => { }}
                        />
                        <CustomButton
                            // className="w-1/2"
                            style={{ width: width * 0.45 }}
                            title={'Details'}
                            type={ButtonType.FULL}
                            variant={ButtonVariant.PRIMARY}
                            onPress={() => { }}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
