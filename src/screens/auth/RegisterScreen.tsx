import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../../components/CustomButton';
import { RegisterFormData, RegisterScreenProps } from '../../models/Register.model';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { CustomTextInput } from '../../components/CustomTextInput';
// import CustomIcon from '../../components/CustomIcon';

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const { onLogin, onRegister } = useAuth();
    const { isDarkMode } = useTheme();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        setValue,
    } = useForm<RegisterFormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const result = await onRegister!(data);
            if (result && result.token) {
                // Automatically log in after successful registration
                await onLogin!({
                    email: data.email,
                    password: data.password,
                });
            } else {
                console.log(result.message);
            }
        } catch (error) {
            console.error('Registration error', error);
        }
    };

    return (
        <ScrollView
            className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                paddingHorizontal: 20,
                paddingVertical: 40,
            }}
            keyboardShouldPersistTaps="handled"
        >
            <View className="mb-8">
                <Text className="text-3xl font-bold text-primary text-center mb-4">
                    Create Account
                </Text>
                <Text className={`${isDarkMode ? 'text-white' : 'text-gray-500'} text-center`}>
                    Sign up to get started
                </Text>
            </View>

            <View>

                <CustomTextInput
                    name="firstName"
                    placeholder="First Name"
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    options={{
                        required: 'First name is required',
                    }}
                />

                <CustomTextInput
                    name="lastName"
                    placeholder="Last Name"
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    options={{
                        required: 'Last name is required',
                    }}
                />


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

                {/* {renderInput('birthDate', 'Birth Date (YYYY-MM-DD)', {
                    pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/i,
                        message: 'Invalid birth date format',
                    },
                })} */}
                <CustomTextInput
                    name="birthDate"
                    placeholder="Birth Date (YYYY-MM-DD)"
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    options={{
                        pattern: {
                            value: /^\d{4}-\d{2}-\d{2}$/i,
                            message: 'Invalid birth date format',
                        },
                    }}
                />

                <CustomTextInput
                    name="password"
                    placeholder="Password"
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    options={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    }}
                    secureTextEntry
                />

                <CustomTextInput
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    options={{
                        required: 'Please confirm your password',
                        validate: (value: string) =>
                            value === getValues('password') || 'Passwords do not match',
                    }}
                    secureTextEntry
                />

                <CustomButton
                    title="Register"
                    onPress={handleSubmit(onSubmit)}
                    disabled={!watch('firstName') || !watch('email')}
                    className="mt-4"
                />

                <View className="flex-row justify-center items-center mt-4">
                    <Text className={`mr-2 ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="text-primary font-bold">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};
