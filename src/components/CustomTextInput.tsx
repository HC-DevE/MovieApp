import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { RegisterFormData } from '../models/Register.model';
import { useTheme } from '../context/ThemeContext';

interface CustomTextInputProps {
    name: keyof RegisterFormData;
    placeholder: string;
    secureTextEntry?: boolean;
    errors: any;
    register: any;
    setValue: any;
    options?: any;
    props?: any;
}

export const CustomTextInput = ({
    name, placeholder, secureTextEntry, errors, register, setValue, options, props,
}: CustomTextInputProps) => {
    const { isDarkMode } = useTheme();

    return (
        <View className="mb-4">
            <View
                className={`border rounded-lg flex-row items-center px-3 py-2 ${errors[name]
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-primary'
                    }`}>
                <TextInput
                    {...register(name, options)}
                    placeholder={placeholder}
                    placeholderTextColor="gray"
                    secureTextEntry={secureTextEntry}
                    className={`flex-1 ${isDarkMode ? 'text-white' : 'text-black'}`}
                    onChangeText={value => setValue(name, value)}
                    {...props}
                />
            </View>
            {errors[name] && (
                <Text className="text-red-500 text-xs mt-1">
                    {errors[name]?.message as string}
                </Text>
            )}
        </View>
    );
};
