import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Target, Plus } from 'lucide-react-native';
import { BubbleCard } from '../components/ui/BubbleCard';
import { PillButton } from '../components/ui/PillButton';
import { useFinanceStore } from '../store/useFinanceStore';

export const SavingsScreen: React.FC = () => {
  const { savingsGoals } = useFinanceStore();

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-12 pb-32" showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-on-surface">Target Tabungan</Text>
        <TouchableOpacity className="flex-row items-center bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
          <Plus size={14} color="#4F46E5" />
          <Text className="text-xs font-bold text-primary ml-1">Buat Target</Text>
        </TouchableOpacity>
      </View>

      {savingsGoals.map((goal) => {
        const percentage = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);

        return (
          <BubbleCard key={goal.id} className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-base font-bold text-on-surface">{goal.name}</Text>
              <Text className="text-xs font-bold text-tertiary">{percentage}%</Text>
            </View>

            {/* Progress Bar Pill */}
            <View className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
              <View
                className="h-full rounded-full bg-tertiary"
                style={{ width: `${percentage}%` }}
              />
            </View>

            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-xs text-on-surface-variant">
                Terkumpul: Rp {goal.currentAmount.toLocaleString('id-ID')}
              </Text>
              <Text className="text-xs font-semibold text-on-surface">
                Target: Rp {goal.targetAmount.toLocaleString('id-ID')}
              </Text>
            </View>

            <TouchableOpacity className="bg-emerald-50 py-2 rounded-full items-center border border-emerald-100">
              <Text className="text-xs font-bold text-tertiary">+ Tambah Dana Tabungan</Text>
            </TouchableOpacity>
          </BubbleCard>
        );
      })}
    </ScrollView>
  );
};
