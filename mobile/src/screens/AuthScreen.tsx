import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { PillButton } from '../components/ui/PillButton';
import { InputField } from '../components/ui/InputField';
import { BubbleCard } from '../components/ui/BubbleCard';
import { SignInScreen } from './SignInScreen';
import { CreateAccountScreen } from './CreateAccountScreen';
import { OtpVerificationScreen } from './OtpVerificationScreen';
import { useAuthStore } from '../store/useAuthStore';

export const AuthScreen: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpPhone, setOtpPhone] = useState('');
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
    <OtpVerificationScreen
      phone={otpPhone}
      onBack={() => setOtpStep(false)}
      onVerifySubmit={handleVerifyOtp}
    />
  );
};
