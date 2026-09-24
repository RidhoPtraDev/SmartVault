import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  PanResponder,
  useWindowDimensions,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Pencil,
  X,
  CheckCircle2,
  PiggyBank,
  Flag,
  Calendar,
  TrendingUp,
  Wallet,
  ArrowRight,
} from 'lucide-react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
} from 'react-native-svg';
import { SAVINGS_ACCOUNT_DATA, SAVINGS_PLAN_DATA } from '../constants/savingsAccountData';
import { formatIDR } from '../utils/formatCurrency';

interface SavingsAccountScreenProps {
  onBack?: () => void;
}

// ─── Inline: Savings Plan Panel ─────────────────────────────────────────────
const SavingsPlanPanel: React.FC = () => {
  const progressW = `${SAVINGS_PLAN_DATA.progressPercent}%`;

  return (
    <View style={{ paddingHorizontal: 20, paddingBottom: 80 }}>
      {/* ── Target Card ── */}
      <View
        style={{
          backgroundColor: '#F8FAFC',
          borderRadius: 20,
          padding: 20,
          borderWidth: 1,
          borderColor: '#E8EEFF',
          marginBottom: 16,
        }}
      >
        {/* Row 1: Label + Sisa Badge */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748B' }}>
            Target Total Tabungan
          </Text>
          <View
            style={{
              backgroundColor: '#ECFDF5',
              borderRadius: 999,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#10B981' }}>
              Sisa {formatIDR(SAVINGS_PLAN_DATA.remainingAmount)}
            </Text>
          </View>
        </View>

        {/* Row 2: Target Amount */}
        <Text
          style={{
            fontSize: 30,
            fontWeight: '800',
            color: '#4F46E5',
            marginBottom: 6,
            letterSpacing: -0.5,
          }}
        >
          {formatIDR(SAVINGS_PLAN_DATA.targetAmount)}
        </Text>

        {/* Row 3: Goal subtitle */}
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            color: '#64748B',
            marginBottom: 16,
            lineHeight: 18,
          }}
        >
          Tujuan: {SAVINGS_PLAN_DATA.goal}
        </Text>

        {/* Row 4: Collected + Percent */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#64748B' }}>
            {formatIDR(SAVINGS_PLAN_DATA.collectedAmount)} terkumpul
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#4F46E5' }}>
            {SAVINGS_PLAN_DATA.progressPercent}%
          </Text>
        </View>

        {/* Row 5: SVG Progress Bar */}
        <View
          style={{
            height: 10,
            borderRadius: 999,
            backgroundColor: '#EEF2FF',
            overflow: 'hidden',
          }}
        >
          <Svg width={progressW} height="10" style={{ position: 'absolute', left: 0, top: 0 }}>
            <Defs>
              <LinearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0%" stopColor="#4F46E5" />
                <Stop offset="100%" stopColor="#06B6D4" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="10" rx="5" ry="5" fill="url(#progressGrad)" />
          </Svg>
        </View>
      </View>

      {/* ── 2-column Mini-Cards ── */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {/* Left: Estimasi Capai */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E8EEFF',
            shadowColor: '#4F46E5',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#64748B', marginBottom: 6 }}>
            Estimasi Capai
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 4 }}>
            {SAVINGS_PLAN_DATA.estimatedMonth}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#4F46E5' }}>
            {SAVINGS_PLAN_DATA.monthsLeft} Bulan Lagi
          </Text>
        </View>

        {/* Right: Setoran Bulanan */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E8EEFF',
            shadowColor: '#4F46E5',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#64748B', marginBottom: 6 }}>
            Setoran Bulanan
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 4 }}>
            {formatIDR(SAVINGS_PLAN_DATA.monthlyDeposit)}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#10B981' }}>
            Target Perbulan
          </Text>
        </View>
      </View>
    </View>
  );
};

// ─── Inline: Savings Modal (Tambah Tabungan & Ubah Detail Tabungan) ──────────
interface SavingsModalProps {
  visible: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
}

const SavingsModal: React.FC<SavingsModalProps> = ({ visible, mode, onClose }) => {
  const [amount, setAmount] = useState('500.000');
  const [note, setNote] = useState(mode === 'add' ? '' : SAVINGS_PLAN_DATA.goal);
  const [selectedChip, setSelectedChip] = useState<string>('500');
  const [saved, setSaved] = useState(false);

  const quickChips = [
    { label: '+250rb', val: '250.000', id: '250' },
    { label: '+500rb', val: '500.000', id: '500' },
    { label: '+950rb', val: '950.000', id: '950' },
    { label: '+1jt', val: '1.000.000', id: '1000' },
  ];

  const handleSelectChip = (chip: typeof quickChips[0]) => {
    setSelectedChip(chip.id);
    setAmount(chip.val);
  };

  const handleClear = () => {
    setSelectedChip('');
    setAmount('0');
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Backdrop overlay */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
          }}
        />

        {/* Centered Popup Card */}
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 28,
              padding: 22,
              shadowColor: '#0F172A',
              shadowOffset: { width: 0, height: 16 },
              shadowOpacity: 0.25,
              shadowRadius: 30,
              elevation: 20,
            }}
          >
            {/* Header: Title + Close Button */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#0F172A', flex: 1 }}>
                {mode === 'add' ? 'Tambah Tabungan' : 'Ubah Detail Tabungan'}
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onClose}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#F1F5F9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Section: Catatan Tabungan (User Input) */}
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                borderWidth: 1.5,
                borderColor: '#EEF2FF',
                padding: 14,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 8 }}>
                {mode === 'add' ? 'Catatan Setoran' : 'Catatan Tabungan'}
              </Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder={
                  mode === 'add'
                    ? 'Tulis catatan setoran (opsional)...'
                    : 'Tulis catatan atau tujuan tabungan Anda...'
                }
                placeholderTextColor="#94A3B8"
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#0F172A',
                  paddingVertical: 2,
                }}
              />
            </View>

            {/* Section: Nominal Tabungan Card */}
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                borderWidth: 1.5,
                borderColor: '#EEF2FF',
                padding: 14,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 8 }}>
                Nominal Tabungan
              </Text>

              {/* Amount Row */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '800',
                    color: '#4F46E5',
                    marginRight: 6,
                  }}
                >
                  Rp
                </Text>
                <TextInput
                  value={amount}
                  onChangeText={(val) => {
                    setAmount(val);
                    setSelectedChip('');
                  }}
                  keyboardType="numeric"
                  style={{
                    flex: 1,
                    fontSize: 24,
                    fontWeight: '800',
                    color: '#0F172A',
                    padding: 0,
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleClear}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#E2E8F0',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={13} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Amount Chips (Only in Tambah Tabungan mode) */}
            {mode === 'add' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 6,
                  marginBottom: 14,
                }}
              >
                {quickChips.map((chip) => {
                  const isSelected = selectedChip === chip.id;
                  return (
                    <TouchableOpacity
                      key={chip.id}
                      activeOpacity={0.8}
                      onPress={() => handleSelectChip(chip)}
                      style={{
                        flex: 1,
                        paddingVertical: 8,
                        paddingHorizontal: 4,
                        borderRadius: 999,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isSelected ? '#4338CA' : '#F8FAFC',
                        borderWidth: isSelected ? 0 : 1,
                        borderColor: isSelected ? '#4338CA' : '#E2E8F0',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: isSelected ? '#FFFFFF' : '#475569',
                        }}
                      >
                        {chip.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* 2 Mini Info Cards Grid */}
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 18 }}>
              {/* Estimasi Tercapai */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#F1F5FD',
                  borderRadius: 18,
                  padding: 12,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Calendar size={15} color="#4F46E5" style={{ marginRight: 5 }} />
                  <Text style={{ fontSize: 11.5, fontWeight: '600', color: '#64748B' }}>
                    Estimasi Tercapai
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15.5,
                    fontWeight: '800',
                    color: '#0F172A',
                    marginTop: 4,
                    marginBottom: 3,
                  }}
                >
                  {SAVINGS_PLAN_DATA.estimatedMonth}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TrendingUp size={13} color="#10B981" style={{ marginRight: 4 }} />
                  <Text style={{ fontSize: 11.5, fontWeight: '700', color: '#10B981' }}>
                    {SAVINGS_PLAN_DATA.monthsLeft} Bulan Lagi
                  </Text>
                </View>
              </View>

              {/* Setoran Rutin */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#F1F5FD',
                  borderRadius: 18,
                  padding: 12,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Wallet size={15} color="#4F46E5" style={{ marginRight: 5 }} />
                  <Text style={{ fontSize: 11.5, fontWeight: '600', color: '#64748B' }}>
                    Setoran Rutin
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15.5,
                    fontWeight: '800',
                    color: '#0F172A',
                    marginTop: 4,
                    marginBottom: 3,
                  }}
                >
                  {formatIDR(SAVINGS_PLAN_DATA.monthlyDeposit)}
                </Text>
                <Text style={{ fontSize: 11, fontWeight: '500', color: '#64748B' }}>
                  Target / bln
                </Text>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSave}
              style={{
                height: 52,
                borderRadius: 26,
                backgroundColor: saved ? '#10B981' : '#4338CA',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
                shadowColor: '#4338CA',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 12,
                elevation: 4,
              }}
            >
              {saved ? (
                <>
                  <CheckCircle2 size={20} color="#FFFFFF" />
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
                    {mode === 'add' ? 'Tabungan Ditambahkan!' : 'Tersimpan!'}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
                    {mode === 'add' ? 'Simpan Tabungan' : 'Simpan Perbaruan'}
                  </Text>
                  <ArrowRight size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>

            {/* Batal Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              style={{ marginTop: 12, alignItems: 'center', paddingVertical: 4 }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#94A3B8' }}>
                Batal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// ─── Main Screen ─────────────────────────────────────────────────────────────
export const SavingsAccountScreen: React.FC<SavingsAccountScreenProps> = ({ onBack }) => {
  const { height: screenHeight } = useWindowDimensions();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(SAVINGS_ACCOUNT_DATA.activeMonth);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sheetMode, setSheetMode] = useState<'transactions' | 'plan'>('transactions');
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [modalVisible, setModalVisible] = useState(false);

  const EXPANDED_TOP = 76;
  const COLLAPSED_TOP = Math.max(345, Math.min(screenHeight * 0.44, 360));

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

  // PanResponder for dragging
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
        if (gestureState.dy < -50 || gestureState.vy < -0.4) {
          animateTo(EXPANDED_TOP);
        } else if (gestureState.dy > 50 || gestureState.vy > 0.4) {
          animateTo(COLLAPSED_TOP);
        } else {
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

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'qa-rencana') {
      setSheetMode('plan');
      animateTo(EXPANDED_TOP);
    } else if (actionId === 'qa-tambah') {
      setModalMode('add');
      setModalVisible(true);
    }
  };

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
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: '700', color: '#0F172A' }}>
            {SAVINGS_ACCOUNT_DATA.accountName}
          </Text>
        </View>
      </View>

      {/* ─── BACKGROUND CONTENT (HERO CARD & QUICK ACTIONS) ─── */}
      <View style={{ flex: 1 }}>
        {/* ─── 2. HERO KARTU SALDO ─── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <View
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 6,
              position: 'relative',
            }}
          >
            {/* Background Gradient */}
            <Svg width="100%" height="165" style={{ position: 'absolute' }}>
              <Defs>
                <LinearGradient id="savingsCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#3B82F6" />
                  <Stop offset="50%" stopColor="#6366F1" />
                  <Stop offset="100%" stopColor="#8B5CF6" />
                </LinearGradient>
                <RadialGradient
                  id="savingsLavenderGlow"
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
              <Rect width="100%" height="100%" fill="url(#savingsCardGrad)" />
              <Rect width="100%" height="100%" fill="url(#savingsLavenderGlow)" />
            </Svg>

            <View style={{ padding: 24 }}>
              {/* Row 1: Label + Eye */}
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
                  Saldo Tabungan
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

              {/* Row 2: Nominal */}
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
                    ? formatIDR(SAVINGS_ACCOUNT_DATA.balance, false)
                    : '••••••••'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─── 3. QUICK ACTION BUTTONS ─── */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 28,
            marginTop: 4,
            marginBottom: 20,
          }}
        >
          {SAVINGS_ACCOUNT_DATA.quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                activeOpacity={0.85}
                onPress={() => handleQuickAction(action.id)}
                style={{ alignItems: 'center', flex: 1, maxWidth: 150 }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 22,
                    backgroundColor: action.bgColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
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
                    lineHeight: 18,
                  }}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ─── 4. DRAGGABLE BOTTOM SHEET PANEL ─── */}
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
        {/* Drag Handle Area */}
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
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <TouchableOpacity activeOpacity={0.9} onPress={toggleSheet} style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F172A' }}>
                {sheetMode === 'plan' ? 'Rencana & Target' : 'Transaksi Tabungan'}
              </Text>
            </TouchableOpacity>

            {/* Right side buttons */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {/* Pencil button — only in plan mode */}
              {sheetMode === 'plan' && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setModalMode('edit');
                    setModalVisible(true);
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#E2E8F0',
                    shadowColor: '#0F172A',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                  }}
                >
                  <Pencil size={16} color="#4F46E5" />
                </TouchableOpacity>
              )}

              {/* Back to transactions button — only in plan mode */}
              {sheetMode === 'plan' && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSheetMode('transactions')}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#F1F5F9',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} color="#64748B" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* ── Sheet Content ── */}
        {sheetMode === 'plan' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <SavingsPlanPanel />
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
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
                {SAVINGS_ACCOUNT_DATA.monthChips.map((month) => {
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

              {/* Filter Icon */}
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

            {/* Transaction Groups */}
            {SAVINGS_ACCOUNT_DATA.transactionGroups.map((group) => (
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

                {/* Transactions */}
                {group.items.map((item, idx) => {
                  const isLast = idx === group.items.length - 1;
                  const formattedAmount = formatIDR(item.amount);
                  const IconComponent = item.icon;

                  return (
                    <View key={item.id}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingVertical: 10,
                          minHeight: 56,
                        }}
                      >
                        {/* Left: Icon + Details */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            marginRight: 12,
                          }}
                        >
                          <View
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 14,
                              backgroundColor: item.iconBgColor,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 14,
                            }}
                          >
                            <IconComponent size={20} color={item.iconColor} />
                          </View>

                          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: '600',
                                color: '#0F172A',
                                lineHeight: 20,
                              }}
                            >
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '500',
                                color: '#64748B',
                                marginTop: 4,
                                lineHeight: 16,
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
                            color: '#10B981',
                          }}
                        >
                          + {formattedAmount}
                        </Text>
                      </View>

                      {/* Divider */}
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
        )}
      </Animated.View>

      {/* ─── 5. SAVINGS MODAL (TAMBAH & UBAH) ─── */}
      <SavingsModal
        visible={modalVisible}
        mode={modalMode}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};
