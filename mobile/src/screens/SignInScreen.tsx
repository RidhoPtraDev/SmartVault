import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  ChevronLeft,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import { useAuthStore } from '../store/useAuthStore';

interface SignInScreenProps {
  onBack?: () => void;
  onNavigateRegister?: () => void;
  onForgotPassword?: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onBack,
  onNavigateRegister,
  onForgotPassword,
}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuthStore();

  const handleSignIn = () => {
    login(
      {
        id: 'usr-1',
        name: 'Budi Pratama',
        phoneNumber: userId || '+6281234567890',
        createdAt: new Date().toISOString(),
      },
      'jwt-token-demo'
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5FB' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── 1. HEADER ROW ─────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            height: 56,
            marginTop: 8,
          }}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
          >
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>

          {/* Title */}
          <Text
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: '600',
              color: '#0F172A',
              marginLeft: 8,
            }}
          >
            Sign In
          </Text>

          {/* Icon Avatar — 32px rounded.full #4F46E5 */}
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#4F46E5',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#3525CD',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <User size={18} color="#FFFFFF" />
          </View>
        </View>

        {/* ─── 2. HERO LOGO ────────────────────────────────────── */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
            height: 140,
            position: 'relative',
          }}
        >
          {/* Radial Glow SVG behind logo: 280x280 centered halo */}
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 280,
              height: 280,
              marginLeft: -140,
              marginTop: -140,
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <Svg width="280" height="280" viewBox="0 0 280 280">
              <Defs>
                <RadialGradient
                  id="logoRadialGlow"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <Stop offset="0%" stopColor="#EAEDFF" stopOpacity="0.9" />
                  <Stop offset="40%" stopColor="#EAEDFF" stopOpacity="0.6" />
                  <Stop offset="75%" stopColor="#EAEDFF" stopOpacity="0.2" />
                  <Stop offset="100%" stopColor="#EAEDFF" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Circle cx="140" cy="140" r="140" fill="url(#logoRadialGlow)" />
            </Svg>
          </View>

          {/* White circle container 112×112, rounded.full */}
          <View
            style={{
              width: 112,
              height: 112,
              borderRadius: 56,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              shadowColor: '#4F46E5',
              shadowOffset: { width: 0, height: 16 },
              shadowOpacity: 0.18,
              shadowRadius: 36,
              elevation: 8,
              zIndex: 2,
            }}
          >
            {/* Logo image 84x84 contained */}
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 84, height: 84 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* ─── 3. WELCOME TEXT ─────────────────────────────────── */}
        <View style={{ alignItems: 'center', marginTop: 20, paddingHorizontal: 24 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#0F172A',
              textAlign: 'center',
            }}
          >
            Welcome Back!
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#64748B',
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            Sign in to access your SmartVault
          </Text>
        </View>

        {/* ─── 4. CARD FORM ────────────────────────────────────── */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: 24,
            marginHorizontal: 20,
            marginTop: 24,
            borderWidth: 1,
            borderColor: '#F1F5F9',
            shadowColor: '#4F46E5',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.06,
            shadowRadius: 30,
            elevation: 3,
          }}
        >
          {/* (a) Label Nomor HP */}
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#64748B', marginBottom: 8 }}>
            Nomor Handphone
          </Text>

          {/* (b) Input Nomor HP */}
          <View
            style={{
              height: 56,
              backgroundColor: '#F2F3FF',
              borderRadius: 999,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#EAEDFF',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <User size={16} color="#4F46E5" />
            </View>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#0F172A', height: '100%' }}
              placeholder="Masukkan nomor HP"
              placeholderTextColor="#777587"
              keyboardType="phone-pad"
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
            />
          </View>

          {/* (c) Spacing + (d) Label Password */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#64748B',
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            Password
          </Text>

          {/* (e) Input Password */}
          <View
            style={{
              height: 56,
              backgroundColor: '#F2F3FF',
              borderRadius: 999,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#EAEDFF',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Lock size={16} color="#4F46E5" />
            </View>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#0F172A', height: '100%' }}
              placeholder="••••••••"
              placeholderTextColor="#777587"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}
              style={{ padding: 4 }}
            >
              {showPassword ? (
                <EyeOff size={20} color="#777587" />
              ) : (
                <Eye size={20} color="#777587" />
              )}
            </TouchableOpacity>
          </View>

          {/* (f) Remember me + Forgot Password */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.8}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: rememberMe ? '#4F46E5' : '#C7C4D8',
                  backgroundColor: rememberMe ? '#4F46E5' : '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                }}
              >
                {rememberMe && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
              </View>
              <Text style={{ fontSize: 14, color: '#64748B' }}>Ingat Saya</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#4F46E5' }}>
                Lupa Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* (g) Primary Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            activeOpacity={0.88}
            style={{
              height: 56,
              backgroundColor: '#4F46E5',
              borderRadius: 999,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 24,
              shadowColor: '#4F46E5',
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.45,
              shadowRadius: 28,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 }}>
              Masuk ke Akun
            </Text>
            <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

        {/* ─── 5. FOOTER LINK ──────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 24,
          }}
        >
          <Text style={{ fontSize: 14, color: '#64748B' }}>Belum punya akun? </Text>
          <TouchableOpacity onPress={onNavigateRegister} activeOpacity={0.7}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#4F46E5' }}>
              Registrasi Sekarang
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── 6. TRUST BADGE ──────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EAEDFF',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 999,
            alignSelf: 'center',
            marginTop: 16,
          }}
        >
          <ShieldCheck size={16} color="#10B981" />
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#10B981', marginLeft: 6 }}>
            256-bit Bank-Grade Encryption
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
