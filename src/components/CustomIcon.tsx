import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntIconDesign from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

import { useTheme } from '../context/ThemeContext';

type IconProps = {
    onPress?: () => void;
    className?: string;
    iconName: IconsName;
    iconColor?: string;
    iconSize?: number;
}

export enum IconsName {
    ARROW_LEFT = 'arrowLeft',
    ARROW_RIGHT = 'arrowRight',
    HEART = 'heart',
    XMARK = 'close',
    SEARCH = 'search',
    STAR = 'star',
}

const CustomIcon = ({ onPress, className, iconColor, iconName, iconSize, ...props }: IconProps) => {

    const { isDarkMode } = useTheme();

    const getAntDesignIconName = (icon: string) => {
        switch (icon) {
            case IconsName.ARROW_LEFT:
                return 'arrowleft';
            case IconsName.ARROW_RIGHT:
                return 'arrowright';
            case IconsName.HEART:
                return 'heart'; //outlined
            case IconsName.XMARK:
                return 'closecircle'; //outlined: closecircleo
            case IconsName.SEARCH:
                return 'search1'; //outlined: closecircleo
            case IconsName.STAR:
                return 'star';
            default:
                return 'question';
        }
    };

    const getIconColorByTheme = () => {
        return isDarkMode ? 'white' : 'black';
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            className={className}
            {...props}
        >
            <AntIconDesign name={getAntDesignIconName(iconName)} color={iconColor ? iconColor : getIconColorByTheme()} size={iconSize || 26} />
        </TouchableOpacity>
    );
};

export default CustomIcon;
