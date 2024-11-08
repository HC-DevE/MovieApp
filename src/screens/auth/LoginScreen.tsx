import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ButtonType, ButtonVariant, CustomButton } from '../../components/CustomButton';
import { LoginFormData } from '../../models/Login.model';
import { useAuth } from '../../context/AuthContext';
import appTheme from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

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
            email: '',
            password: '',
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
            <Text className="text-2xl font-bold text-center text-primary mb-6">Login</Text>

            <View className="flex-1 justify-center">
                <View className="mb-8">
                    <View className="mb-4">
                        <TextInput
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            className={`border rounded-md px-3 py-2 mb-1 ${errors.email
                                ? 'border-red-500 text-red-500'
                                : 'border-primary text-primary'
                                }`}
                            placeholder="Email"
                            placeholderTextColor={errors.email ? 'red' : appTheme.COLORS.primary}
                            onChangeText={(value) => setValue('email', value)}
                        />

                        {errors.email && (
                            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
                        )}
                    </View>

                    <View className="mb-4">
                        <TextInput
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            className={`border rounded-md px-3 py-2 mb-1 ${errors.password
                                ? 'border-red-500 text-red-500'
                                : 'border-primary text-primary'
                                }`}
                            placeholder="Password"
                            placeholderTextColor={errors.password ? 'red' : appTheme.COLORS.primary}
                            onChangeText={(value) => setValue('password', value)}
                            secureTextEntry
                        />
                        {errors.password && (
                            <Text className="text-red-500 text-sm">{errors.password.message}</Text>
                        )}
                    </View>
                </View>

                <CustomButton title="Sign In" onPress={handleSubmit(onSubmit)} />
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
