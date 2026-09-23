import { ImageSourcePropType } from 'react-native';
import { LucideIcon, ShoppingBag } from 'lucide-react-native';

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
        title: 'Monthly Spending',
        category: 'Shopping',
        time: '14:30',
        amount: 68500,
        type: 'expense',
        imageSource: require('../../assets/shopping-icon.png'),
        iconBgColor: 'transparent',
        iconColor: '#8B5CF6',
      },
      {
        id: 'tx-today-2',
        title: 'Cashback',
        category: 'Income',
        time: '11:15',
        amount: 25000,
        type: 'income',
        imageSource: require('../../assets/income-icon.png'),
        iconBgColor: 'transparent',
        iconColor: '#06B6D4',
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
        imageSource: require('../../assets/shopping-icon.png'),
        iconBgColor: 'transparent',
        iconColor: '#8B5CF6',
      },
      {
        id: 'tx-yest-2',
        title: 'Salary',
        category: 'Income',
        time: '09:00',
        amount: 2500000,
        type: 'income',
        imageSource: require('../../assets/income-icon.png'),
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
        category: 'Bills',
        time: '16:45',
        amount: 75500,
        type: 'expense',
        imageSource: require('../../assets/bills-icon.png'),
        iconBgColor: 'transparent',
        iconColor: '#F59E0B',
      },
      {
        id: 'tx-may-2',
        title: 'Taxi Ride',
        category: 'Transport',
        time: '08:30',
        amount: 18400,
        type: 'expense',
        imageSource: require('../../assets/transport-icon.png'),
        iconBgColor: 'transparent',
        iconColor: '#0284C7',
      },
    ],
  },
];
