import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { CustomButton, ButtonSize, ButtonType, ButtonVariant } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';

export const ProfileScreen: React.FC = () => {
    const { onLogout } = useAuth();
    const { isDarkMode } = useTheme();

    return (
        <ScrollView className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <View className="p-8">
            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mt-8 mb-4`}>Informations personnelles</Text>
            <Text className={`text-base ${isDarkMode ? 'text-white' : 'text-black'} mb-4`}>Nom: John Doe</Text>
            <Text className={`text-base ${isDarkMode ? 'text-white' : 'text-black'} mb-4`}>Email: john.doe@example.com</Text>

            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mt-8 mb-4`}>Paramètres</Text><CustomButton
                    title="Modifier le profil"
                    onPress={() => {/* TODO */ }}
                    className="my-4"
                    size={ButtonSize.LARGE}
                    type={ButtonType.NAKED}
                    variant={ButtonVariant.PRIMARY}
                />
                <CustomButton
                    title="Changer le mot de passe"
                    onPress={() => {/* TODO */ }}
                    className="my-4"
                    size={ButtonSize.LARGE}
                    type={ButtonType.NAKED}
                    variant={ButtonVariant.PRIMARY}
                />
                <CustomButton
                    type={ButtonType.NAKED}
                    variant={ButtonVariant.DANGER}
                    title="Se déconnecter"
                    onPress={onLogout}
                    className="my-4 -mt-18"
                    size={ButtonSize.LARGE}
                />
            </View>
        </ScrollView>
    );
};