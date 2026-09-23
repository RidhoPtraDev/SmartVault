import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { SlidersHorizontal, LucideIcon } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Stop, Rect } from 'react-native-svg';
import { useFinanceStore } from '../store/useFinanceStore';
import { TRANSACTION_GROUPS, GroupedTransactionItem } from '../constants/transactionsData';
import { formatIDR } from '../utils/formatCurrency';

export const TransactionsScreen: React.FC = () => {
  const { setActiveTab } = useFinanceStore();
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  // Filter transactions based on selected tab ('all' | 'income' | 'expense')
  const filterItem = (item: GroupedTransactionItem) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  };

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
        {/* Title */}
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#0F172A' }}>
          Transactions
        </Text>

        {/* Filter Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#F1F5F9',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#0F172A',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <SlidersHorizontal size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110, paddingTop: 4 }}
      >
        {/* ─── 2. SEGMENTED FILTER CONTROL (TAB AKTIF PAKAI GRADIENT HOME CARD) ─── */}
        <View
          style={{
            backgroundColor: '#F1F5F9',
            borderRadius: 999,
            padding: 5,
            flexDirection: 'row',
            marginBottom: 20,
          }}
        >
          {(['all', 'income', 'expense'] as const).map((type) => {
            const isActive = filterType === type;
            const label = type === 'all' ? 'All' : type === 'income' ? 'Income' : 'Expense';

            return (
              <TouchableOpacity
                key={type}
                activeOpacity={0.8}
                onPress={() => setFilterType(type)}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 999,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  shadowColor: isActive ? '#5B86F7' : 'transparent',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: isActive ? 0.25 : 0,
                  shadowRadius: 6,
                  elevation: isActive ? 3 : 0,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Background Gradient untuk Tab Aktif (Persis Total Saldo Card di HomeScreen) */}
                {isActive && (
                  <Svg width="100%" height="100%" style={{ position: 'absolute' }}>
                    <Defs>
                      <LinearGradient
                        id={`activeTabGrad-${type}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        {/* Kiri atas: biru langit muda cerah #B0C8FF */}
                        <Stop offset="0%" stopColor="#B0C8FF" />
                        {/* Tengah: biru laut cerah #5B86F7 */}
                        <Stop offset="45%" stopColor="#5B86F7" />
                        {/* Kanan bawah: biru laut #4F75F6 */}
                        <Stop offset="100%" stopColor="#4F75F6" />
                      </LinearGradient>
                      {/* Sentuhan lavender di ujung kanan bawah */}
                      <RadialGradient
                        id={`activeTabLavender-${type}`}
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
                    <Rect width="100%" height="100%" fill={`url(#activeTabGrad-${type})`} />
                    <Rect width="100%" height="100%" fill={`url(#activeTabLavender-${type})`} />
                  </Svg>
                )}

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#FFFFFF' : '#64748B',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ─── 3. TRANSACTION GROUPS ─── */}
        {TRANSACTION_GROUPS.map((group) => {
          const filteredItems = group.items.filter(filterItem);
          if (filteredItems.length === 0) return null;

          return (
            <View key={group.dateGroup} style={{ marginBottom: 20 }}>
              {/* Group Header */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#1E293B' }}>
                  {group.dateGroup}
                </Text>
                <View
                  style={{
                    backgroundColor: '#F1F5F9',
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 999,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '500', color: '#94A3B8' }}>
                    {filteredItems.length} items
                  </Text>
                </View>
              </View>

              {/* Transaction Cards */}
              {filteredItems.map((item) => {
                const isExpense = item.type === 'expense';
                const formattedAmount = formatIDR(item.amount);
                const isCircularImage = item.iconBgColor === 'transparent' && !!item.imageSource;
                const isClippedJpeg = isCircularImage;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.85}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 20,
                      padding: 16,
                      marginBottom: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      borderColor: 'rgba(241, 245, 249, 0.8)',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.03,
                      shadowRadius: 8,
                      elevation: 1,
                    }}
                  >
                    {/* Left Icon Pod + Info */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <View
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: isCircularImage ? 22 : 14,
                          backgroundColor: item.iconBgColor,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 14,
                          overflow: 'hidden',
                        }}
                      >
                        {isCircularImage ? (
                          <Image
                            source={item.imageSource}
                            style={{
                              width: isClippedJpeg ? 52 : 45,
                              height: isClippedJpeg ? 52 : 45,
                            }}
                            resizeMode="cover"
                          />
                        ) : item.imageSource ? (
                          <Image
                            source={item.imageSource}
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                          />
                        ) : (
                          item.icon && <item.icon size={22} color={item.iconColor} />
                        )}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#0F172A' }}>
                          {item.title}
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#94A3B8', marginTop: 2 }}>
                          {item.category} • {item.time}
                        </Text>
                      </View>
                    </View>

                    {/* Right Amount */}
                    <View style={{ alignItems: 'flex-end', marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: isExpense ? '#EF4444' : '#10B981',
                        }}
                      >
                        {isExpense ? `- ${formattedAmount}` : `+ ${formattedAmount}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
