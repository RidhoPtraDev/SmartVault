import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  Menu,
  Bell,
  Eye,
  EyeOff,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Landmark,
} from 'lucide-react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Stop, Rect } from 'react-native-svg';
import { DASHBOARD_DATA } from '../constants/dashboardData';
import { SpendingDonutChart } from '../components/ui/SpendingDonutChart';
import { formatIDR } from '../utils/formatCurrency';

export const DashboardScreen: React.FC = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  // Helper icon renderer for accounts
  const renderAccountIcon = (iconType: string, color: string) => {
    switch (iconType) {
      case 'savings':
        return (
          <Image
            source={require('../../assets/savings-icon.png')}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        );
      case 'investment':
        return (
          <Image
            source={require('../../assets/investment-icon.png')}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        );
      case 'main':
      default:
        return (
          <Image
            source={require('../../assets/main-account-icon.png')}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF8FF' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── 1. HEADER ROW ─────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          {/* Left: Menu button 44x44 */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#0F172A',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 2,
              borderWidth: 1,
              borderColor: '#F1F5F9',
            }}
          >
            <Menu size={20} color="#0F172A" />
          </TouchableOpacity>

          {/* Right: Bell button 44x44 with notification badge */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#0F172A',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 2,
              borderWidth: 1,
              borderColor: '#F1F5F9',
              position: 'relative',
            }}
          >
            <Bell size={20} color="#0F172A" />
            {/* Red dot badge */}
            <View
              style={{
                position: 'absolute',
                top: 11,
                right: 11,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#EF4444',
                borderWidth: 1.5,
                borderColor: '#FFFFFF',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* ─── 2. GREETING ─────────────────────────────────────── */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, color: '#64748B', fontWeight: '400' }}>
            {DASHBOARD_DATA.greeting}
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: '#0F172A',
              fontWeight: '800',
              marginTop: 2,
              letterSpacing: -0.3,
            }}
          >
            {DASHBOARD_DATA.userName} 👋
          </Text>
        </View>

        {/* ─── 3. TOTAL SALDO CARD (HERO COMPONENT) ─────────────── */}
        <View style={{ position: 'relative', marginBottom: 24 }}>
          {/* Ambient Glow behind card */}
          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              right: 12,
              bottom: -4,
              borderRadius: 24,
              backgroundColor: '#5B86F7',
              opacity: 0.28,
              pointerEvents: 'none',
            }}
          />

          {/* Main Card with Bright Ocean Blue Gradient */}
          <View
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              shadowColor: '#3B6CF6',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 6,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Svg width="100%" height="168" style={{ position: 'absolute' }}>
              <Defs>
                <LinearGradient
                  id="heroCardGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  {/* Ujung kiri atas: biru langit muda cerah #B0C8FF */}
                  <Stop offset="0%" stopColor="#B0C8FF" />
                  {/* Tengah: biru laut cerah #5B86F7 */}
                  <Stop offset="45%" stopColor="#5B86F7" />
                  {/* Kanan bawah: biru laut #4F75F6 */}
                  <Stop offset="100%" stopColor="#4F75F6" />
                </LinearGradient>

                {/* Sentuhan lavender di ujung kanan bawah */}
                <RadialGradient
                  id="lavenderBottomRight"
                  cx="95%"
                  cy="95%"
                  r="60%"
                  fx="95%"
                  fy="95%"
                >
                  <Stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.75" />
                  <Stop offset="45%" stopColor="#A78BFA" stopOpacity="0.4" />
                  <Stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#heroCardGrad)" />
              <Rect width="100%" height="100%" fill="url(#lavenderBottomRight)" />
            </Svg>

            <View style={{ padding: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* Left Info Column */}
                <View style={{ flex: 1, marginRight: 12 }}>
                  {/* Label + Eye Toggle */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsBalanceVisible(!isBalanceVisible)}
                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontWeight: '500',
                        marginRight: 6,
                      }}
                    >
                      Total Saldo
                    </Text>
                    {isBalanceVisible ? (
                      <Eye size={16} color="rgba(255, 255, 255, 0.85)" />
                    ) : (
                      <EyeOff size={16} color="rgba(255, 255, 255, 0.85)" />
                    )}
                  </TouchableOpacity>

                  {/* Nominal Balance */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      marginVertical: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#FFFFFF',
                        marginRight: 6,
                      }}
                    >
                      Rp
                    </Text>
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: '800',
                        color: '#FFFFFF',
                        letterSpacing: -0.3,
                      }}
                    >
                      {isBalanceVisible
                        ? formatIDR(DASHBOARD_DATA.totalBalance, false)
                        : '••••••••'}
                    </Text>
                  </View>

                  {/* Growth Percentage */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                  >
                    <TrendingUp size={15} color="#34D399" style={{ marginRight: 6 }} />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#34D399' }}>
                      {DASHBOARD_DATA.growthText}
                    </Text>
                  </View>
                </View>

                {/* Right Frosted Glass Wallet Icon Image - Centered Vertically */}
                <Image
                  source={require('../../assets/wallet-card-icon.png')}
                  style={{ width: 48, height: 48, alignSelf: 'center' }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>

        {/* ─── 4. ACCOUNTS SECTION ─────────────────────────────── */}
        <View style={{ marginBottom: 24 }}>
          {/* Header Row */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F172A' }}>
              Accounts
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#4F46E5' }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {/* 3 Separate Floating Cards */}
          {DASHBOARD_DATA.accounts.map((acc) => (
            <TouchableOpacity
              key={acc.id}
              activeOpacity={0.88}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#F1F5F9',
                shadowColor: '#4F46E5',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.04,
                shadowRadius: 12,
                elevation: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Left Pod: Icon + Name */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 14,
                    backgroundColor: acc.iconBg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  {renderAccountIcon(acc.iconType, acc.iconColor)}
                </View>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#0F172A' }}>
                  {acc.name}
                </Text>
              </View>

              {/* Right Pod: Balance + ChevronRight */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#0F172A' }}>
                  {formatIDR(acc.balance)}
                </Text>
                <ChevronRight size={18} color="#94A3B8" style={{ marginLeft: 8 }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ─── 5. SPENDING OVERVIEW SECTION ────────────────────── */}
        <View style={{ marginBottom: 20 }}>
          {/* Header Row */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F172A' }}>
              Spending Overview
            </Text>

            {/* Dropdown Pill */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 999,
                borderWidth: 1,
                borderColor: '#E2E8F0',
                paddingHorizontal: 12,
                paddingVertical: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#64748B', marginRight: 4 }}>
                This Month
              </Text>
              <ChevronDown size={14} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* White Card Container */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              padding: 20,
              borderWidth: 1,
              borderColor: '#F1F5F9',
              shadowColor: '#4F46E5',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.05,
              shadowRadius: 24,
              elevation: 3,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* Left Column: SVG Donut Chart */}
            <SpendingDonutChart
              categories={DASHBOARD_DATA.spendingOverview.categories}
              totalSpent={DASHBOARD_DATA.spendingOverview.totalSpent}
            />

            {/* Right Column: Legend List */}
            <View style={{ flex: 1, marginLeft: 16 }}>
              {DASHBOARD_DATA.spendingOverview.categories.map((cat) => (
                <View
                  key={cat.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 4,
                  }}
                >
                  {/* Dot + Category Name */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: cat.gradientStart,
                        marginRight: 8,
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: 12.5, fontWeight: '500', color: '#334155' }}
                    >
                      {cat.name}
                    </Text>
                  </View>

                  {/* Percentage */}
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A' }}>
                    {cat.percentage}%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
