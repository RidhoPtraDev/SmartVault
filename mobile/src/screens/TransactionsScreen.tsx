import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Search, Filter, Plus } from 'lucide-react-native';
import { BubbleCard } from '../components/ui/BubbleCard';
import { TransactionRow } from '../components/ui/TransactionRow';
import { InputField } from '../components/ui/InputField';
import { useFinanceStore } from '../store/useFinanceStore';

export const TransactionsScreen: React.FC = () => {
  const { transactions } = useFinanceStore();
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filtered = transactions.filter((tx) => {
    if (filterType === 'all') return true;
    return tx.type === filterType;
  });

  return (
    <View className="flex-1 bg-background px-4 pt-12 pb-32">
      <Text className="text-xl font-bold text-on-surface mb-4">Riwayat Transaksi</Text>

      <InputField
        placeholder="Cari transaksi atau catatan..."
        leadingIcon={<Search size={18} color="#777587" />}
      />

      {/* Chip Toggle Filter */}
      <View className="flex-row bg-slate-200 p-1 rounded-full mb-4">
        {(['all', 'income', 'expense'] as const).map((type) => {
          const isActive = filterType === type;
          const label = type === 'all' ? 'Semua' : type === 'income' ? 'Pemasukan' : 'Pengeluaran';
          return (
            <TouchableOpacity
              key={type}
              onPress={() => setFilterType(type)}
              className={`flex-1 py-2 rounded-full items-center ${isActive ? 'bg-primary' : ''}`}
            >
              <Text className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-600'}`}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <BubbleCard>
          {filtered.length > 0 ? (
            filtered.map((tx) => <TransactionRow key={tx.id} transaction={tx} />)
          ) : (
            <View className="py-8 items-center">
              <Text className="text-sm text-on-surface-variant font-medium">
                Belum ada transaksi pada kategori ini
              </Text>
            </View>
          )}
        </BubbleCard>
      </ScrollView>
    </View>
  );
};
