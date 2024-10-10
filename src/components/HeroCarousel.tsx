import React, { useRef } from 'react';
import { View, Image, Text, useColorScheme } from 'react-native';
import Swiper from 'react-native-swiper';
import { images } from '../constants';
import { CustomButton, ButtonType, ButtonVariant } from './CustomButton';

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

export const HeroCarousel = ({ className }: { className: string }) => {
    const colorScheme = useColorScheme();
    const swiperRef = useRef<Swiper>(null);

    return (
        <View className={`${className}`}>
            <Swiper
                ref={swiperRef}
                loop
                autoplay
                dot={<View
                        style={{
                        height: 4,
                        width: 4,
                    }} 
                    className="w-2 h-2 bg-[#F2F2F7] rounded-full mx-1" />}
                activeDot={<View
                        style={{
                        height: 4,
                        width: 4,
                    }} 
                    className="w-2 h-2 bg-primary rounded-full mx-1" />}
                paginationStyle={{
                    bottom: -10
                }}
            >
                {heroItems.map((item, index) => (
                    <View key={index} className="flex items-center justify-center">
                        <Image
                            source={item.image}
                            className="w-full h-full"
                            resizeMode="cover" //contain
                        />
                        <View className={`absolute z-10 bottom-0 left-0 p-2 w-full shadow-sm ${colorScheme === 'dark' ? 'shadow-white' : 'shadow-black'}`}>
                            <Text>My List</Text>
                            <Text>Discover</Text>
                            <View className="w-full flex-row items-center justify-between gap-2">
                                <CustomButton
                                    className="w-1/2"
                                    type={ButtonType.FULL}
                                    variant={ButtonVariant.SECONDARY}
                                    title={'+ Wishlist'}
                                    onPress={() => { }}
                                />
                                <CustomButton
                                    className="w-1/2"
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
    );
};
