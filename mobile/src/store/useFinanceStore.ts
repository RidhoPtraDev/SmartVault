import { create } from 'zustand';
import { Account, Transaction, Budget, SavingsGoal } from '../types';

interface FinanceState {
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  netWorth: number;
  hideBalance: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleHideBalance: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

const mockAccounts: Account[] = [
  { id: 'acc-1', userId: 'usr-1', name: 'BCA Utama', type: 'bank', balance: 14500000 },
  { id: 'acc-2', userId: 'usr-1', name: 'GoPay', type: 'e-wallet', balance: 850000 },
  { id: 'acc-3', userId: 'usr-1', name: 'Tunai Dompet', type: 'cash', balance: 350000 },
  { id: 'acc-4', userId: 'usr-1', name: 'Mandiri KK', type: 'credit_card', balance: -1200000 },
];

const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    userId: 'usr-1',
    accountId: 'acc-2',
    accountName: 'GoPay',
    categoryId: 'cat-food',
    categoryName: 'Makanan & Minuman',
    categoryIcon: 'Utensils',
    type: 'expense',
    amount: 45000,
    note: 'Kopi & Roti Bakar',
    source: 'ai_scan',
    transactionDate: '2026-09-19',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tx-2',
    userId: 'usr-1',
    accountId: 'acc-1',
    accountName: 'BCA Utama',
    categoryId: 'cat-income',
    categoryName: 'Gaji Bulanan',
    categoryIcon: 'Wallet',
    type: 'income',
    amount: 12500000,
    note: 'Transfer Gaji September',
    source: 'manual',
    transactionDate: '2026-09-18',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tx-3',
    userId: 'usr-1',
    accountId: 'acc-2',
    accountName: 'GoPay',
    categoryId: 'cat-transport',
    categoryName: 'Transportasi',
    categoryIcon: 'Car',
    type: 'expense',
    amount: 68000,
    note: 'Gojek ke Kantor',
    source: 'ai_scan',
    transactionDate: '2026-09-18',
    createdAt: new Date().toISOString(),
  },
];

const mockBudgets: Budget[] = [
  {
    id: 'bgt-1',
    userId: 'usr-1',
    categoryId: 'cat-food',
    categoryName: 'Makanan & Minuman',
    amountLimit: 2500000,
    currentAmount: 1450000,
    period: 'monthly',
    startDate: '2026-09-01',
    endDate: '2026-09-30',
  },
  {
    id: 'bgt-2',
    userId: 'usr-1',
    categoryId: 'cat-transport',
    categoryName: 'Transportasi',
    amountLimit: 1000000,
    currentAmount: 820000,
    period: 'monthly',
    startDate: '2026-09-01',
    endDate: '2026-09-30',
  },
];

const mockSavingsGoals: SavingsGoal[] = [
  {
    id: 'svg-1',
    userId: 'usr-1',
    name: 'Dana Darurat 6 Bulan',
    targetAmount: 30000000,
    currentAmount: 18500000,
    targetDate: '2026-12-31',
  },
  {
    id: 'svg-2',
    userId: 'usr-1',
    name: 'Liburan Akhir Tahun',
    targetAmount: 10000000,
    currentAmount: 6200000,
    targetDate: '2026-11-30',
  },
];

export const useFinanceStore = create<FinanceState>((set, get) => ({
  accounts: mockAccounts,
  transactions: mockTransactions,
  budgets: mockBudgets,
  savingsGoals: mockSavingsGoals,
  netWorth: 14500000 + 850000 + 350000 - 1200000,
  hideBalance: false,
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleHideBalance: () => set((state) => ({ hideBalance: !state.hideBalance })),
  addTransaction: (newTx) => {
    const transaction: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const updatedAccounts = state.accounts.map((acc) => {
        if (acc.id === transaction.accountId) {
          const delta = transaction.type === 'income' ? transaction.amount : -transaction.amount;
          return { ...acc, balance: acc.balance + delta };
        }
        if (transaction.type === 'transfer' && acc.id === transaction.toAccountId) {
          return { ...acc, balance: acc.balance + transaction.amount };
        }
        return acc;
      });

      const newNetWorth = updatedAccounts.reduce((acc, curr) => acc + curr.balance, 0);

      return {
        transactions: [transaction, ...state.transactions],
        accounts: updatedAccounts,
        netWorth: newNetWorth,
      };
    });
  },
}));
