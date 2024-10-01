import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';

const ProfileScreen: React.FC = () => {
    const { onLogout } = useAuth();

    return (
        <ScrollView className="flex-1 bg-backgroundLight">
            <View className="bg-primary p-8 items-center">
                <Text className="text-3xl font-bold text-black">Mon Profil</Text>
            </View>
            <View className="p-8">
                <Text className="text-xl font-bold text-black mt-8 mb-4">Informations personnelles</Text>
                <Text className="text-base text-black mb-4">Nom: John Doe</Text>
                <Text className="text-base text-black mb-4">Email: john.doe@example.com</Text>

                <Text className="text-xl font-bold text-black mt-8 mb-4">Paramètres</Text>
                <Button
                    title="Modifier le profil"
                    onPress={() => {/* logique pour modifier le profil */ }}
                    className="my-4"
                />
                <Button
                    title="Changer le mot de passe"
                    onPress={() => {/* logique pour changer le mot de passe */ }}
                    className="my-4"
                />
                <Button
                    variant="danger"
                    title="Se déconnecter"
                    onPress={onLogout}
                    className="my-4 -mt-18"
                />
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;