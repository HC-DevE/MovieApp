import React, { useRef } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import { CustomButton, ButtonType, ButtonVariant } from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import appTheme from '../constants/theme';
import { MovieResult } from '../interfaces/movie.interface';
import { buildImageUrl } from '../../lib/api';
import { useTheme } from '../context/ThemeContext';
import { images } from '../constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MovieRootStackParamList } from './MovieList';

export const HeroCarousel = ({ className, movies }: { className?: string, movies?: MovieResult[] }) => {
    const { isDarkMode } = useTheme();
    const swiperRef = useRef<Swiper>(null);
    const height = appTheme.SIZES.screenHeight;
    const width = appTheme.SIZES.screenWidth;

    const navigation = useNavigation<NavigationProp<MovieRootStackParamList>>();


    const randomMovies = movies
        ?.map(movie => ({ movie, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ movie }) => movie)
        .slice(0, 5);

    const addToWishlist = (movie: MovieResult) => {
        console.log('Added to wishlist', movie);
    };

    return (
        <SafeAreaView className={className} style={{ width: width, height: height * 0.5 }}>
            <View className={' w-full flex-1'}>
                <Swiper
                    width={width}
                    ref={swiperRef}
                    loop
                    autoplay
                    dot={
                        <View
                            className="w-2 h-2 bg-[#F2F2F7] rounded-full mx-1"
                            style={{
                                height: 6,
                                width: 6,
                            }}
                        />
                    }
                    activeDot={
                        <View
                            className="w-2 h-2 bg-primary rounded-full mx-1"
                            style={{
                                height: 6,
                                width: 6,
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
                            className="w-full h-full justify-center items-center"
                            style={{ height: height * 0.5 }}
                        >
                            <View className="flex-1 h-full w-full">
                                <Image
                                    // className="h-full w-full"
                                    src={movie?.poster_path && buildImageUrl(movie?.poster_path)}
                                    // source={images.STRANGER}
                                    style={{ width: width, height: (height * 0.55) * 0.94 }}
                                    resizeMode="cover" //contain
                                />
                                <LinearGradient
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        flexShrink: 0,
                                        width: '100%',
                                        height: 129,
                                    }}
                                    // locations={[0, 0.24, 0.52, 1]}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    colors={isDarkMode
                                        ? ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)', 'black']
                                        : ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.8)', 'white']
                                    }
                                    useAngle={true}
                                    angle={180} />
                            </View>
                            <View className={'flex-1 absolute left-0 bottom-0 w-full items-center'}>
                                <View className="flex-row justify-between gap-[36px] mb-3 bg-transparent">
                                    <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>My List</Text>
                                    <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Discover</Text>
                                </View>
                                <View className="w-full flex-row mb-5 justify-around items-center">
                                    <CustomButton
                                        // className="w-1/2"
                                        style={{ width: width * 0.45 }}
                                        title={'+ Wishlist'}
                                        type={ButtonType.FULL}
                                        variant={ButtonVariant.SECONDARY}
                                        onPress={() => addToWishlist(movie)}
                                    />
                                    <CustomButton
                                        // className="w-1/2"
                                        style={{ width: width * 0.45 }}
                                        title={'Details'}
                                        type={ButtonType.FULL}
                                        variant={ButtonVariant.PRIMARY}
                                        onPress={() => navigation.navigate('Movie', movie)}
                                    />
                                </View>
                            </View>
                        </View>
                    ))}
                </Swiper>

            </View>
        </SafeAreaView>
    );
};
