import { LucideIcon, ShoppingBag, Utensils, Car, Zap, Ticket } from 'lucide-react-native';

export interface BudgetCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  percentage: number;
  spent: number;
  limit: number;
  barType: 'gradient-violet' | 'gradient-orange' | 'solid-blue' | 'solid-amber' | 'solid-emerald';
  barColor: string;
  barColorEnd?: string;
}

export interface MonthlyBudgetSummary {
  totalLimit: number;
  totalSpent: number;
  percentage: number;
}

export const MONTHLY_BUDGET_SUMMARY: MonthlyBudgetSummary = {
  totalLimit: 3200000,
  totalSpent: 2400000,
  percentage: 75,
};

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: 'bcat-1',
    name: 'Shopping',
    icon: ShoppingBag,
    iconColor: '#8B5CF6',
    iconBgColor: '#F5F3FF',
    percentage: 75,
    spent: 1120000,
    limit: 1500000,
    barType: 'gradient-violet',
    barColor: '#A78BFA',
    barColorEnd: '#6D28D9',
  },
  {
    id: 'bcat-2',
    name: 'Food & Dining',
    icon: Utensils,
    iconColor: '#F97316',
    iconBgColor: '#FFF7ED',
    percentage: 80,
    spent: 640000,
    limit: 800000,
    barType: 'gradient-orange',
    barColor: '#FCD34D',
    barColorEnd: '#EA580C',
  },
  {
    id: 'bcat-3',
    name: 'Transport',
    icon: Car,
    iconColor: '#3B82F6',
    iconBgColor: '#EFF6FF',
    percentage: 64,
    spent: 320000,
    limit: 500000,
    barType: 'solid-blue',
    barColor: '#3B82F6',
  },
  {
    id: 'bcat-4',
    name: 'Bills',
    icon: Zap,
    iconColor: '#F59E0B',
    iconBgColor: '#FFFBEB',
    percentage: 62,
    spent: 250000,
    limit: 400000,
    barType: 'solid-amber',
    barColor: '#F59E0B',
  },
  {
    id: 'bcat-5',
    name: 'Entertainment',
    icon: Ticket,
    iconColor: '#10B981',
    iconBgColor: '#ECFDF5',
    percentage: 50,
    spent: 150000,
    limit: 300000,
    barType: 'solid-emerald',
    barColor: '#10B981',
  },
];
