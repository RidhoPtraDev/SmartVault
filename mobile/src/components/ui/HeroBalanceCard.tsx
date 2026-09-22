import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react-native';
import { useFinanceStore } from '../../store/useFinanceStore';

export const HeroBalanceCard: React.FC = () => {
  const { netWorth, hideBalance, toggleHideBalance } = useFinanceStore();

  const formatCurrency = (val: number) => {
    if (hideBalance) return 'Rp ••••••••';
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <View
      className="bg-primary rounded-[28px] p-6 shadow-xl shadow-indigo-500/30 overflow-hidden relative"
      style={{
        backgroundColor: '#4F46E5',
      }}
    >
      {/* Background glow decorator */}
      <View className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-secondary/30 blur-2xl" />

      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-indigo-200 text-xs font-semibold uppercase tracking-wider">
          Total Net Worth
        </Text>
        <TouchableOpacity onPress={toggleHideBalance} className="p-1">
          {hideBalance ? (
            <EyeOff size={18} color="#DAD7FF" />
          ) : (
            <Eye size={18} color="#DAD7FF" />
          )}
        </TouchableOpacity>
      </View>

      <Text className="text-white text-3xl font-bold tracking-tight mb-6">
        {formatCurrency(netWorth)}
      </Text>

      {/* Action Shortcut Buttons */}
      <View className="flex-row justify-between pt-4 border-t border-indigo-400/30">
        <TouchableOpacity className="flex-row items-center bg-white/15 px-4 py-2.5 rounded-full">
          <ArrowDownLeft size={16} color="#10B981" />
          <Text className="text-white text-xs font-semibold ml-2">Pemasukan</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white/15 px-4 py-2.5 rounded-full">
          <ArrowUpRight size={16} color="#EF4444" />
          <Text className="text-white text-xs font-semibold ml-2">Pengeluaran</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white/15 px-4 py-2.5 rounded-full">
          <RefreshCw size={16} color="#06B6D4" />
          <Text className="text-white text-xs font-semibold ml-2">Transfer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
