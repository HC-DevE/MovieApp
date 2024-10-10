import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import appTheme from '../../constants/theme';
import {CustomButton} from '../../components/CustomButton';
import { RegisterFormData, RegisterScreenProps } from '../../models/Register.model';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {

    const [data, setData]: [any, Function] = useState('');
    // const { register, handleSubmit, errors } = useForm<RegisterFormData>();
    const { onLogin, onRegister } = useAuth();
    const { control, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();

    const login = async () => {
        const result = await onLogin!({
            email: data.email,
            password: data.password
        });
        if (result && result.error) {
            console.log(result.msg);
        }
    };

    const register = async (data: RegisterFormData) => {
        const result = await onRegister!(data);
        if (result && result.message !== 'User created successfully') {
            console.log(result.message);
        } else {
            login();
        }
    };




    return (
        <View style={styles.container}>
            <Text style={appTheme.STYLES.subtitle as any}>Register</Text>

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={
                            (firstName) => {
                                setData({
                                    ...data,
                                    firstName: firstName,
                                });
                            }
                        }
                        value={data.firstName}
                        placeholder="First Name"
                    />
                )}
                name="firstName"
                defaultValue=""
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={
                            (value) => {
                                onChange(value);
                                setData({
                                    ...data,
                                    lastName: value,
                                })
                            }
                        }
                        value={value}
                        placeholder="Last Name"
                    />
                )}
                name="lastName"
                defaultValue=""
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={
                            (value) => {
                                onChange(value);
                                setData({
                                    ...data,
                                    email: value
                                })
                            }
                        }
                        value={value}
                        placeholder="Email"
                    />
                )}
                name="email"
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                    },
                }}
                defaultValue=""
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={
                            (value) => {
                                onChange(value);
                                setData({
                                    ...data,
                                    birthDate: value,
                                })
                            }
                        }
                        value={value}
                        placeholder="Birth Date"
                    />
                )}
                name="birthDate"
                rules={{
                    pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/i,
                        message: 'Invalid birth date',
                    },
                }}
                defaultValue=""
            />
            {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate.message}</Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={
                            (value) => {
                                onChange(value);
                                setData({
                                    ...data,
                                    password: value
                                });
                            }
                        }

                        value={value}
                        placeholder="Password"
                        secureTextEntry
                    />
                )}
                name="password"
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                    },
                }}
                defaultValue=""
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={
                            (value) => {
                                onChange(value);
                                setData({
                                    ...data,

                                });
                            }
                        }
                        value={value}
                        placeholder="Confirm Password"
                        secureTextEntry
                    />
                )}
                name="confirmPassword"
                rules={{
                    required: 'Please confirm your password',
                    validate: value =>
                        value === watch('password') || 'Passwords do not match',
                }}

                defaultValue=""
            />
            {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
            )}

            <CustomButton
                title="Register"
                onPress={handleSubmit(register)}
                color={''}
                disabled={watch('firstName') && watch('email') ? false : true} />
            <CustomButton
                title="Back to Login"
                onPress={() => navigation.navigate('Login')}
                color={''}
                disabled={false} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 8,
        color: 'black',
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    }
});

export default RegisterScreen;