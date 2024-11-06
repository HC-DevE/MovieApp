import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appTheme from '../constants/theme';
import { MovieResult } from '../interfaces/movie.interface';
import { buildImageUrl } from '../../lib/api';
import { icons } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CustomIcon, { IconsName } from './CustomIcon';

type RootStackParamList = {
    Movie: MovieResult;
};

export const MovieBox: React.FC<{ movie: MovieResult }> = ({ movie }) => {
    const { isDarkMode } = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const backgroundColor = 'bg-transparent';

    return (
        <TouchableOpacity className={`mr-3 ${backgroundColor}`} onPress={() => navigation.navigate('Movie', movie)}>
            <View style={styles.parent}>
                <Image style={styles.icon} resizeMode="cover" src={buildImageUrl(movie?.poster_path)} />
                <LinearGradient style={styles.frameWrapper} locations={[0, 1]} colors={['rgba(34, 31, 30, 0)', 'rgba(34, 31, 30, 0.5)']} useAngle={true} angle={180}>
                    <View style={[styles.movieNameParent, styles.parentFlexBox]}>
                        <Text style={[styles.movieName, styles.textTypo]}>{movie.title.slice(0, 15) + "..."}</Text>
                        <View style={[styles.starParent, styles.parentFlexBox]}>
                            <CustomIcon iconName={IconsName.STAR} iconColor={appTheme.COLORS.primary} iconSize={12} />
                            <Text style={[styles.text, styles.textTypo]}>{movie.vote_average.toFixed(1)}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    parentFlexBox: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    textTypo: {
        color: appTheme.COLORS.white,
        fontWeight: '600',
        fontSize: appTheme.FONTS.tiny,
    },
    icon: {
        maxHeight: '100%',
        width: 128,
        zIndex: 0,
        flex: 1,
    },
    movieName: {
        textAlign: 'left',
        width: 64,
        height: 12,
        overflow: 'hidden',
    },
    frameChild: {
        borderRadius: 1,
        width: 14,
        height: 14,
    },
    text: {
        textAlign: 'right',
    },
    starParent: {
        gap: 2,
    },
    movieNameParent: {
        width: 104,
        justifyContent: 'space-between',
    },
    frameWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    parent: {
        borderRadius: 8,
        width: '100%',
        height: 180,
        overflow: 'hidden',
        flex: 1,
    }
});
