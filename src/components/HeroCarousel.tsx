import React from 'react';
import { View, Image, Text, useColorScheme } from 'react-native';
import Swiper from 'react-native-swiper';
import { images } from '../constants';
import Button, { ButtonVariant } from './Button';

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

export const HeroCarousel = ({ className }: {className: string}) => {
    const colorScheme = useColorScheme();

    return (
        <View className={`${className}`}>
            <Swiper
                loop
                autoplay
                dot={<View className="w-2 h-2 bg-gray-500 rounded-full mx-1" />}
                activeDot={<View className="w-2 h-2 bg-white rounded-full mx-1" />}
            >
                {heroItems.map((item, index) => (
                    <View key={index} className="flex-1 w-full h-full">
                        <Image
                            source={item.image}
                            className="w-full h-full"
                            resizeMode="cover" //contain
                        />
                        <View className={`absolute z-10 bottom-0 left-0 p-2 w-full shadow-sm ${colorScheme === 'dark' ? 'shadow-white' : 'shadow-black'}`}>
                            <Text>My List</Text>
                            <Text>Discover</Text>
                            <View className="w-full flex-row items-center justify-between gap-2">
                                <Button
                                    className="w-1/2"
                                    variant={ButtonVariant.SECONDARY}
                                    title={'+ Wishlist'}
                                    onPress={() => { }}
                                />
                                <Button
                                    className="w-1/2"
                                    textClassName="text-black"
                                    title={'Details'}
                                    onPress={() => { }}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </Swiper>
        </View>
    );
};
