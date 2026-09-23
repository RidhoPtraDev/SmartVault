import { ImageSourcePropType } from 'react-native';

export type SubAccountType = 'all' | 'bank' | 'ewallet';

export interface AccountTransactionItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'expense' | 'income';
  imageSource?: ImageSourcePropType;
  iconBgColor: string;
  iconColor: string;
}

export interface AccountDateGroup {
  date: string;
  items: AccountTransactionItem[];
}

export interface SubAccountDetail {
  id: 'bank' | 'ewallet';
  label: string;
  shortLabel: string;
  balance: number;
  imageSource: ImageSourcePropType;
  bgColor: string;
  accentColor: string;
  transactionGroups: AccountDateGroup[];
}

export const MAIN_ACCOUNT_DATA = {
  id: 'acc-main',
  accountName: 'Akun Utama',
  totalBalance: 8540000,
  monthChips: ['Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
  activeMonth: 'Sep',
  subAccounts: {
    bank: {
      id: 'bank',
      label: 'Saldo Rekening',
      shortLabel: 'Rekening',
      balance: 5200000,
      imageSource: require('../../assets/saldo-rekening-icon.png'),
      bgColor: '#EEF2FF',
      accentColor: '#4F46E5',
      transactionGroups: [
        {
          date: '22 September 2026',
          items: [
            {
              id: 'tx-bank-1',
              title: 'Go Car',
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
          date: '18 September 2026',
          items: [
            {
              id: 'tx-bank-2',
              title: 'Electricity Bill',
              category: 'Bills',
              amount: 250000,
              type: 'expense',
              imageSource: require('../../assets/bills-icon.png'),
              iconBgColor: 'transparent',
              iconColor: '#F59E0B',
            },
          ],
        },
      ],
    } as SubAccountDetail,
    ewallet: {
      id: 'ewallet',
      label: 'Saldo E-Wallet',
      shortLabel: 'E-Wallet',
      balance: 3340000,
      imageSource: require('../../assets/saldo-ewallet-icon.png'),
      bgColor: '#F5F3FF',
      accentColor: '#0D9488',
      transactionGroups: [
        {
          date: '22 September 2026',
          items: [
            {
              id: 'tx-ewallet-1',
              title: 'Online Shopping',
              category: 'Shopping',
              amount: 120000,
              type: 'expense',
              imageSource: require('../../assets/shopping-icon.png'),
              iconBgColor: 'transparent',
              iconColor: '#8B5CF6',
            },
            {
              id: 'tx-ewallet-2',
              title: 'Go Jek',
              category: 'Transport',
              amount: 35000,
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
              id: 'tx-ewallet-3',
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
      ],
    } as SubAccountDetail,
  },
};
