import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';
import WelcomeScreen from '../screens/home/WelcomeScreen';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import appTheme from '../constants/theme';

const Stack = createNativeStackNavigator();

const HomeTab = createBottomTabNavigator();

const getTabBarIcon = (route: string, focused: boolean, color: string, size: number) => {
    let iconName;
    if (route === 'Home') {
        iconName = 'home';
        color = focused ? appTheme.COLORS.primary : 'gray';
    }

    return <AntDesignIcon name={iconName} size={size} color={color} />;
};

const HomeTabScreen = () => {
    return (
        <HomeTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route.name, focused, color, size),
                tabBarActiveTintColor: appTheme.COLORS.primary,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <HomeTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    // Vous pouvez ajouter d'autres options spécifiques à l'écran Home ici si nécessaire
                }}
            />
            {/* <HomeTab.Screen `
                name="Search" 
                component={SearchScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search" color={color} size={size} />
                    ),
                }}
            />
            <HomeTab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" color={color} size={size} />
                    ),
                }}
            />
            <HomeTab.Screen 
                name="Wishlist" 
                component={WishlistScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="heart" color={color} size={size} />
                    ),
                }}
            /> */}
        </HomeTab.Navigator>
    );
}

const StackNavigator = () => {
    const { authState, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{
                ...styles.loadingContainer,
            }}>
                <ActivityIndicator />
            </View>

        );
    }

    console.log({ authState });

    return (
        <Stack.Navigator>
            {authState?.authenticated ? (
                <Stack.Screen name="HomeTab" component={HomeTabScreen} options={{ headerShown: false }} />
            ) : (
                <>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} /> */}
                </>

            )}
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StackNavigator;
