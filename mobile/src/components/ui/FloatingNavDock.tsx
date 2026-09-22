import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Home, ReceiptText, PieChart, Target, User, Plus } from 'lucide-react-native';
import { useFinanceStore } from '../../store/useFinanceStore';

interface FloatingNavDockProps {
  onPressAdd?: () => void;
}

export const FloatingNavDock: React.FC<FloatingNavDockProps> = ({ onPressAdd }) => {
  const { activeTab, setActiveTab } = useFinanceStore();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'transactions', label: 'Transaksi', icon: ReceiptText },
    { id: 'budget', label: 'Budget', icon: PieChart },
    { id: 'savings', label: 'Tabungan', icon: Target },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <View className="absolute bottom-6 left-4 right-4 items-center">
      <View className="bg-white/95 backdrop-blur-md rounded-full px-4 py-3 flex-row items-center justify-between shadow-2xl shadow-indigo-500/20 border border-slate-100 w-full max-w-md">
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setActiveTab(item.id)}
              className="items-center px-3"
            >
              <Icon size={22} color={isActive ? '#4F46E5' : '#64748B'} />
              <Text className={`text-[10px] mt-1 font-semibold ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Floating Add Action Button (FAB) */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={onPressAdd}
          className="w-[52px] h-[52px] rounded-full bg-primary items-center justify-center -mt-6 shadow-lg shadow-indigo-500/50 border-2 border-white"
        >
          <Plus size={26} color="#FFFFFF" />
        </TouchableOpacity>

        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setActiveTab(item.id)}
              className="items-center px-3"
            >
              <Icon size={22} color={isActive ? '#4F46E5' : '#64748B'} />
              <Text className={`text-[10px] mt-1 font-semibold ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
