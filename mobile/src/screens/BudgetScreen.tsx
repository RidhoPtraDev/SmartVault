import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart, AlertTriangle } from 'lucide-react-native';
import { BubbleCard } from '../components/ui/BubbleCard';
import { useFinanceStore } from '../store/useFinanceStore';

export const BudgetScreen: React.FC = () => {
  const { budgets } = useFinanceStore();

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-12 pb-32" showsVerticalScrollIndicator={false}>
      <Text className="text-xl font-bold text-on-surface mb-4">Budget & Batas Pengeluaran</Text>

      {budgets.map((bgt) => {
        const percentage = Math.min(Math.round((bgt.currentAmount / bgt.amountLimit) * 100), 100);
        const isWarning = percentage >= 80;
        const isOver = percentage >= 100;

        return (
          <BubbleCard key={bgt.id} className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-base font-bold text-on-surface">{bgt.categoryName}</Text>
              <Text className={`text-xs font-bold ${isOver ? 'text-error' : isWarning ? 'text-amber-500' : 'text-primary'}`}>
                {percentage}%
              </Text>
            </View>

            {/* Progress Bar Pill */}
            <View className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
              <View
                className={`h-full rounded-full ${isOver ? 'bg-error' : isWarning ? 'bg-amber-500' : 'bg-primary'}`}
                style={{ width: `${percentage}%` }}
              />
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-xs text-on-surface-variant">
                Terpakai: Rp {bgt.currentAmount.toLocaleString('id-ID')}
              </Text>
              <Text className="text-xs font-semibold text-on-surface">
                Limit: Rp {bgt.amountLimit.toLocaleString('id-ID')}
              </Text>
            </View>

            {isWarning && (
              <View className="flex-row items-center mt-3 pt-2 border-t border-slate-100">
                <AlertTriangle size={14} color={isOver ? '#EF4444' : '#F59E0B'} />
                <Text className={`text-xs font-semibold ml-1.5 ${isOver ? 'text-error' : 'text-amber-600'}`}>
                  {isOver ? 'Limit budget telah terlampaui!' : 'Mendekati ambang batas budget (80%)'}
                </Text>
              </View>
            )}
          </BubbleCard>
        );
      })}
    </ScrollView>
  );
};
