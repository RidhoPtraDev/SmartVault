import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Animated,
  PanResponder,
  useWindowDimensions,
} from 'react-native';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Send,
  Wallet,
} from 'lucide-react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Stop, Rect } from 'react-native-svg';
import { MAIN_ACCOUNT_DATA } from '../constants/accountDetailData';
import { formatIDR } from '../utils/formatCurrency';

interface MainAccountScreenProps {
  onBack?: () => void;
}

export const MainAccountScreen: React.FC<MainAccountScreenProps> = ({ onBack }) => {
  const { height: screenHeight } = useWindowDimensions();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(MAIN_ACCOUNT_DATA.activeMonth);
  const [isExpanded, setIsExpanded] = useState(false);

  // Define snap positions in pixel coordinates from top of screen:
  // Expanded: top sits at 76px (just below the 68px top header)
  const EXPANDED_TOP = 76;
  // Collapsed: top sits just below the quick actions buttons (~57% of screen height)
  const COLLAPSED_TOP = Math.max(screenHeight * 0.57, 430);

  const translateY = useRef(new Animated.Value(COLLAPSED_TOP)).current;
  const currentY = useRef(COLLAPSED_TOP);

  const animateTo = (toValue: number) => {
    Animated.spring(translateY, {
      toValue,
      useNativeDriver: false,
      friction: 8,
      tension: 65,
    }).start(() => {
      currentY.current = toValue;
      setIsExpanded(toValue === EXPANDED_TOP);
    });
  };

  const toggleSheet = () => {
    if (isExpanded) {
      animateTo(COLLAPSED_TOP);
    } else {
      animateTo(EXPANDED_TOP);
    }
  };

  // PanResponder for dragging on handle bar and header
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderGrant: () => {
        translateY.stopAnimation((value) => {
          currentY.current = value;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        const nextY = currentY.current + gestureState.dy;
        if (nextY >= EXPANDED_TOP && nextY <= COLLAPSED_TOP + 60) {
          translateY.setValue(nextY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Dragged upward
        if (gestureState.dy < -50 || gestureState.vy < -0.4) {
          animateTo(EXPANDED_TOP);
        }
        // Dragged downward
        else if (gestureState.dy > 50 || gestureState.vy > 0.4) {
          animateTo(COLLAPSED_TOP);
        }
        // Snap to nearest
        else {
          const currentPos = currentY.current + gestureState.dy;
          const midPoint = (EXPANDED_TOP + COLLAPSED_TOP) / 2;
          if (currentPos < midPoint) {
            animateTo(EXPANDED_TOP);
          } else {
            animateTo(COLLAPSED_TOP);
          }
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF8FF' }}>
      {/* ─── 1. TOP HEADER (STATIC) ─── */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          height: 68,
          zIndex: 10,
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#F1F5F9',
            shadowColor: '#0F172A',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
            marginRight: 16,
          }}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#0F172A' }}>
          {MAIN_ACCOUNT_DATA.accountName}
        </Text>
      </View>

      {/* ─── BACKGROUND CONTENT (HERO CARD & QUICK ACTIONS) ─── */}
      <View style={{ flex: 1 }}>
        {/* ─── 2. HERO KARTU SALDO (LEBIH BESAR & LEGA) ─── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
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
            }}
          >
            {/* Background Ocean Blue + Lavender Accent Gradient (Matching Dashboard Total Saldo Card) */}
            <Svg width="100%" height="165" style={{ position: 'absolute' }}>
              <Defs>
                <LinearGradient
                  id="accountCardGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#B0C8FF" />
                  <Stop offset="45%" stopColor="#5B86F7" />
                  <Stop offset="100%" stopColor="#4F75F6" />
                </LinearGradient>

                <RadialGradient
                  id="accountLavenderGlow"
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
              <Rect width="100%" height="100%" fill="url(#accountCardGrad)" />
              <Rect width="100%" height="100%" fill="url(#accountLavenderGlow)" />
            </Svg>

            <View style={{ padding: 24 }}>
              {/* Row 1: Saldo Efektif + Eye Toggle */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#FFFFFF',
                    marginRight: 8,
                    opacity: 0.95,
                  }}
                >
                  Saldo Efektif
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsBalanceVisible(!isBalanceVisible)}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    backgroundColor: 'rgba(255, 255, 255, 0.22)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isBalanceVisible ? (
                    <Eye size={15} color="#FFFFFF" />
                  ) : (
                    <EyeOff size={15} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Row 2: Nominal Saldo */}
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '800',
                    color: '#FFFFFF',
                    marginRight: 6,
                  }}
                >
                  Rp
                </Text>
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: '800',
                    color: '#FFFFFF',
                    letterSpacing: -0.5,
                  }}
                >
                  {isBalanceVisible
                    ? formatIDR(MAIN_ACCOUNT_DATA.balance, false)
                    : '••••••••'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─── 3. QUICK ACTION BUTTONS (KEBAWAHIN DIKIT) ─── */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 36,
            marginTop: 4,
            marginBottom: 24,
          }}
        >
          {MAIN_ACCOUNT_DATA.quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                activeOpacity={0.8}
                style={{ alignItems: 'center' }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 22,
                    backgroundColor: action.bgColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                    shadowColor: action.iconColor,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 2,
                  }}
                >
                  <IconComponent size={26} color={action.iconColor} />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: '#0F172A',
                    textAlign: 'center',
                  }}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ─── 4. DRAGGABLE & EXPANDABLE BOTTOM SHEET PANEL ─── */}
      <Animated.View
        style={{
          position: 'absolute',
          top: translateY,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          borderWidth: 1,
          borderColor: '#F1F5F9',
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 12,
          zIndex: 20,
        }}
      >
        {/* Drag Handle Area (Swipe Up / Down or Tap to Expand / Collapse) */}
        <View
          {...panResponder.panHandlers}
          style={{
            paddingTop: 12,
            paddingBottom: 8,
            paddingHorizontal: 20,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        >
          {/* Drag Handle Bar */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleSheet}
            style={{
              width: 50,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: '#CBD5E1',
              marginBottom: 10,
            }}
          />

          {/* Section Header Row */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleSheet}
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#0F172A',
              }}
            >
              Semua transaksi
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Transaction List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 80,
          }}
        >
          {/* Month Filter Chips */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: 'row', gap: 8, flex: 1 }}>
              {MAIN_ACCOUNT_DATA.monthChips.map((month) => {
                const isActive = selectedMonth === month;
                return (
                  <TouchableOpacity
                    key={month}
                    activeOpacity={0.8}
                    onPress={() => setSelectedMonth(month)}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 7,
                      borderRadius: 999,
                      backgroundColor: isActive ? '#4F46E5' : '#F8FAFC',
                      borderWidth: isActive ? 0 : 1,
                      borderColor: '#E2E8F0',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: isActive ? '700' : '500',
                        color: isActive ? '#FFFFFF' : '#64748B',
                      }}
                    >
                      {month}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Filter Icon Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <SlidersHorizontal size={18} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Transaction Groups by Date */}
          {MAIN_ACCOUNT_DATA.transactionGroups.map((group) => (
            <View key={group.date} style={{ marginBottom: 16 }}>
              {/* Date Header */}
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: '#0F172A',
                  marginBottom: 12,
                }}
              >
                {group.date}
              </Text>

              {/* Transactions in Date Group */}
              {group.items.map((item, idx) => {
                const isLast = idx === group.items.length - 1;
                const formattedAmount = formatIDR(item.amount);

                return (
                  <View key={item.id}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                      }}
                    >
                      {/* Left: Icon Pod + Details */}
                      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <View
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: item.imageSource ? 22 : 14,
                            backgroundColor: item.iconBgColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 14,
                            overflow: 'hidden',
                          }}
                        >
                          {item.imageSource ? (
                            <Image
                              source={item.imageSource}
                              style={{ width: 52, height: 52 }}
                              resizeMode="cover"
                            />
                          ) : (
                            item.icon && <item.icon size={20} color={item.iconColor} />
                          )}
                        </View>

                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '600',
                              color: '#0F172A',
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                              color: '#64748B',
                              marginTop: 2,
                            }}
                          >
                            {item.category}
                          </Text>
                        </View>
                      </View>

                      {/* Right: Amount */}
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#DC2626',
                          marginLeft: 12,
                        }}
                      >
                        - {formattedAmount}
                      </Text>
                    </View>

                    {/* Divider between items in same date group */}
                    {!isLast && (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: '#F1F5F9',
                          marginVertical: 4,
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};
