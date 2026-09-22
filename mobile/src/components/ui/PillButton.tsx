import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

interface PillButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const PillButton: React.FC<PillButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary text-white';
      case 'ghost':
        return 'bg-indigo-50 border border-indigo-100';
      case 'primary':
      default:
        return 'bg-primary shadow-lg shadow-indigo-500/40';
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'ghost':
        return 'text-primary font-semibold';
      case 'secondary':
      case 'primary':
      default:
        return 'text-white font-bold';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={disabled}
      className={`h-[56px] rounded-full flex-row items-center justify-center px-6 ${getContainerStyle()} ${disabled ? 'opacity-50' : ''}`}
      style={style}
    >
      {icon && <TouchableOpacity className="mr-2">{icon}</TouchableOpacity>}
      <Text className={`text-base font-semibold ${getTextStyle()}`} style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
