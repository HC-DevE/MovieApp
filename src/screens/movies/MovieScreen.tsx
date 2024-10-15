import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon, { IconsName } from '../../components/CustomIcon';
import { Movie, MovieList } from '../../components/MovieList';
import { useRoute, useNavigation } from '@react-navigation/native';
import { images, MOVIES } from '../../constants';
import appTheme from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../../components/Cast';

export const MovieScreen = () => {
    const { params: movie } = useRoute();

    const navigation = useNavigation();
    const [isFav, setIsFav] = useState(false);
    const [cast, setCast] = useState([1, 2, 3, 4, 5]);
    const [similarMovies, setSimilarMovies] = useState(MOVIES.similarMovies);

    const height = appTheme.SIZES.screenHeight;
    const width = appTheme.SIZES.screenWidth;

    useEffect(() => {
        //api call
    }, [movie]);

    return (
        <ScrollView
            contentContainerClassName="pb-20"
            className="flex-1 bg-neutral-900"
        >
            <View className="w-full">
                {/* <Text>{movie?.title}</Text> */}
                <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
                    <CustomIcon className="bg-primary rounded-xl p-1" iconName={IconsName.ARROW_LEFT} iconColor={'white'} onPress={() => navigation.goBack()} />
                    <CustomIcon iconName={IconsName.HEART} iconColor={isFav === true ? 'red' : undefined} onPress={() => setIsFav(!isFav)} />
                </SafeAreaView>
                <View>
                    <Image source={images.STRANGER}
                        style={{ width: width, height: height * 0.55 }}
                    />
                    <LinearGradient
                        className="absolute bottom-0"
                        style={{
                            width: width,
                            height: height * 0.40,
                        }}
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
                </View>
            </View>
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                <Text className="text-white text-center text-3xl fond-bold tracking-wider">
                    {movie?.title}
                </Text>
                {/* status realease and duration/runtime */}
                <Text className="text-secondary text-center fond-semibold">
                    {movie?.title}
                </Text>
                {/* categry / genres */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    <Text className="text-secondary text-center fond-bold">
                        Action - Adventure - Drama
                    </Text>
                </View>

                {/* description */}
                <Text className="text-secondary mx-4 tracking-wide">
                    {movie?.description}
                </Text>
            </View>
            {/* cast members */}
            <Cast cast={cast} />
            {/* similar movies */}
            <MovieList title={'Similar Movies'} movies={similarMovies} />
        </ScrollView>
    );
};
