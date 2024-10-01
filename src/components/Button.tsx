import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { twMerge } from 'tailwind-merge';
import appTheme from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', className, textClassName }) => {
  const baseButtonStyles = 'py-3 px-6 rounded-lg justify-center items-center';
  const variantStyles = variant === 'primary' ? styles.primaryBg : variant === 'danger' ? styles.dangerBg : styles.secondaryBg;

  const baseTextStyles = 'text-base font-bold';
  const variantTextStyles = variant === 'primary' ? 'text-black' : 'text-white';

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
    backgroundColor: '#FF6F61',
  },
});

export default Button;
