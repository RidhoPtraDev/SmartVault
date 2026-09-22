import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { User, Phone, MessageSquare, Shield, LogOut, Bell } from 'lucide-react-native';
import { BubbleCard } from '../components/ui/BubbleCard';
import { useAuthStore } from '../store/useAuthStore';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-12 pb-32" showsVerticalScrollIndicator={false}>
      <Text className="text-xl font-bold text-on-surface mb-6">Profil & Pengaturan</Text>

      {/* User Info Card */}
      <BubbleCard className="mb-6 flex-row items-center">
        <View className="w-14 h-14 rounded-full bg-primary items-center justify-center mr-4 shadow-md shadow-indigo-500/30">
          <User size={28} color="#FFFFFF" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-on-surface">{user?.name || 'SmartVault User'}</Text>
          <Text className="text-xs text-on-surface-variant mt-0.5">{user?.phoneNumber}</Text>
        </View>
      </BubbleCard>

      {/* Settings Options */}
      <View className="space-y-3">
        <BubbleCard className="p-0 overflow-hidden">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
            <View className="flex-row items-center">
              <MessageSquare size={20} color="#4F46E5" className="mr-3" />
              <Text className="text-sm font-semibold text-on-surface ml-3">Jadwal Laporan WhatsApp</Text>
            </View>
            <Text className="text-xs font-bold text-primary">Mingguan & Bulanan</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
            <View className="flex-row items-center">
              <Bell size={20} color="#4F46E5" className="mr-3" />
              <Text className="text-sm font-semibold text-on-surface ml-3">Notifikasi Push Budget</Text>
            </View>
            <Text className="text-xs font-bold text-tertiary">Aktif (80% & 100%)</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <Shield size={20} color="#4F46E5" className="mr-3" />
              <Text className="text-sm font-semibold text-on-surface ml-3">Keamanan Account</Text>
            </View>
            <Text className="text-xs text-on-surface-variant">256-bit Encryption</Text>
          </TouchableOpacity>
        </BubbleCard>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={logout}
          className="bg-red-50 p-4 rounded-2xl flex-row items-center justify-center border border-red-100 mt-6"
        >
          <LogOut size={18} color="#EF4444" />
          <Text className="text-sm font-bold text-error ml-2">Keluar Akun</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
