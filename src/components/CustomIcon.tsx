import { TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

type IconProps = {
    onPress?: () => void;
    className?: string;
    iconName: IconsName;
}

export enum IconsName {
    ARROW_LEFT = 'arrowLeft',
    ARROW_RIGHT = 'arrowRight',
    HEART = 'heart',
}

const CustomIcon = ({ onPress, className, iconName, ...props }: IconProps) => {

    const getIconName = (icon: string) => {
        switch (icon) {
            case IconsName.ARROW_LEFT:
                return 'arrowleft';
            case IconsName.ARROW_RIGHT:
                return 'arrowright';
            case IconsName.HEART:
                return 'hearto'; //outlined
            default:
                return 'question';
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            className={className}
            {...props}
        >
            {/* {iconName === IconsName.ARROW_LEFT && <ChevronLeftIcon />}
            {iconName === IconsName.ARROW_LEFT && <HeartIcon />} */}
            <AntDesignIcon name={getIconName(iconName)} color={'black'} />
        </TouchableOpacity>
    );
};

export default CustomIcon;
