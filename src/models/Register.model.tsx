import { NavigationProp } from '@react-navigation/native';

export interface RegisterFormData {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    birthDate?: string;
    gender?: string;
    preferences?: string;
}

export interface RegisterScreenProps {
    navigation: NavigationProp<any, 'Register'>;
}
