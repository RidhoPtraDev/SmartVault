import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle, G } from 'react-native-svg';
import { SpendingCategoryItem } from '../../constants/dashboardData';
import { formatIDR } from '../../utils/formatCurrency';

interface SpendingDonutChartProps {
  categories: SpendingCategoryItem[];
  totalSpent: number;
}

export const SpendingDonutChart: React.FC<SpendingDonutChartProps> = ({
  categories,
  totalSpent,
}) => {
  const size = 136;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate offsets for each slice
  let cumulativePercentage = 0;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          {categories.map((cat) => (
            <LinearGradient
              key={cat.id}
              id={`grad-${cat.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={cat.gradientStart} />
              <Stop offset="100%" stopColor={cat.gradientEnd} />
            </LinearGradient>
          ))}
        </Defs>

        {/* Rotated group starting at top (12 o'clock) */}
        <G transform={`rotate(-90 ${center} ${center})`}>
          {categories.map((cat) => {
            const strokeDasharray = `${(cat.percentage / 100) * circumference} ${
              circumference - (cat.percentage / 100) * circumference
            }`;
            const strokeDashoffset = -((cumulativePercentage / 100) * circumference);
            cumulativePercentage += cat.percentage;

            return (
              <Circle
                key={cat.id}
                cx={center}
                cy={center}
                r={radius}
                stroke={`url(#grad-${cat.id})`}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
                fill="transparent"
              />
            );
          })}
        </G>
      </Svg>

      {/* Centered text in cutout hole */}
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          width: size - strokeWidth * 2 - 4,
          height: size - strokeWidth * 2 - 4,
        }}
      >
        <Text style={{ fontSize: 11, color: '#94A3B8', fontWeight: '500' }}>Rp</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '800',
            color: '#0F172A',
            letterSpacing: -0.3,
            marginVertical: 0.5,
          }}
        >
          {formatIDR(totalSpent, false)}
        </Text>
        <Text style={{ fontSize: 10, color: '#94A3B8', fontWeight: '500' }}>Total Spent</Text>
      </View>
    </View>
  );
};
