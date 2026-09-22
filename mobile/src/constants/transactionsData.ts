import { ImageSourcePropType } from 'react-native';
import { LucideIcon, Zap } from 'lucide-react-native';

export interface GroupedTransactionItem {
  id: string;
  title: string;
  category: string;
  time: string;
  amount: number;
  type: 'expense' | 'income';
  icon?: LucideIcon;
  imageSource?: ImageSourcePropType;
  iconBgColor: string;
  iconColor: string;
}

export interface DateGroupedTransactions {
  dateGroup: string;
  count: number;
  items: GroupedTransactionItem[];
}

export const TRANSACTION_GROUPS: DateGroupedTransactions[] = [
  {
    dateGroup: 'Today',
    count: 2,
    items: [
      {
        id: 'tx-today-1',
        title: 'Grocery Store',
        category: 'Grocery',
        time: '14:30',
        amount: 68500,
        type: 'expense',
        imageSource: require('../../assets/grocery-icon.png'),
        iconBgColor: '#DCFCE7',
        iconColor: '#059669',
      },
      {
        id: 'tx-today-2',
        title: 'Cashback Received',
        category: 'Rewards',
        time: '11:15',
        amount: 25000,
        type: 'income',
        imageSource: require('../../assets/cashback-icon.png'),
        iconBgColor: 'transparent',
        iconColor: '#10B981',
      },
    ],
  },
  {
    dateGroup: 'Yesterday',
    count: 2,
    items: [
      {
        id: 'tx-yest-1',
        title: 'Online Shopping',
        category: 'Shopping',
        time: '18:20',
        amount: 120000,
        type: 'expense',
        imageSource: require('../../assets/online-shopping-icon.png'),
        iconBgColor: 'transparent',
        iconColor: '#7C3AED',
      },
      {
        id: 'tx-yest-2',
        title: 'Salary',
        category: 'Income',
        time: '09:00',
        amount: 2500000,
        type: 'income',
        imageSource: require('../../assets/salary-icon.png'),
        iconBgColor: 'transparent',
        iconColor: '#059669',
      },
    ],
  },
  {
    dateGroup: '22 May 2024',
    count: 2,
    items: [
      {
        id: 'tx-may-1',
        title: 'Electricity Bill',
        category: 'Utilities',
        time: '16:45',
        amount: 75500,
        type: 'expense',
        icon: Zap,
        iconBgColor: '#FEF3C7',
        iconColor: '#D97706',
      },
      {
        id: 'tx-may-2',
        title: 'Taxi Ride',
        category: 'Transport',
        time: '08:30',
        amount: 18400,
        type: 'expense',
        imageSource: require('../../assets/taxi-icon.png'),
        iconBgColor: 'transparent',
        iconColor: '#0284C7',
      },
    ],
  },
];
