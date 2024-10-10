import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LoginFormData } from '../../models/Login.model';
import { useAuth } from '../../context/AuthContext';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ButtonType, ButtonVariant, CustomButton } from '../../components/CustomButton';
// import ForgotPasswordScreen from './ForgotPasswordScreen';



interface LoginScreenProps {
    navigation: NavigationProp<any, 'Login'>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

    const [email, setEmail]: [string | null, Function] = useState('');
    const [password, setPassword]: [string | null, Function] = useState('');
    const { onLogin } = useAuth();

    const login = async () => {
        const result = await onLogin!({ email, password });
        if (result && result.error) {
            console.log(result.msg);
        }
    };


    const {
        control,
        // handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={
                                    (value) => {
                                        onChange(value);
                                        setEmail(value);
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
                                        setPassword(value);
                                    }
                                }
                                // onChangetext={
                                //     (text: string) => setPassword(text)
                                // }
                                value={value}
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                        )}
                        name="password"
                        rules={{
                            required: 'Password is required',
                        }}
                        defaultValue=""
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>

                <CustomButton title="Sign In" onPress={login} />
            </View>

            <View style={styles.forgotPasswordContainer}>
                <CustomButton
                    // textClassName="text-[#277dff]" //blue
                    title="Forgot Password"
                    type={ButtonType.NAKED}
                    variant={ButtonVariant.PRIMARY}
                    onPress={() => {
                        navigation.navigate('ForgotPassword');
                    }}
                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginBottom: 20,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        marginBottom: 30,
    },
    forgotPasswordContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        color: 'black',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});


export default LoginScreen;
