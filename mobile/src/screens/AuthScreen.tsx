import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { PillButton } from '../components/ui/PillButton';
import { InputField } from '../components/ui/InputField';
import { BubbleCard } from '../components/ui/BubbleCard';
import { SignInScreen } from './SignInScreen';
import { CreateAccountScreen } from './CreateAccountScreen';
import { useAuthStore } from '../store/useAuthStore';

export const AuthScreen: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpPhone, setOtpPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [registeredUser, setRegisteredUser] = useState<{ name: string; phone: string } | null>(null);

  const { login } = useAuthStore();

  const handleRegisterSubmit = (data: { name: string; phone: string; password: string }) => {
    setRegisteredUser({ name: data.name, phone: data.phone });
    setOtpPhone(data.phone);
    setOtpStep(true);
  };

  const handleVerifyOtp = () => {
    login(
      {
        id: 'usr-new',
        name: registeredUser?.name || 'User SmartVault',
        phoneNumber: otpPhone || '+6281234567890',
        createdAt: new Date().toISOString(),
      },
      'jwt-token-demo'
    );
  };

  if (!isRegistering) {
    return (
      <SignInScreen
        onNavigateRegister={() => setIsRegistering(true)}
        onForgotPassword={() => alert('Fitur Reset Password OTP dikirim via WhatsApp')}
      />
    );
  }

  if (isRegistering && !otpStep) {
    return (
      <CreateAccountScreen
        onNavigateLogin={() => setIsRegistering(false)}
        onBack={() => setIsRegistering(false)}
        onRegisterSubmit={handleRegisterSubmit}
      />
    );
  }

  // OTP Verification Screen (after registration form submit)
  return (
    <ScrollView
      className="flex-1 bg-background px-6 pt-16"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <View className="items-center mb-8">
        <Image
          source={require('../../assets/logo.png')}
          className="w-20 h-20 mb-2"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-on-surface">SmartVault</Text>
        <Text className="text-xs text-on-surface-variant text-center mt-1">
          Verifikasi OTP WhatsApp
        </Text>
      </View>

      <BubbleCard className="p-6 mb-6">
        <Text className="text-lg font-bold text-on-surface mb-2 text-center">
          Masukkan Kode OTP
        </Text>
        <Text className="text-xs text-on-surface-variant mb-4 text-center">
          Kode OTP 6 digit telah dikirimkan ke WhatsApp nomor {otpPhone}
        </Text>
        <InputField
          placeholder="Masukkan 6 Digit Kode OTP"
          value={otpCode}
          onChangeText={setOtpCode}
          keyboardType="number-pad"
          maxLength={6}
        />
        <PillButton
          title="Verifikasi & Buat Vault"
          onPress={handleVerifyOtp}
          style={{ marginTop: 8 }}
        />
      </BubbleCard>

      <View className="items-center mb-8">
        <Text
          onPress={() => setOtpStep(false)}
          className="text-xs font-semibold text-primary"
        >
          Kembali ke Form Pendaftaran
        </Text>
      </View>

      <View className="flex-row items-center justify-center bg-surface-container px-4 py-2 rounded-full self-center mb-10">
        <ShieldCheck size={16} color="#10B981" />
        <Text className="text-xs font-semibold text-tertiary ml-2">
          256-bit Bank-Grade Encryption
        </Text>
      </View>
    </ScrollView>
  );
};
