import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/config';
import { RegisterFormData } from '../models/Register.model.tsx';
import { LoginFormData } from '../models/Login.model';
import { storage } from '../../App.tsx';
// import AsyncStorage from "@react-native-async-storage/async-storage";


interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    isLoading?: boolean;
    onRegister?: (data: RegisterFormData) => Promise<any>;
    onLogin?: (data: LoginFormData) => Promise<any>;
    onLogout?: () => Promise<any>;
    onForgotPassword?: (data: { email: string }) => Promise<any>;
}

const TOKEN_KEY = process.env.TOKEN_KEY || 'token';
const FAKE_TOKEN = process.env.FAKE_TOKEN || 'fake_token';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean;
    }>({
        token: null,
        authenticated: false,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const checkToken = async () => {

            const token = await retrieveDataFromLocalStorage(TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                setAuthState({ token: token, authenticated: true });
            } else {
                setAuthState({ token: null, authenticated: false });
            }
        };
        checkToken();
    }, []);

    async function storeDataToLocalStorage(key: string, value: string) {
        try {
            const token = storage.set(key, value);
            // const token = FAKE_TOKEN;
            return token;
        } catch (e) {
            console.log('error storing the data in localstorage');
        }
    }

    async function retrieveDataFromLocalStorage(key: string) {
        try {
            const value = storage.getString(key);
            // const value = FAKE_TOKEN; //always authentificated
            if (value !== null) {
                return value;
            }
        } catch (e) {
            console.log('error retrieving the data from localstorage');
        }
    }

    async function removeDataFromLocalStorage(key: string) {
        try {
            const token = storage.delete(key);
            return token;
        } catch (e) {
            console.log('error removing the data from localstorage');
        }
    }

    const onRegister = async (data: RegisterFormData) => {
        setIsLoading(true);
        const { password, confirmPassword, ...newData } = data;
        // try {
        //     const response = await axios.post(`${API_URL}auth/register`, {
        //         ...newData,
        //         passwordHash: password,
        //     });
        //     setIsLoading(false);
        //     return response.data;
        // } catch (error: any) {
        //     setIsLoading(false);
        //     const responseData = error?.response?.data;
        //     return {
        //         error: responseData?.error,
        //         message: responseData?.message,
        //     };
        // }

        try {
            await storeDataToLocalStorage(TOKEN_KEY, FAKE_TOKEN);
            setAuthState({ token: FAKE_TOKEN, authenticated: true });
            return { token: FAKE_TOKEN };
        } catch (error: any) {
            console.log('Error during fake register:', error.message);
            return { error: error.message };
        }
        finally {
            setIsLoading(false);
        }
    };


    const onLogin = async (data: LoginFormData) => {
        setIsLoading(true);
        // try {
        //     const response = await axios.post(`${API_URL}auth/login`, {
        //         email: data.email,
        //         passwordHash: data.password,
        //     });
        //     // storeDataToLocalStorage(TOKEN_KEY, response.data.token);
        //     setAuthState({ token: response.data.token, authenticated: true });
        //     axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        //     // await AsyncStorage.setItem(TOKEN_KEY, response.data.token);
        //     setIsLoading(false);
        //     return response.data;
        // } catch (error: any) {
        //     setIsLoading(false);
        //     if (error.response) {
        //         console.log("Error during login:", error.response.data);
        //         return error.response.data;
        //     } else {
        //         console.log("Error during login:", error.message);
        //         return error.message;
        //     }
        // }

        try {
            await storeDataToLocalStorage(TOKEN_KEY, FAKE_TOKEN);
            setAuthState({ token: FAKE_TOKEN, authenticated: true });
            return { token: FAKE_TOKEN };
        } catch (error: any) {
            console.log('Error during fake login:', error.message);
            return { error: error.message };
        }
        finally {
            setIsLoading(false);
        }
    };

    const onLogout = async () => {

        removeDataFromLocalStorage(TOKEN_KEY);

        axios.defaults.headers.common.Authorization = '';

        setAuthState({ token: null, authenticated: false });
    };

    //forgotpassword
    const onForgotPassword = async (data: { email: string }) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}password/forgot-password`, {
                email: data.email,
            });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.log('Error during forgot password:', error.response.data);
                return error.response.data;
            } else {
                console.log('Error during forgot password:', error.message);
                return error.message;
            }
        } finally {
            setIsLoading(false);
        }
    };


    const value = {
        authState,
        isLoading,
        onRegister,
        onLogin,
        onLogout,
        onForgotPassword,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
