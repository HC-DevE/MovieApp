import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon, { IconsName } from '../../components/CustomIcon';
import { Movie } from '../../components/MovieList';

export const MovieScreen = (movie: Movie) => {
    return (
        <ScrollView
            contentContainerClassName="pb-20"
            className="flex-1 bg-neutral-900"
        >
            <View className="w-full">
                <SafeAreaView>
                    <CustomIcon iconName={IconsName.ARROW_LEFT} />
                </SafeAreaView>
                <Text>{movie.title}</Text>

            </View>
        </ScrollView>
    );
};
