import React, { useRef } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import { CustomButton, ButtonType, ButtonVariant } from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import appTheme from '../constants/theme';
import { MovieResult } from '../interfaces/movie.interface';
import { buildImageUrl } from '../../lib/api';

export const HeroCarousel = ({ className, movies }: { className?: string, movies?: MovieResult[] }) => {
    const swiperRef = useRef<Swiper>(null);
    const height = appTheme.SIZES.screenHeight;
    const width = appTheme.SIZES.screenWidth;

    const randomMovies = movies
        ?.map(movie => ({ movie, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ movie }) => movie)
        .slice(0, 5);

    return (
        <SafeAreaView className={className} style={{ width: width, height: height * 0.55 }}>
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
                    <View className="flex-row justify-around items-center mb-3 py-2 px-7 bg-transparent">
                        {/* <Text>My List</Text>
                        <Text>Discover</Text> */}
                        <LinearGradient
                            className="absolute bottom-0"
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        />
                    </View>
                    {/* bg-[#42423fcc] */}
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
