import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useAuth } from '../../context/AuthContext';
// import {CustomButton} from '../../components/CustomButton';
import { HeroCarousel } from '../../components/HeroCarousel';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryFilter } from '../../components/CategoryFilter';
import { AdBanner } from '../../components/AdBanner';
import { images, MOVIES } from '../../constants';
import { NavigationProp } from '@react-navigation/native';
import { MovieList } from '../../components/MovieList';
import { useTheme } from '../../context/ThemeContext';
// import { BlurView } from "@react-native-community/blur";

interface HomeScreenProps {
    // navigation: StackNavigationProp<any, 'Home'>;
    navigation: NavigationProp<any, 'Home'>;
}

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
                <CategoryFilter className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2 justify-center items-center mt-5 p-[2px] bg-[rgba(66,66,63,0.80)] rounded-[90px] backdrop-blur-[2px]" />
                {/* <BlurView
                    className="absolute"
                    // blurType="dark"
                    blurAmount={5}
                    reducedTransparencyFallbackColor="black"
                /> */}
                <HeroCarousel />
                <MovieList title={'Marvel Studios'} movies={MOVIES.marvelMovies} />
                <MovieList title={'Best Movies'} movies={MOVIES.bestMovies} />
                <AdBanner ad={ad} />
            </ScrollView>
        </SafeAreaView>
    );

};
