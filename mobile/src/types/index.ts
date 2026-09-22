export type TransactionType = 'income' | 'expense' | 'transfer';
export type TransactionSource = 'manual' | 'ai_scan';
export type AccountType = 'cash' | 'bank' | 'e-wallet' | 'credit_card';

export interface User {
  id: string;
  phoneNumber: string;
  name: string;
  createdAt: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  balance: number;
}

export interface Category {
  id: string;
  userId?: string | null;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  accountName?: string;
  categoryId: string;
  categoryName?: string;
  categoryIcon?: string;
  toAccountId?: string | null;
  type: TransactionType;
  amount: number;
  note?: string;
  source: TransactionSource;
  transactionDate: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  categoryName: string;
  amountLimit: number;
  currentAmount: number;
  period: 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
}
