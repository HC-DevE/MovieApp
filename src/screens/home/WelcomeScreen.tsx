import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';



interface WelcomeScreenProps {
    // navigation: StackNavigationProp<any, 'Welcome'>;
    navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Movie App</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Register"
                    onPress={() => { navigation.navigate('Register'); }}
                    style={styles.button}
                />
                <Button
                    title="Login"
                    onPress={() => { navigation.navigate('Login'); }}
                    style={styles.button}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginHorizontal: 8,
    },
});

export default WelcomeScreen;
