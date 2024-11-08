import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { WelcomeScreen } from '../screens/home/WelcomeScreen';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import appTheme from '../constants/theme';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { icons } from '../constants';
import { TabIcon } from '../components/TabIcon';
import { useTheme } from '../context/ThemeContext';
import { SearchScreen } from '../screens/search/SearchScreen';
import { WishlistScreen } from '../screens/wishlist/WishlistScreen';
import { MovieScreen } from '../screens/movies/MovieScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
// import { MovieScreen } from '../screens/movies/MovieScreen';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AntIconDesign from 'react-native-vector-icons/AntDesign'; // AntDesignIcon


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getTabBarIcon = (route: string, focused: boolean, color: string, size: number) => {
    let iconName;
    let iconSrc;

    color = focused ? appTheme.COLORS.primary : appTheme.COLORS.secondary;

    switch (route) {
        case 'Home':
            iconName = 'Home';
            iconSrc = icons.home;
            break;
        case 'Profile':
            iconName = 'Profile';
            iconSrc = icons.profile;
            break;
        case 'Search':
            iconName = 'Search';
            iconSrc = icons.search;
            break;
        case 'Wishlist':
            iconName = 'Wishlist';
            iconSrc = icons.bookmark;
            break;
        default:
            iconName = 'Home';
            iconSrc = icons.home;
    }

    return <TabIcon name={iconName} size={size} color={color} icon={iconSrc} focused={focused} />;
};

const AuthenticatedTabs = () => {
    const { isDarkMode } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route.name, focused, color, size),
                tabBarActiveTintColor: appTheme.COLORS.primary,
                tabBarInactiveTintColor: isDarkMode ? appTheme.COLORS.white : appTheme.COLORS.black,
                tabBarStyle: {
                    backgroundColor: isDarkMode ? appTheme.COLORS.black : appTheme.COLORS.white,
                    borderTopColor: 'transparent',
                    borderTopWidth: 0,
                    height: 84,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const UnauthenticatedStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
        </Stack.Navigator>
    );
};

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthenticatedTabs" component={AuthenticatedTabs} />
            <Stack.Screen name="Movie" component={MovieScreen} />
        </Stack.Navigator>
    );
};

const StackNavigator = () => {
    const { authState, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator />
            </View>

        );
    }

    return (
        // <Stack.Navigator>
        //     {authState?.authenticated ? (
        //         <Stack.Screen name="HomeTab" component={HomeTabScreen} options={{ headerShown: false }} />
        //     ) : (
        //         <Stack.Screen name="WelcomeStack" component={WelcomeStackScreen} options={{ headerShown: false }} />
        //     )}
        // </Stack.Navigator>
        authState?.authenticated ? <MainStack /> : <UnauthenticatedStack />
    );
};

export default StackNavigator;
