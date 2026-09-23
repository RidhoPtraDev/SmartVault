import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import {
  Bell,
  Pencil,
  Wallet,
  Receipt,
  TrendingUp,
  LogOut,
  ChevronRight,
  User as UserIcon,
} from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { useAuthStore } from '../store/useAuthStore';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Apakah Anda yakin ingin keluar dari akun Anda?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  const displayName = user?.name || 'Alex Smith';
  const displayPhone = user?.phoneNumber || '+62 812-3456-7890';
  const avatarUri = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&auto=format&fit=crop&q=80';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF8FF' }}>
      {/* ─── 1. TOP APP BAR ─── */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
        }}
      >
        {/* Invisible spacer for perfect centering */}
        <View style={{ width: 40, height: 40 }} />

        {/* Center: Title */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F172A' }}>
          Profile
        </Text>

        {/* Right: Notification Bell */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bell size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110, paddingTop: 4 }}
      >
        {/* ─── 2. ACCOUNT HUB KICKER & TITLE ─── */}
        <View style={{ marginBottom: 16, marginTop: 4 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: '#4F46E5',
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            ACCOUNT HUB
          </Text>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: '#0F172A',
              letterSpacing: -0.5,
            }}
          >
            Personal Details
          </Text>
        </View>

        {/* ─── 3. MAIN PROFILE CARD ─── */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 24,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#F1F5F9',
            shadowColor: '#0F172A',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.04,
            shadowRadius: 16,
            elevation: 3,
            marginBottom: 16,
          }}
        >
          {/* Avatar with Gradient Ring & Edit Pencil */}
          <View style={{ width: 104, height: 104, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* SVG Gradient Ring Border */}
            <Svg width="104" height="104" style={{ position: 'absolute' }}>
              <Defs>
                <LinearGradient id="avatarRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#6366F1" />
                  <Stop offset="50%" stopColor="#8B5CF6" />
                  <Stop offset="100%" stopColor="#EC4899" />
                </LinearGradient>
              </Defs>
              <Circle
                cx="52"
                cy="52"
                r="49"
                stroke="url(#avatarRingGrad)"
                strokeWidth="3"
                fill="none"
              />
            </Svg>

            {/* Profile Photo */}
            <Image
              source={{ uri: avatarUri }}
              style={{
                width: 92,
                height: 92,
                borderRadius: 46,
                backgroundColor: '#E2E8F0',
              }}
            />

            {/* Floating Pencil Edit Badge */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#4F46E5',
                borderWidth: 2.5,
                borderColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#4F46E5',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.35,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Pencil size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* User Name */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#0F172A',
              marginTop: 14,
            }}
          >
            {displayName}
          </Text>

          {/* Phone Number */}
          <Text
            style={{
              fontSize: 14,
              color: '#64748B',
              marginTop: 4,
              fontWeight: '400',
            }}
          >
            {displayPhone}
          </Text>

          {/* Financial Quick Stats (2 Columns Grid) */}
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              marginTop: 20,
              width: '100%',
            }}
          >
            {/* Box 1: Total Saldo */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#F4F5FB',
                borderRadius: 18,
                padding: 14,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    backgroundColor: '#EEF2FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Wallet size={12} color="#6366F1" />
                </View>
                <Text
                  style={{
                    fontSize: 9.5,
                    fontWeight: '700',
                    color: '#64748B',
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                  }}
                >
                  TOTAL SALDO
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '800',
                  color: '#0F172A',
                  marginBottom: 6,
                  letterSpacing: -0.2,
                }}
              >
                Rp 24.560.500
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#10B981' }}>
                  +12.4%
                </Text>
              </View>
            </View>

            {/* Box 2: Pengeluaran Bulanan */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#F4F5FB',
                borderRadius: 18,
                padding: 14,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    backgroundColor: '#EEF2FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Receipt size={12} color="#6366F1" />
                </View>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '700',
                    color: '#64748B',
                    letterSpacing: 0.2,
                    textTransform: 'uppercase',
                  }}
                  numberOfLines={1}
                >
                  PENGELUARAN
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '800',
                  color: '#0F172A',
                  marginBottom: 6,
                  letterSpacing: -0.2,
                }}
              >
                Rp 2.890.500
              </Text>

              <Text style={{ fontSize: 12, color: '#64748B', fontWeight: '500' }}>
                Bulan ini
              </Text>
            </View>
          </View>
        </View>

        {/* ─── 4. LOG OUT TILE (STANDALONE CARD) ─── */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogout}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 16,
            borderWidth: 1.2,
            borderColor: '#FFE4E6',
            shadowColor: '#E11D48',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 2,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* Left: Icon Pod */}
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#FFE4E6',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
            }}
          >
            <LogOut size={20} color="#E11D48" />
          </View>

          {/* Middle: Text Block */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#DC2626',
                marginBottom: 2,
              }}
            >
              Log Out
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#64748B',
                fontWeight: '400',
              }}
            >
              Keluar dari akun Anda
            </Text>
          </View>

          {/* Right: Chevron Button */}
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#F8FAFC',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={16} color="#94A3B8" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
