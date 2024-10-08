import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { twMerge } from 'tailwind-merge';
import appTheme from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  className?: string;
  textClassName?: string;
}

export enum ButtonVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DANGER = 'danger',
    NAKED = 'naked',
  }

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = ButtonVariant.PRIMARY, className, textClassName }) => {
  const baseButtonStyles = 'py-3 px-6 rounded-lg justify-center items-center';
  const variantStyles = variant === ButtonVariant.PRIMARY ? styles.primaryBg
    : variant === ButtonVariant.DANGER ? styles.dangerBg
    : variant === ButtonVariant.NAKED ? styles.nakedBg
    : styles.secondaryBg;

  const baseTextStyles = 'text-base font-bold';
  const variantTextStyles = (variant === ButtonVariant.PRIMARY || ButtonVariant.NAKED) ? appTheme.COLORS.primary : 'text-white';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={variantStyles}
      className={twMerge(baseButtonStyles, className)}
    >
      <Text className={twMerge(baseTextStyles, variantTextStyles, textClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryBg: {
    backgroundColor: appTheme.COLORS.primary,
  },
  secondaryBg: {
    backgroundColor: appTheme.COLORS.secondary,
  },
  dangerBg: {
    backgroundColor: appTheme.COLORS.danger,
  },
  nakedBg: {
    backgroundColor: 'transparent',
  },
});

export default Button;
