import React, { useRef } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import { images } from '../constants';
import { CustomButton, ButtonType, ButtonVariant } from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import appTheme from '../constants/theme';

// const heroItems = [
//     { title: 'Avengers', image: images.AVENGERS },
//     { title: 'Stranger', image: images.STRANGER },
//     { title: 'The Godfather', image: images.GODFATHER },
//     { title: 'Hawkeye', image: images.HAWKEYE },
//     { title: 'Spiderhead', image: images.SPIDERHEAD },
// ];

const heroItems = [
    { title: 'Avengers', image: images.STRANGER },
    { title: 'Stranger', image: images.STRANGER },
    { title: 'The Godfather', image: images.STRANGER },
    { title: 'Hawkeye', image: images.STRANGER },
    { title: 'Spiderhead', image: images.STRANGER },
];

export const HeroCarousel = ({ className }: { className?: string }) => {
    const swiperRef = useRef<Swiper>(null);
    const height = appTheme.SIZES.screenHeight;
    const width = appTheme.SIZES.screenWidth;

    return (
        <SafeAreaView className={className} style={{ width: width, height: height * 0.5 }}>
            <View className={' w-full flex-1'}>
                <Swiper
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
                    {heroItems.map((item, index) => (
                        <View key={index} style={{ height: height * 0.5 }} className="w-full h-full py-3 px-3 justify-center items-center">
                            <View className=''>
                                <Image
                                    // className="h-5/6"
                                    source={item.image}
                                    style={{ width: width, height: (height * 0.5) * 0.94 }}
                                    resizeMode="cover" //contain
                                />
                                <LinearGradient
                                    className="absolute top-5"
                                    colors={['white', 'rgba(23,23,23,0.5)', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                >
                                    {/* <Text>
                                Sign in with Facebook
                            </Text> */}
                                </LinearGradient>
                            </View>
                            <View className={'flex-1 absolute bottom-0 w-full'}>
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
                                <View className="flex-1 flex-row mb-4 justify-between items-center" style={{ width: width * 0.9 }}>
                                    <CustomButton
                                        // className="w-1/2"
                                        style={{ width: width * 0.45 }}
                                        type={ButtonType.FULL}
                                        variant={ButtonVariant.SECONDARY}
                                        title={'+ Wishlist'}
                                        onPress={() => { }}
                                        />
                                    <CustomButton
                                        // className="w-1/2"
                                        style={{ width: width * 0.45 }}
                                        title={'Details'}
                                        onPress={() => { }}
                                        type={ButtonType.FULL}
                                        variant={ButtonVariant.PRIMARY}
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
