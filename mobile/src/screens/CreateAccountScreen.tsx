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
  Check,
  Smartphone,
  CreditCard,
} from 'lucide-react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

interface CreateAccountScreenProps {
  onBack?: () => void;
  onNavigateLogin?: () => void;
  onRegisterSubmit?: (data: { name: string; phone: string; password: string }) => void;
}

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({
  onBack,
  onNavigateLogin,
  onRegisterSubmit,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Focused state for inputs to render subtle halo
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Password strength calculation (0 to 4)
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.max(score, 1);
  };

  const strengthScore = getPasswordStrength();

  const getStrengthColor = (index: number) => {
    if (!password) return '#E0E7FF'; // default inactive tint
    if (index < strengthScore) {
      if (strengthScore <= 1) return '#EF4444'; // Weak
      if (strengthScore <= 2) return '#F59E0B'; // Medium
      if (strengthScore >= 3) return '#10B981'; // Strong
    }
    return '#E0E7FF';
  };

  const handleRegister = () => {
    if (onRegisterSubmit) {
      onRegisterSubmit({ name, phone: `+62${phone}`, password });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF8FF' }}>
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
            position: 'relative',
            zIndex: 20,
          }}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={onBack || onNavigateLogin}
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
            Create Vault Account
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

        {/* ─── 2. HERO LOGO & SINGLE RADIAL AURA ────────────────── */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
            height: 140,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Single radial gradient: lavender→mint, centered 300×300 */}
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 300,
              height: 300,
              marginLeft: -150,
              marginTop: -150,
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <Svg width="300" height="300" viewBox="0 0 300 300">
              <Defs>
                <RadialGradient
                  id="auraLavenderMint"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <Stop offset="0%"   stopColor="#EEF2FF" stopOpacity="1" />
                  <Stop offset="50%"  stopColor="#EEF2FF" stopOpacity="1" />
                  <Stop offset="70%"  stopColor="#ECFDF5" stopOpacity="0.6" />
                  <Stop offset="100%" stopColor="#ECFDF5" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Circle cx="150" cy="150" r="150" fill="url(#auraLavenderMint)" />
            </Svg>
          </View>

          {/* White circle container 112×112 */}
          <View
            style={{
              width: 112,
              height: 112,
              borderRadius: 56,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#4F46E5',
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.08,
              shadowRadius: 28,
              elevation: 5,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Logo image 84×84 */}
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 84, height: 84 }}
              resizeMode="contain"
            />

            {/* Official Verified Checkmark Seal Badge (Clean Cutout, No Black Edge) */}
            <View
              style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                borderWidth: 2.5,
                borderColor: '#FFFFFF',
              }}
            >
              <Image
                source={require('../../assets/verified-badge.png')}
                style={{ width: 28, height: 28, borderRadius: 14 }}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* ─── 3. TITLE & SUBTITLE ─────────────────────────────── */}
        <View style={{ alignItems: 'center', marginTop: 16, paddingHorizontal: 24 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#0F172A',
              textAlign: 'center',
            }}
          >
            Buat Akun Baru
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#64748B',
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            Mulai kelola keuangan cerdas bersama
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#4F46E5',
              textAlign: 'center',
              marginTop: 2,
            }}
          >
            SmartVault
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
          {/* (a) Label Nama Lengkap */}
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
            Nama Lengkap
          </Text>

          {/* (b) Input Field Nama */}
          <View
            style={{
              height: 56,
              backgroundColor: '#F3F4F6',
              borderRadius: 999,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: focusedField === 'name' ? '#4F46E5' : '#E2E8F0',
              shadowColor: '#4F46E5',
              shadowOpacity: focusedField === 'name' ? 0.15 : 0,
              shadowRadius: 8,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#E2E8F0',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <CreditCard size={16} color="#64748B" />
            </View>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#0F172A', height: '100%' }}
              placeholder="Masukkan nama"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* (c) Label Nomor Handphone */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#334155',
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            Nomor Handphone
          </Text>

          {/* (d) Input Field Nomor HP */}
          <View
            style={{
              height: 56,
              backgroundColor: '#F3F4F6',
              borderRadius: 999,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: focusedField === 'phone' ? '#4F46E5' : '#E2E8F0',
              shadowColor: '#4F46E5',
              shadowOpacity: focusedField === 'phone' ? 0.15 : 0,
              shadowRadius: 8,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#E2E8F0',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Smartphone size={16} color="#64748B" />
            </View>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#0F172A', marginRight: 8 }}>
              +62
            </Text>
            <View
              style={{
                width: 1,
                height: 20,
                backgroundColor: '#CBD5E1',
                marginRight: 10,
              }}
            />
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#0F172A', height: '100%' }}
              placeholder="812 3456 7890"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* (e) Row: Label Password + Kekuatan Sandi */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>
              Password
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#64748B' }}>
              Kekuatan Sandi
            </Text>
          </View>

          {/* (f) Input Field Password */}
          <View
            style={{
              height: 56,
              backgroundColor: '#F3F4F6',
              borderRadius: 999,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: focusedField === 'password' ? '#4F46E5' : '#E2E8F0',
              shadowColor: '#4F46E5',
              shadowOpacity: focusedField === 'password' ? 0.15 : 0,
              shadowRadius: 8,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#E2E8F0',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Lock size={16} color="#64748B" />
            </View>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#0F172A', height: '100%' }}
              placeholder="Minimal 8 karakter"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}
              style={{ padding: 4 }}
            >
              {showPassword ? (
                <EyeOff size={20} color="#64748B" />
              ) : (
                <Eye size={20} color="#64748B" />
              )}
            </TouchableOpacity>
          </View>

          {/* (g) Password Strength Meter (4 Segmen Pill) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
              gap: 6,
            }}
          >
            {[0, 1, 2, 3].map((index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 999,
                  backgroundColor: getStrengthColor(index),
                }}
              />
            ))}
          </View>

          {/* (h) Label Konfirmasi Password */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#334155',
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            Konfirmasi Password
          </Text>

          {/* (i) Input Field Konfirmasi Password */}
          <View
            style={{
              height: 56,
              backgroundColor: '#F3F4F6',
              borderRadius: 999,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: focusedField === 'confirmPassword' ? '#4F46E5' : '#E2E8F0',
              shadowColor: '#4F46E5',
              shadowOpacity: focusedField === 'confirmPassword' ? 0.15 : 0,
              shadowRadius: 8,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#E2E8F0',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Lock size={16} color="#64748B" />
            </View>
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#0F172A', height: '100%' }}
              placeholder="Ulangi password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              activeOpacity={0.7}
              style={{ padding: 4 }}
            >
              {showConfirmPassword ? (
                <EyeOff size={20} color="#64748B" />
              ) : (
                <Eye size={20} color="#64748B" />
              )}
            </TouchableOpacity>
          </View>

          {/* (j) Row Checkbox Persetujuan S&K + Privasi */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => setAgreed(!agreed)}
              activeOpacity={0.8}
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: agreed ? '#4F46E5' : '#CBD5E1',
                backgroundColor: agreed ? '#4F46E5' : '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                marginTop: 2,
              }}
            >
              {agreed && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
            </TouchableOpacity>

            <Text
              style={{
                flex: 1,
                fontSize: 13,
                lineHeight: 18,
                color: '#64748B',
              }}
            >
              Saya menyetujui{' '}
              <Text
                onPress={() => alert('Syarat & Ketentuan SmartVault')}
                style={{ fontWeight: '600', color: '#4F46E5' }}
              >
                Syarat & Ketentuan
              </Text>{' '}
              serta{' '}
              <Text
                onPress={() => alert('Kebijakan Privasi SmartVault')}
                style={{ fontWeight: '600', color: '#4F46E5' }}
              >
                Kebijakan Privasi
              </Text>{' '}
              SmartVault.
            </Text>
          </View>

          {/* (k) Button Primary Daftar Sekarang */}
          <TouchableOpacity
            onPress={handleRegister}
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
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 }}>
              Daftar Sekarang
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
          <Text style={{ fontSize: 14, color: '#64748B' }}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={onNavigateLogin || onBack} activeOpacity={0.7}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#4F46E5' }}>
              Masuk
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── 6. TRUST BADGE ──────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEF2FF',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 999,
            alignSelf: 'center',
            marginTop: 16,
          }}
        >
          <Lock size={14} color="#4F46E5" />
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#4F46E5', marginLeft: 6 }}>
            Data terlindungi enkripsi end-to-end 256-bit
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
