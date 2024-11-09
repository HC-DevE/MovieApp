import React from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ButtonType, ButtonVariant, CustomButton } from '../../components/CustomButton';
import { LoginFormData } from '../../models/Login.model';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { CustomTextInput } from '../../components/CustomTextInput';

interface LoginScreenProps {
    navigation: NavigationProp<any, 'Login'>;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const { onLogin } = useAuth();
    const { isDarkMode } = useTheme();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: 'johndoe@example.com', //only for testing
            password: 'johndoe123',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        const result = await onLogin!(data);
        if (result && result.error) {
            console.log(result.msg);
        }
    };

    return (
        <View className={`flex-1 justify-between px-5 pt-16 pb-10 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <View className="mt-16">
                <Text className="text-3xl font-bold text-center text-primary mb-4">Login</Text>
                {/* <Text className="text-3xl font-bold text-primary text-center mb-4">
                    Create Account
                </Text> */}
                <Text className={`${isDarkMode ? 'text-white' : 'text-gray-500'} text-center`}>
                    Enter your email and password to login
                </Text>
            </View>

            <View className="flex-1 justify-center">
                <View className="mb-8">
                    <View className="mb-4">
                        <CustomTextInput
                            name="email"
                            placeholder="Email"
                            errors={errors}
                            register={register}
                            setValue={setValue}
                            options={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },
                            }}
                        />

                        {errors.email && (
                            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
                        )}
                    </View>

                    <View className="mb-4">
                        <CustomTextInput
                            name="password"
                            placeholder="Password"
                            errors={errors}
                            register={register}
                            setValue={setValue}
                            options={{
                                required: 'Password is required',
                            }}
                            secureTextEntry
                        />
                        {errors.password && (
                            <Text className="text-red-500 text-sm">{errors.password.message}</Text>
                        )}
                    </View>
                </View>

                <CustomButton title="Sign In" onPress={handleSubmit(onSubmit)} />
                <View className="flex-row justify-center items-center mt-4">
                    <Text className={`mr-2 ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text className="text-primary font-bold">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View className="items-center">
                <CustomButton
                    title="Forgot Password"
                    type={ButtonType.NAKED}
                    variant={ButtonVariant.PRIMARY}
                    onPress={() => navigation.navigate('ForgotPassword')}
                />
            </View>
        </View>
    );
};
