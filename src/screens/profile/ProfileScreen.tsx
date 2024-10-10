import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { CustomButton, ButtonSize, ButtonType, ButtonVariant } from '../../components/CustomButton';

const ProfileScreen: React.FC = () => {
    const { onLogout } = useAuth();

    return (
        <ScrollView className="flex-1 bg-backgroundLight">
            {/* <View className="bg-primary p-8 items-center">
                <Text className="text-3xl font-bold text-black">Mon Profil</Text>
            </View> */}
            <View className="p-8">
                <Text className="text-xl font-bold text-black mt-8 mb-4">Informations personnelles</Text>
                <Text className="text-base text-black mb-4">Nom: John Doe</Text>
                <Text className="text-base text-black mb-4">Email: john.doe@example.com</Text>

                <Text className="text-xl font-bold text-black mt-8 mb-4">Paramètres</Text>
                <CustomButton
                    title="Modifier le profil"
                    onPress={() => {/* logique pour modifier le profil */ }}
                    className="my-4"
                    size={ButtonSize.LARGE}
                    type={ButtonType.NAKED}
                    variant={ButtonVariant.PRIMARY}
                />
                <CustomButton
                    title="Changer le mot de passe"
                    onPress={() => {/* logique pour changer le mot de passe */ }}
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

export default ProfileScreen;