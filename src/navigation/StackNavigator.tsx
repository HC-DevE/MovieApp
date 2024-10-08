import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import WelcomeScreen from '../screens/home/WelcomeScreen';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import appTheme from '../constants/theme';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { icons } from '../constants';
import { TabIcon } from '../components/TabIcon';
import { useTheme } from '../context/ThemeContext';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AntIconDesign from 'react-native-vector-icons/AntDesign'; // AntDesignIcon


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const WelcomeStack = createNativeStackNavigator();
// const HomeTab = createBottomTabNavigator();

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

    console.log({color});

    return <TabIcon name={iconName} size={size} color={color} icon={iconSrc} focused={focused} />;
};

// const HomeTabScreen = () => {
//     return (
//         <HomeTab.Navigator
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route.name, focused, color, size),
//                 tabBarActiveTintColor: appTheme.COLORS.primary,
//                 tabBarInactiveTintColor: appTheme.COLORS.secondary, //#BFBFBF
//             })}
//         >
//             <HomeTab.Screen
//                 name="Home"
//                 component={HomeScreen}
//             // options={{
//             //     headerShown: false,
//             //     tabBarIcon: ({ focused }) => (
//             //         <TabIcon icon={icons.home} focused={focused} name='Home' color={focused ? appTheme.COLORS.primary : appTheme.COLORS.secondary}/>
//             //     ),
//             // }}
//             />

//             <HomeTab.Screen
//                 name="Search"
//                 component={ProfileScreen}
//             // options={{
//             //     headerShown: false,
//             //     tabBarIcon: ({ focused }) => (
//             //         <TabIcon icon={icons.search} focused={focused} name='Search' />
//             //     ),
//             // }}
//             />
//             <HomeTab.Screen
//                 name="Wishlist"
//                 component={ProfileScreen}
//             // options={{
//             //     headerShown: false,
//             //     tabBarIcon: ({ focused }) => (
//             //         <TabIcon icon={icons.bookmark} focused={focused} name='Wishlist' />
//             //     ),
//             // }}
//             />
//             <HomeTab.Screen
//                 name="Profile"
//                 component={ProfileScreen}
//             // options={{
//             //     headerShown: false,
//             //     tabBarIcon: ({ focused }) => (
//             //         <TabIcon icon={icons.profile} focused={focused} name='Profile' />
//             //     ),
//             // }}
//             />


//         </HomeTab.Navigator>
//     );
// };

// const WelcomeStackScreen = () => {
//     return (
//         <WelcomeStack.Navigator>
//             <WelcomeStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
//             <WelcomeStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//             <WelcomeStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
//             {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//             <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} /> */}
//         </WelcomeStack.Navigator>
//     );
// };

const AuthenticatedTabs = () => {
    const { isDarkMode } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route.name, focused, color, size),
                tabBarActiveTintColor: appTheme.COLORS.primary,
                tabBarInactiveTintColor: isDarkMode ? appTheme.COLORS.white : appTheme.COLORS.black,
                tabBarStyle: { backgroundColor: isDarkMode ? appTheme.COLORS.black : appTheme.COLORS.white },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            {/* <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} /> */}
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const UnauthenticatedStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
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
        authState?.authenticated ? <AuthenticatedTabs /> : <UnauthenticatedStack />
    );
};

export default StackNavigator;
