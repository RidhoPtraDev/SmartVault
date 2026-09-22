import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  leadingIcon,
  ...props
}) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 ml-4">
          {label}
        </Text>
      )}
      <View className="h-[56px] bg-surface-low rounded-full px-5 flex-row items-center border border-transparent focus:border-primary/40 focus:bg-white">
        {leadingIcon && <View className="mr-3 text-outline">{leadingIcon}</View>}
        <TextInput
          className="flex-1 text-base text-on-surface font-normal h-full"
          placeholderTextColor="#777587"
          {...props}
        />
      </View>
      {error && <Text className="text-xs text-error mt-1 ml-4">{error}</Text>}
    </View>
  );
};
