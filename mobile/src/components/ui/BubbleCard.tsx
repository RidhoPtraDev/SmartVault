import React from 'react';
import { View, ViewProps } from 'react-native';

interface BubbleCardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export const BubbleCard: React.FC<BubbleCardProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <View
      className={`bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 ${className}`}
      style={[{ shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 2 }, style]}
      {...props}
    >
      {children}
    </View>
  );
};
