export interface AccountItem {
  id: string;
  name: string;
  balance: number;
  iconType: 'main' | 'savings' | 'investment';
  iconBg: string;
  iconColor: string;
}

export interface SpendingCategoryItem {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  gradientStart: string;
  gradientEnd: string;
}

export const DASHBOARD_DATA = {
  userName: 'Alex Smith',
  greeting: 'Good Morning,',
  totalBalance: 24560500,
  growthText: '12.5% from last month',
  
  accounts: [
    {
      id: 'acc-main',
      name: 'Akun Utama',
      balance: 8540000,
      iconType: 'main',
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
    },
    {
      id: 'acc-savings',
      name: 'Tabungan',
      balance: 10250000,
      iconType: 'savings',
      iconBg: '#EFF6FF',
      iconColor: '#3B82F6',
    },
    {
      id: 'acc-investment',
      name: 'Investasi',
      balance: 5770500,
      iconType: 'investment',
      iconBg: '#F5F3FF',
      iconColor: '#8B5CF6',
    },
  ] as AccountItem[],

  spendingOverview: {
    totalSpent: 2890500,
    selectedPeriod: 'This Month',
    categories: [
      {
        id: 'cat-shopping',
        name: 'Shopping',
        percentage: 40,
        amount: 1156200,
        gradientStart: '#707AFE',
        gradientEnd: '#4C51DE',
      },
      {
        id: 'cat-food',
        name: 'Food & Drink',
        percentage: 25,
        amount: 722625,
        gradientStart: '#2DD4BF',
        gradientEnd: '#0EA5E9',
      },
      {
        id: 'cat-transport',
        name: 'Transport',
        percentage: 15,
        amount: 433575,
        gradientStart: '#FBBF24',
        gradientEnd: '#F97316',
      },
      {
        id: 'cat-bills',
        name: 'Bills',
        percentage: 10,
        amount: 289050,
        gradientStart: '#60A5FA',
        gradientEnd: '#2563EB',
      },
      {
        id: 'cat-others',
        name: 'Others',
        percentage: 10,
        amount: 289050,
        gradientStart: '#C084FC',
        gradientEnd: '#9333EA',
      },
    ] as SpendingCategoryItem[],
  },
};
