import React from 'react';
import { ScrollView, View, SafeAreaView, useColorScheme } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useAuth } from '../../context/AuthContext';
// import {CustomButton} from '../../components/CustomButton';
import { HeroCarousel } from '../../components/HeroCarousel';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryFilter } from '../../components/CategoryFilter';
import { AdBanner } from '../../components/AdBanner';
import { images } from '../../constants';
import { NavigationProp } from '@react-navigation/native';
import { MovieList } from '../../components/MovieList';
import { useTheme } from '../../context/ThemeContext';

interface HomeScreenProps {
    // navigation: StackNavigationProp<any, 'Home'>;
    navigation: NavigationProp<any, 'Home'>;
}

const MOVIES = {
    marvelMovies: [
        {
            id: 1,
            title: 'Avengers',
            poster: images.AVENGERS,
            rating: 8.2,
        },
        {
            id: 2,
            title: 'SpiderHead',
            poster: images.FRAME,
            rating: 8.2,
        },
        {
            id: 4,
            title: 'Hawkeye',
            poster: images.HAWKEYE,
            rating: 7.9,
        },
        {
            id: 5,
            title: 'Thor',
            poster: images.THOR,
            rating: 7.9,
        },
    ],
    bestMovies: [
        {
            id: 1,
            title: 'Stranger Things',
            poster: images.STRANGER,
            rating: 9.2,
        },
        {
            id: 2,
            title: 'The Godfather',
            poster: images.GODFATHER,
            rating: 9.2,
        },
        {
            id: 3,
            title: 'The Dark Knight',
            poster: images.THOR,
            rating: 9.0,
        },
        {
            id: 4,
            title: '12 Angry Men',
            poster: images.SPIDERHEAD,
            rating: 9.0,
        },
    ],
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const { isDarkMode } = useTheme();

    const ad = {
        title: 'Black Friday is here !',
        description: 'Get 20% off on your first purchase Get 20% off on your first purchase Get 20% off on your first purchase',
        image: images.BLACKFRIDAY,
        onPress: () => navigation.navigate('OfferDetails'),
        className: 'm-4 p-4 rounded-lg',
    };

    return (
        <SafeAreaView
            className={`h-full items-center justify-between ${isDarkMode ? 'bg-black' : 'bg-white'}`}
        >
            <ScrollView>
                <CategoryFilter className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2 justify-center items-center mt-5 p-[2px] bg-[#42423fcc] rounded-full backdrop-blur-xl blur-xl" />
                <HeroCarousel />
                <MovieList title={'Marvel Studios'} movies={MOVIES.marvelMovies} />
                <MovieList title={'Best Movies'} movies={MOVIES.bestMovies} />
                <AdBanner ad={ad} />
            </ScrollView>
        </SafeAreaView>
    );

};
