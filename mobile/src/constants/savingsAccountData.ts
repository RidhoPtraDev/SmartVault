import { LucideIcon, Plus, Target, ArrowDown, QrCode, Gift } from 'lucide-react-native';

export interface SavingsQuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export interface SavingsTransactionItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export interface SavingsDateGroup {
  date: string;
  items: SavingsTransactionItem[];
}

export const SAVINGS_ACCOUNT_DATA = {
  id: 'acc-savings',
  accountName: 'Saving Account',
  balance: 10250000,
  quickActions: [
    {
      id: 'qa-tambah',
      label: 'Tambah Tabungan',
      icon: Plus,
      iconColor: '#4F46E5',
      bgColor: '#EEF2FF',
    },
    {
      id: 'qa-rencana',
      label: 'Lihat Rencana Tabungan',
      icon: Target,
      iconColor: '#4F46E5',
      bgColor: '#EEF2FF',
    },
  ] as SavingsQuickAction[],
  monthChips: ['Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
  activeMonth: 'Sep',
  transactionGroups: [
    {
      date: '22 September 2026',
      items: [
        {
          id: 'tx-sav-1',
          title: 'Auto-Debet Gaji Bulanan',
          category: 'Transfer Berkala Main Account',
          amount: 1500000,
          type: 'income',
          icon: ArrowDown,
          iconColor: '#10B981',
          iconBgColor: '#ECFDF5',
        },
        {
          id: 'tx-sav-2',
          title: 'Setoran Tabungan Mandiri',
          category: 'Setoran Manual via Bank / QRIS',
          amount: 500000,
          type: 'income',
          icon: QrCode,
          iconColor: '#4F46E5',
          iconBgColor: '#EEF2FF',
        },
      ],
    },
    {
      date: '19 September 2026',
      items: [
        {
          id: 'tx-sav-3',
          title: 'Bonus Kinerja & Cashback',
          category: 'Cashback Tabungan',
          amount: 750000,
          type: 'income',
          icon: Gift,
          iconColor: '#8B5CF6',
          iconBgColor: '#F5F3FF',
        },
      ],
    },
  ] as SavingsDateGroup[],
};

export const SAVINGS_PLAN_DATA = {
  targetAmount: 15000000,
  collectedAmount: 10250000,
  remainingAmount: 4750000,
  progressPercent: 68,
  goal: 'Dana Darurat & Investasi Masa Depan',
  estimatedMonth: 'Nov 2026',
  monthsLeft: 5,
  monthlyDeposit: 950000,
};
