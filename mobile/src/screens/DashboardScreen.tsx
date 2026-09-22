import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ShieldCheck, Bell, ChevronRight, TrendingUp, Sparkles } from 'lucide-react-native';
import { HeroBalanceCard } from '../components/ui/HeroBalanceCard';
import { BubbleCard } from '../components/ui/BubbleCard';
import { TransactionRow } from '../components/ui/TransactionRow';
import { useFinanceStore } from '../store/useFinanceStore';
import { useAuthStore } from '../store/useAuthStore';

export const DashboardScreen: React.FC = () => {
  const { transactions, accounts, budgets } = useFinanceStore();
  const { user } = useAuthStore();

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-12 pb-32" showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
            Selamat Datang 👋
          </Text>
          <Text className="text-xl font-bold text-on-surface">
            {user?.name || 'SmartVault User'}
          </Text>
        </View>

        <View className="flex-row items-center space-x-2">
          {/* Trust Badge */}
          <View className="flex-row items-center bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <ShieldCheck size={14} color="#10B981" />
            <Text className="text-[11px] font-semibold text-tertiary ml-1">Secure</Text>
          </View>
        </View>
      </View>

      {/* Hero Balance Card */}
      <View className="mb-6">
        <HeroBalanceCard />
      </View>

      {/* AI Receipt Scanner Banner */}
      <BubbleCard className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <View className="flex-row items-center mb-1">
              <Sparkles size={16} color="#4F46E5" />
              <Text className="text-xs font-bold text-primary ml-1 uppercase tracking-wider">
                AI Receipt Scanner via WhatsApp
              </Text>
            </View>
            <Text className="text-xs text-on-surface-variant">
              Kirim foto struk belanja ke WhatsApp bot, transaksi otomatis terkonfirmasi.
            </Text>
          </View>
          <TouchableOpacity className="bg-primary px-3 py-2 rounded-full">
            <Text className="text-xs font-bold text-white">Scan Struk</Text>
          </TouchableOpacity>
        </View>
      </BubbleCard>

      {/* Accounts Summary */}
      <View className="mb-6">
        <Text className="text-base font-bold text-on-surface mb-3">Akun & Dompet</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row space-x-3">
          {accounts.map((acc) => (
            <View key={acc.id} className="bg-white p-4 rounded-2xl border border-slate-100 min-w-[140px] mr-3">
              <Text className="text-xs text-on-surface-variant font-medium">{acc.name}</Text>
              <Text className={`text-sm font-bold mt-1 ${acc.balance < 0 ? 'text-error' : 'text-on-surface'}`}>
                Rp {acc.balance.toLocaleString('id-ID')}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Recent Transactions */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-bold text-on-surface">Transaksi Terakhir</Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-xs font-semibold text-primary">Lihat Semua</Text>
            <ChevronRight size={14} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        <BubbleCard>
          {transactions.slice(0, 3).map((tx) => (
            <TransactionRow key={tx.id} transaction={tx} />
          ))}
        </BubbleCard>
      </View>
    </ScrollView>
  );
};
