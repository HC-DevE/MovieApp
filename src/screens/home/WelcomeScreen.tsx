import React from 'react';
import { View, Text, SafeAreaView, ImageBackground } from 'react-native';
import Button from '../../components/Button';
import { images } from '../../constants';

interface WelcomeScreenProps {
    navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 justify-between items-center px-10 py-10">
            <View className="flex-1">
                <ImageBackground
                    className="flex-1 justify-center h-full"
                    source={images.STRANGER}
                    resizeMode="cover"
                />
                <Text className="text-3xl text-center font-bold mb-2 text-black">Movie App</Text>
                <Text className="text-lg text-center text-black mb-8">
                    Discover and explore your favorite movies
                </Text>
            </View>

            <View className="flex-col flex-1 w-full justify-end gap-3 px-10">
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                    className="bg-transparent py-4 rounded-full"
                    textClassName="text-white font-bold text-center text-lg"
                />
                <Button
                    title="Register"
                    onPress={() => navigation.navigate('Register')}
                    className="bg-transparent py-4 rounded-full"
                    textClassName="text-white font-bold text-center text-lg"
                />

            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
