import React from 'react';
import { View, Text } from 'react-native';
import { Utensils, Car, ShoppingBag, Receipt, Film, Wallet, ArrowRightLeft } from 'lucide-react-native';
import { Transaction } from '../../types';

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils size={20} color="#F97316" />;
      case 'Car':
        return <Car size={20} color="#3B82F6" />;
      case 'ShoppingBag':
        return <ShoppingBag size={20} color="#8B5CF6" />;
      case 'Film':
        return <Film size={20} color="#10B981" />;
      case 'Wallet':
        return <Wallet size={20} color="#10B981" />;
      default:
        return <Receipt size={20} color="#6366F1" />;
    }
  };

  const isIncome = transaction.type === 'income';
  const isExpense = transaction.type === 'expense';

  return (
    <View className="flex-row items-center justify-between py-3 border-b border-slate-100">
      <View className="flex-row items-center flex-1 pr-3">
        {/* Icon Pod 44px (rounded-sm squircle) */}
        <View className="w-[44px] h-[44px] rounded-xl bg-slate-100 items-center justify-center mr-3">
          {getIcon(transaction.categoryIcon)}
        </View>

        <View className="flex-1">
          <Text className="text-sm font-semibold text-on-surface numberOfLines={1}">
            {transaction.note || transaction.categoryName}
          </Text>
          <Text className="text-xs text-on-surface-variant">
            {transaction.accountName} • {transaction.transactionDate}
            {transaction.source === 'ai_scan' ? ' (WA Scan ✨)' : ''}
          </Text>
        </View>
      </View>

      <Text
        className={`text-sm font-bold ${
          isIncome ? 'text-tertiary' : isExpense ? 'text-on-surface' : 'text-primary'
        }`}
      >
        {isIncome ? '+' : isExpense ? '-' : ''} Rp {transaction.amount.toLocaleString('id-ID')}
      </Text>
    </View>
  );
};
