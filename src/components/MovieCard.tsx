import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CustomIcon, { IconsName } from './CustomIcon';
import { useTheme } from '../context/ThemeContext';
import { MovieResult } from '../interfaces/movie.interface';
import { buildImageUrl } from '../../lib/api';


type RootStackParamList = {
    Movie: MovieResult;
};

type MovieCardProps = {
    movie: MovieResult;
    withVoteAverage: boolean;
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie, withVoteAverage }) => {
    const { isDarkMode } = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const textColor = isDarkMode ? 'text-white' : 'text-black';

    return (
        <TouchableOpacity className="mr-4" onPress={() => navigation.navigate('Movie', movie)}>
            <View
                className={`${withVoteAverage ? 'w-[128px] h-[180px]' : 'w-[120px] h-[160px]'} rounded-lg overflow-hidden`}
            >
                <Image
                    className={`${withVoteAverage ? 'w-[128px] h-[180px]' : 'w-[120px] h-[160px]'
                        } rounded-lg`}
                    source={{ uri: movie.poster_path ? buildImageUrl(movie.poster_path) : undefined }}
                    resizeMode="cover"
                />
                {withVoteAverage && (
                    <LinearGradient
                        className="absolute bottom-0 w-full px-3 py-2"
                        colors={
                            isDarkMode
                                ? ['rgba(34, 31, 30, 0)','rgba(34, 31, 30, 0.5)', 'rgba(34, 31, 30, 0.8)']
                                : ['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.8)']
                        }
                        angle={180}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text className={`text-xs font-semibold ${textColor} w-16`} numberOfLines={1}>
                                {movie.title.length > 13 ? `${movie.title.slice(0, 13)}...` : movie.title}
                            </Text>
                            <View className="flex-row items-center gap-1">
                                <CustomIcon iconName={IconsName.STAR} iconColor="yellow" iconSize={14} />
                                <Text className={`text-xs ${textColor}`}>{movie.vote_average.toFixed(1)}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                )}
            </View>
            {!withVoteAverage && (
                <Text className={`text-sm font-semibold mt-4 ${textColor} text-left`} numberOfLines={1}>
                    {movie.title.length > 16 ? `${movie.title.slice(0, 16)}...` : movie.title}
                </Text>
            )}
        </TouchableOpacity>
    );
};
