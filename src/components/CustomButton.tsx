import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { twMerge } from 'tailwind-merge';
// import appTheme from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  SUCCESS = 'success',
}

export enum ButtonType {
  FULL = 'full',
  NAKED = 'naked',
}

export const CustomButton = ({
  title,
  onPress,
  type = ButtonType.FULL,
  variant = ButtonVariant.PRIMARY,
  className,
  textClassName,
  size = ButtonSize.LARGE,
  disabled = false,
  loading = false,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const { isDarkMode } = useTheme();

  const baseClasses = 'rounded-md flex-row items-center justify-center';

  const sizeClasses: { [key in ButtonSize]: string } = {
    small: 'px-3 py-1.5',
    medium: 'px-4 py-2',
    large: 'px-6 py-3',
  };

  const disabledClasses = disabled ? 'opacity-50' : '';
  const fullWidthClasses = fullWidth ? 'w-full' : '';

  const getBackgroundColor = () => {
    if (type === ButtonType.NAKED) { return 'bg-transparent'; }
    switch (variant) {
      case ButtonVariant.PRIMARY:
        return 'bg-primary';
      case ButtonVariant.SECONDARY:
        return 'bg-secondary';
      case ButtonVariant.DANGER:
        return 'bg-red-500';
      case ButtonVariant.SUCCESS:
        return 'bg-green-500';
      default:
        return 'bg-primary';
    }
  };

  const getTextColor = () => {
    if (type === ButtonType.NAKED) {
      switch (variant) {
        case ButtonVariant.PRIMARY:
          return 'text-primary';
        case ButtonVariant.SECONDARY:
          return `${isDarkMode ? 'text-white' : 'text-black'}`;
        case ButtonVariant.DANGER:
          return 'text-red-500';
        case ButtonVariant.SUCCESS:
          return 'text-green-500';
        default:
          return 'text-primary';
      }
    } else {
      switch (variant) {
        case ButtonVariant.PRIMARY:
          return isDarkMode ? 'text-black' : 'text-white';
        case ButtonVariant.SECONDARY:
        case ButtonVariant.DANGER:
        case ButtonVariant.SUCCESS:
          return 'text-white';
        default:
          return isDarkMode ? 'text-black' : 'text-white';
      }
    }
  };

  const buttonClasses = twMerge(
    baseClasses,
    // type === ButtonType.FULL && sizeClasses[size],
    sizeClasses[size],
    getBackgroundColor(),
    disabledClasses,
    fullWidthClasses,
    className
  );

  const textClasses = twMerge(
    'font-semibold',
    getTextColor(),
    size === ButtonSize.SMALL ? 'text-sm' : size === ButtonSize.LARGE ? 'text-lg' : 'text-base',
    textClassName
  );

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      className={buttonClasses}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isDarkMode ? 'white' : 'black'} />
      ) : (
        <Text className={textClasses}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
