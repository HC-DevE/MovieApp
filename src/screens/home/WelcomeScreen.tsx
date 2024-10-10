import React from 'react';
import { View, Text, SafeAreaView, ImageBackground, ScrollView, Image } from 'react-native';
import { CustomButton, ButtonType, ButtonVariant } from '../../components/CustomButton';
import { images } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

interface WelcomeScreenProps {
    navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const { isDarkMode } = useTheme();

    const backgroundColorClassName = isDarkMode ? 'bg-black' : 'bg-white';
    const textColorClassName = isDarkMode ? 'text-white' : 'text-black';

    return (
        <SafeAreaView className={`h-full ${backgroundColorClassName}`}>
            <ScrollView contentContainerStyle={{
                height: '100%',
            }}>
                <View className="w-full h-full justify-end items-center">
                    <ImageBackground
                        // className="flex-1 justify-center h-full"
                        className="absolute w-full h-full"
                        source={images.STRANGER}
                        resizeMode="contain"
                    />
                    <View className=" flex-col w-full h-full justify-between items-center bg-[#141414da] backdrop-blur-xl blur-xl">
                        <View className="flex-1 flex-col w-full justify-center">
                            <Text className={`text-3xl text-center font-bold mt-2 ${textColorClassName}`}>Movie App</Text>
                            <Text className={`text-lg text-center mt-8 ${textColorClassName}`} >
                                Discover and explore your favorite movies
                            </Text>
                        </View>

                        <View className="flex-col w-full justify-end gap-3 px-10 my-10">
                            <CustomButton
                                title="Login"
                                type={ButtonType.FULL}
                                variant={ButtonVariant.PRIMARY}
                                onPress={() => navigation.navigate('Login')}
                            />
                            <CustomButton
                                title="Register"
                                type={ButtonType.FULL}
                                variant={ButtonVariant.PRIMARY}
                                onPress={() => navigation.navigate('Register')}
                            />

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
