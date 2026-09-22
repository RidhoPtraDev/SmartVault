import React, { useState, useCallback } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { DashboardScreen } from '../screens/DashboardScreen';
import { TransactionsScreen } from '../screens/TransactionsScreen';
import { BudgetScreen } from '../screens/BudgetScreen';
import { SavingsScreen } from '../screens/SavingsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { FloatingNavDock } from '../components/ui/FloatingNavDock';
import { InputField } from '../components/ui/InputField';
import { PillButton } from '../components/ui/PillButton';
import { useAuthStore } from '../store/useAuthStore';
import { useFinanceStore } from '../store/useFinanceStore';
import { X } from 'lucide-react-native';

// Alur cold start yang benar:
//   splash → signIn → (setelah login) → dashboard
//   Splash tidak bisa di-skip. Navigasi splash→signIn pakai "replace"
//   yaitu set state showSplash=false sehingga tidak ada stack kembali.
type AppScreen = 'splash' | 'auth' | 'main';

export const RootNavigator: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { activeTab, addTransaction, accounts } = useFinanceStore();

  // State layar aktif — mulai dari splash selalu pada cold start
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');

  const [modalVisible, setModalVisible] = useState(false);
  const [txType, setTxType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  // Callback dari SplashScreen setelah 2000ms — "replace" ke auth (tidak ada back ke splash)
  const handleSplashFinish = useCallback(() => {
    setCurrentScreen('auth');
  }, []);

  const handleSaveTransaction = () => {
    if (!amount) return;
    addTransaction({
      userId: 'usr-1',
      accountId: accounts[0]?.id || 'acc-1',
      accountName: accounts[0]?.name || 'BCA Utama',
      categoryId: txType === 'expense' ? 'cat-food' : 'cat-income',
      categoryName: txType === 'expense' ? 'Makanan & Minuman' : 'Pemasukan',
      categoryIcon: txType === 'expense' ? 'Utensils' : 'Wallet',
      type: txType,
      amount: parseFloat(amount),
      note: note || (txType === 'expense' ? 'Pengeluaran Manual' : 'Pemasukan Manual'),
      source: 'manual',
      transactionDate: new Date().toISOString().split('T')[0],
    });
    setAmount('');
    setNote('');
    setModalVisible(false);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'transactions':
        return <TransactionsScreen />;
      case 'budget':
        return <BudgetScreen />;
      case 'savings':
        return <SavingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'dashboard':
      default:
        return <DashboardScreen />;
    }
  };

  // — Alur 1: Splash Screen (cold start, selalu ditampilkan, 2 detik, tidak bisa di-skip) —
  if (currentScreen === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // — Alur 2: Auth Screen (setelah splash, jika belum login) —
  // isAuthenticated juga dipantau: jika user berhasil login, langsung masuk main
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // — Alur 3: Main App (setelah login berhasil) —
  return (
    <View className="flex-1 bg-[#F4F5FB] relative">
      {renderScreen()}

      {/* Floating Bottom Nav Dock */}
      <FloatingNavDock onPressAdd={() => setModalVisible(true)} />

      {/* Quick Add Transaction Modal Sheet */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-[32px] p-6 pb-10">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-[#0F172A]">Tambah Transaksi Manual</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="p-1">
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Type Selector */}
            <View className="flex-row bg-slate-100 p-1 rounded-full mb-4">
              <TouchableOpacity
                onPress={() => setTxType('expense')}
                className={`flex-1 py-2.5 rounded-full items-center ${txType === 'expense' ? 'bg-[#4F46E5]' : ''}`}
              >
                <Text className={`text-xs font-bold ${txType === 'expense' ? 'text-white' : 'text-slate-600'}`}>
                  Pengeluaran
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTxType('income')}
                className={`flex-1 py-2.5 rounded-full items-center ${txType === 'income' ? 'bg-[#10B981]' : ''}`}
              >
                <Text className={`text-xs font-bold ${txType === 'income' ? 'text-white' : 'text-slate-600'}`}>
                  Pemasukan
                </Text>
              </TouchableOpacity>
            </View>

            <InputField
              label="Nominal (Rp)"
              placeholder="Contoh: 50000"
              keyboardType="number-pad"
              value={amount}
              onChangeText={setAmount}
            />

            <InputField
              label="Catatan / Keterangan"
              placeholder="Contoh: Makan siang Nasi Padang"
              value={note}
              onChangeText={setNote}
            />

            <PillButton
              title="Simpan Transaksi (< 1s)"
              onPress={handleSaveTransaction}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
