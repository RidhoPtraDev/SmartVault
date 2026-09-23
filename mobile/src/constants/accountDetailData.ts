import { ImageSourcePropType } from 'react-native';
import { LucideIcon, Send, Wallet } from 'lucide-react-native';

export interface AccountQuickAction {
  id: string;
  label: string;
  imageSource?: ImageSourcePropType;
  icon?: LucideIcon;
  iconColor?: string;
  bgColor: string;
}

export interface AccountTransactionItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'expense' | 'income';
  imageSource?: ImageSourcePropType;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor: string;
}

export interface AccountDateGroup {
  date: string;
  items: AccountTransactionItem[];
}

export const MAIN_ACCOUNT_DATA = {
  id: 'acc-main',
  accountName: 'Main Account',
  balance: 8540000,
  quickActions: [
    {
      id: 'qa-bank',
      label: 'Saldo Rekening',
      imageSource: require('../../assets/saldo-rekening-icon.png'),
      bgColor: '#EEF2FF',
    },
    {
      id: 'qa-wallet',
      label: 'Saldo E-Wallet',
      imageSource: require('../../assets/saldo-ewallet-icon.png'),
      bgColor: '#F5F3FF',
    },
  ] as AccountQuickAction[],
  monthChips: ['Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
  activeMonth: 'Sep',
  transactionGroups: [
    {
      date: '22 September 2026',
      items: [
        {
          id: 'tx-main-1',
          title: 'Online Shopping',
          category: 'Shopping',
          amount: 120000,
          type: 'expense',
          imageSource: require('../../assets/shopping-icon.png'),
          iconBgColor: 'transparent',
          iconColor: '#8B5CF6',
        },
        {
          id: 'tx-main-2',
          title: 'Go Jek',
          category: 'Transport',
          amount: 500000,
          type: 'expense',
          imageSource: require('../../assets/transport-icon.png'),
          iconBgColor: 'transparent',
          iconColor: '#3B82F6',
        },
      ],
    },
    {
      date: '19 September 2026',
      items: [
        {
          id: 'tx-main-3',
          title: 'Makan',
          category: 'Food & Drink',
          amount: 45000,
          type: 'expense',
          imageSource: require('../../assets/food-icon.png'),
          iconBgColor: 'transparent',
          iconColor: '#F97316',
        },
      ],
    },
  ] as AccountDateGroup[],
};
