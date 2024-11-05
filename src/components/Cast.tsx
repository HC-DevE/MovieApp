import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '../constants';

type Cast = {
    cast: string[];
    crew: string[];
    id: number;
    name: string;
    profile_path: string;
    character: string;
    job: string;
    department: string;
}

const Cast = ({ cast }) => {
    const characterName = 'test test';
    const personName = 'test test';

    // console.log({cast});

    return (
        <View>
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4"
            >
                {cast && cast.map((person, index) => {
                    <TouchableOpacity key={index} className="mr-4 items-center">
                        <Image source={images.STRANGER}
                            className="w-20 h-24 rounded-2xl"
                        />
                        <Text className="text-white text-xs mt-1">
                            {
                                characterName.length > 10 ? characterName.slice(0, 10) + '...' : characterName
                            }
                        </Text>
                        <Text className="text-secondary text-xs mt-1">
                            {
                                personName.length > 10 ? personName.slice(0, 10) + '...' : characterName
                            }
                        </Text>
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    );
};

export default Cast;
