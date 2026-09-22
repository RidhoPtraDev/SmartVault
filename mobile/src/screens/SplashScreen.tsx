import React, { useEffect } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // Timer persis 2000ms dimulai SETELAH komponen rendered — tidak bisa di-skip
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F4F5FB',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Lingkaran putih 120×120 dengan shadow glow indigo */}
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          shadowColor: '#4F46E5',
          shadowOffset: { width: 0, height: 16 },
          shadowOpacity: 0.15,
          shadowRadius: 36,
          elevation: 8,
        }}
      >
        {/* FIX: explicit width/height style — bukan className — supaya tidak full-bleed */}
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 90, height: 90 }}
          resizeMode="contain"
        />
      </View>

      {/* Nama aplikasi */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: '#0F172A',
          marginTop: 20,
          letterSpacing: -0.5,
        }}
      >
        SmartVault
      </Text>

      {/* Tagline */}
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: '#64748B',
          marginTop: 4,
        }}
      >
        Personal Finance & AI Vision
      </Text>
    </SafeAreaView>
  );
};
