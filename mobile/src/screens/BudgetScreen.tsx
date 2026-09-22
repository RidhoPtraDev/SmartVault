import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Menu,
  MoreVertical,
  TrendingUp,
  Lightbulb,
} from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { MONTHLY_BUDGET_SUMMARY, BUDGET_CATEGORIES } from '../constants/budgetData';
import { formatIDR } from '../utils/formatCurrency';

export const BudgetScreen: React.FC = () => {
  const summary = MONTHLY_BUDGET_SUMMARY;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF8FF' }}>
      {/* ─── 1. TOP APP BAR (same spacing as DashboardScreen & TransactionsScreen) ─── */}
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
        {/* Left: Menu Button */}
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
          <Menu size={20} color="#0F172A" />
        </TouchableOpacity>

        {/* Centre: Title */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F172A' }}>
          Budget
        </Text>

        {/* Right: More Options Button */}
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
          <MoreVertical size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110, paddingTop: 4 }}
      >
        {/* ─── 2. MONTHLY BUDGET SUMMARY CARD ─── */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: 20,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#F1F5F9',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          {/* Label */}
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#64748B', marginBottom: 4 }}>
            Monthly Budget
          </Text>

          {/* Nominal */}
          <Text style={{ fontSize: 26, fontWeight: '800', color: '#0F172A', marginBottom: 14, letterSpacing: -0.3 }}>
            {formatIDR(summary.totalLimit)}
          </Text>

          {/* Progress Bar */}
          <View
            style={{
              height: 10,
              borderRadius: 999,
              backgroundColor: '#EEF2FF',
              overflow: 'hidden',
              marginBottom: 10,
            }}
          >
            <View style={{ flex: 1, borderRadius: 999, overflow: 'hidden' }}>
              <Svg
                width={`${summary.percentage}%`}
                height="10"
                style={{ position: 'absolute' }}
              >
                <Defs>
                  <LinearGradient id="budgetBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#707DFE" />
                    <Stop offset="100%" stopColor="#4F46E5" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="10" rx="5" fill="url(#budgetBarGrad)" />
              </Svg>
            </View>
          </View>

          {/* Footer Row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: '#64748B', fontWeight: '500' }}>
              {summary.percentage}% of budget used
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ECFDF5',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
              }}
            >
              <TrendingUp size={13} color="#10B981" style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#10B981' }}>
                On Track
              </Text>
            </View>
          </View>
        </View>

        {/* ─── 3. CATEGORIES SECTION HEADER ─── */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#0F172A' }}>
            Categories
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#4F46E5' }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── 4. COMBINED CATEGORIES CARD ─── */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            borderWidth: 1,
            borderColor: '#F1F5F9',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 10,
            elevation: 2,
            marginBottom: 24,
            overflow: 'hidden',
          }}
        >
          {BUDGET_CATEGORIES.map((cat, index) => {
            const IconComponent = cat.icon;
            const isLast = index === BUDGET_CATEGORIES.length - 1;
            const usesGradient = cat.barType === 'gradient-violet' || cat.barType === 'gradient-orange';

            return (
              <View key={cat.id}>
                {/* Row */}
                <View style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
                  {/* Top Row: Icon + Name + Percentage */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    {/* Icon Pod */}
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 14,
                        backgroundColor: cat.iconBgColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <IconComponent size={20} color={cat.iconColor} />
                    </View>

                    {/* Category Name */}
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 15,
                        fontWeight: '600',
                        color: '#1E293B',
                      }}
                    >
                      {cat.name}
                    </Text>

                    {/* Percentage */}
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#0F172A' }}>
                      {cat.percentage}%
                    </Text>
                  </View>

                  {/* Progress Bar (thin h-2) */}
                  <View
                    style={{
                      height: 7,
                      borderRadius: 999,
                      backgroundColor: '#EEF2FF',
                      overflow: 'hidden',
                      marginBottom: 6,
                      marginLeft: 52, // align with text, after icon (40 + 12 margin)
                    }}
                  >
                    {usesGradient ? (
                      <View style={{ width: `${cat.percentage}%` as any, height: 7, borderRadius: 999, overflow: 'hidden' }}>
                        <Svg width="100%" height="7" style={{ position: 'absolute' }}>
                          <Defs>
                            <LinearGradient id={`catGrad-${cat.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <Stop offset="0%" stopColor={cat.barColor} />
                              <Stop offset="100%" stopColor={cat.barColorEnd ?? cat.barColor} />
                            </LinearGradient>
                          </Defs>
                          <Rect width="100%" height="7" rx="3.5" fill={`url(#catGrad-${cat.id})`} />
                        </Svg>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: `${cat.percentage}%`,
                          height: 7,
                          borderRadius: 999,
                          backgroundColor: cat.barColor,
                        }}
                      />
                    )}
                  </View>

                  {/* Spent / Limit row */}
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#64748B',
                      fontWeight: '500',
                      marginLeft: 52,
                    }}
                  >
                    {formatIDR(cat.spent)} / {formatIDR(cat.limit)}
                  </Text>
                </View>

                {/* Hairline divider between rows */}
                {!isLast && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#F1F5F9',
                      marginHorizontal: 16,
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>

        {/* ─── 5. SMART INSIGHT CARD ─── */}
        <View
          style={{
            backgroundColor: '#EEF2FF',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#E0E7FF',
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* Lightbulb Icon in white circle */}
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
              shadowColor: '#4F46E5',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Lightbulb size={18} color="#4F46E5" />
          </View>

          {/* Text Block */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '700',
                color: '#4F46E5',
                letterSpacing: 0.8,
                marginBottom: 3,
              }}
            >
              SMART INSIGHT
            </Text>
            <Text
              style={{ fontSize: 13, color: '#334155', fontWeight: '400', lineHeight: 18 }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Hemat Rp 120.000 lebih banyak untuk Tagih...
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
