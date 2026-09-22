import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import {
  ChevronLeft,
  User,
  Clock,
  MessageCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react-native';
import Svg, { Defs, RadialGradient, LinearGradient, Stop, Circle, Rect } from 'react-native-svg';

interface OtpVerificationScreenProps {
  phone?: string;
  onBack?: () => void;
  onVerifySubmit?: (otpCode: string) => void;
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  phone = '+6281234567890',
  onBack,
  onVerifySubmit,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const [timer, setTimer] = useState<number>(60);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Countdown timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Format MM:SS
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (text: string, index: number) => {
    // If pasted full 6-digit code
    if (text.length > 1) {
      const digits = text.replace(/[^0-9]/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(digits.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    const cleanDigit = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanDigit;
    setOtp(newOtp);

    // Auto-advance
    if (cleanDigit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');
  const otpCodeString = otp.join('');

  const handleConfirm = () => {
    if (isOtpComplete && onVerifySubmit) {
      onVerifySubmit(otpCodeString);
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
            Verifikasi OTP
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

        {/* ─── CONTINUOUS AURA FLOW BACKGROUND (LAVENDER → MINT → FADE) ─── */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 590,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient
                id="continuousAuraFlow"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                {/* 1. Header & Logo area: Lavender #EEF2FF */}
                <Stop offset="0%" stopColor="#EEF2FF" stopOpacity="0.85" />
                {/* 2. Transition area near Title: Lavender-Mint blend */}
                <Stop offset="25%" stopColor="#E2FAF0" stopOpacity="0.75" />
                {/* 3. Card OTP area: Mint #ECFDF5 */}
                <Stop offset="50%" stopColor="#ECFDF5" stopOpacity="0.65" />
                {/* 4. Card Info Keamanan area: Mint sustained throughout card */}
                <Stop offset="82%" stopColor="#ECFDF5" stopOpacity="0.45" />
                {/* 5. Smooth fade to transparent right before Primary Button */}
                <Stop offset="100%" stopColor="#FAF8FF" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#continuousAuraFlow)" />
          </Svg>
        </View>

        {/* ─── 2. HERO LOGO & LAVENDER AURA (ACCENT LAYER) ────────── */}
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
          {/* Radial Glow SVG behind logo: 280x280 centered halo (Lavender #EAEDFF) */}
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

            {/* Official Verified Shield Indigo Badge */}
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
                source={require('../../assets/verified-badge-shield.png')}
                style={{ width: 28, height: 28, borderRadius: 14 }}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* ─── 3. TITLE ───────────────────────────────────────── */}
        <View
          style={{
            alignItems: 'center',
            marginTop: 16,
            paddingHorizontal: 24,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#0F172A',
              textAlign: 'center',
            }}
          >
            Verifikasi OTP
          </Text>
        </View>

        {/* ─── 4. CARD OTP INPUT ───────────────────────────────── */}
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
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* (a) 6 Boxes OTP Input */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            {otp.map((digit, index) => {
              const isFocused = focusedIndex === index;
              const isFilled = digit !== '';

              return (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={{
                    width: 44,
                    height: 52,
                    borderRadius: 14,
                    backgroundColor: isFocused ? '#FFFFFF' : '#F8FAFC',
                    borderWidth: isFocused ? 2 : isFilled ? 1.5 : 1,
                    borderColor: isFocused
                      ? '#4F46E5'
                      : isFilled
                      ? '#4F46E5'
                      : '#E2E8F0',
                    textAlign: 'center',
                    fontSize: 22,
                    fontWeight: '700',
                    color: '#0F172A',
                    shadowColor: '#4F46E5',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isFocused ? 0.18 : 0,
                    shadowRadius: 6,
                    elevation: isFocused ? 3 : 0,
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  selectTextOnFocus
                />
              );
            })}
          </View>

          {/* (b) Countdown Timer Row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
            }}
          >
            <Clock size={16} color="#64748B" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 13, color: '#64748B' }}>
              Belum menerima kode? Kirim ulang dalam{' '}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '700',
                color: timer <= 10 ? '#EF4444' : '#4F46E5',
              }}
            >
              {formatTimer(timer)}
            </Text>
          </View>

          {/* (c) Tombol "Kirim ulang via WhatsApp" */}
          <TouchableOpacity
            onPress={handleResendOtp}
            disabled={timer > 0}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#ECFDF5',
              borderRadius: 999,
              paddingHorizontal: 16,
              paddingVertical: 8,
              opacity: timer > 0 ? 0.6 : 1,
            }}
          >
            <MessageCircle size={16} color="#059669" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#059669' }}>
              Kirim ulang via WhatsApp
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── 5. CARD INFO KEAMANAN ───────────────────────────── */}
        <View
          style={{
            backgroundColor: '#F8FAFC',
            borderWidth: 1,
            borderColor: '#E2E8F0',
            borderRadius: 20,
            padding: 16,
            marginHorizontal: 20,
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Icon Image Asset (Protection Badge) */}
          <Image
            source={require('../../assets/protection-badge.png')}
            style={{ width: 40, height: 40, marginRight: 12 }}
            resizeMode="contain"
          />

          {/* Text Block */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#0F172A' }}>
              Perlindungan Kriptografis
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                lineHeight: 18,
                color: '#475569',
                marginTop: 4,
              }}
            >
              Kode OTP bersifat rahasia untuk melindungi pendaftaran akun dan saldo
              SmartVault Anda. Jangan bagikan kepada siapa pun.
            </Text>
          </View>
        </View>

        {/* ─── 6. BUTTON PRIMARY KONFIRMASI ─────────────────────── */}
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={!isOtpComplete}
          activeOpacity={0.88}
          style={{
            height: 56,
            backgroundColor: isOtpComplete ? '#4F46E5' : '#818CF8',
            opacity: isOtpComplete ? 1 : 0.6,
            borderRadius: 999,
            marginHorizontal: 20,
            marginTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#4F46E5',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: isOtpComplete ? 0.3 : 0.1,
            shadowRadius: 20,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#FFFFFF',
              letterSpacing: 0.3,
            }}
          >
            Konfirmasi & Buka Akun
          </Text>
          <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* ─── 7. FOOTER HELP LINK ─────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 13.5, color: '#64748B' }}>
            Butuh bantuan verifikasi?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => alert('Hubungi Customer Service SmartVault via WhatsApp')}
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 13.5, fontWeight: '600', color: '#4F46E5' }}>
              Hubungi Layanan Pelanggan
            </Text>
            <ExternalLink size={14} color="#4F46E5" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
