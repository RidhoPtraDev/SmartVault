import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Home, ArrowLeftRight, FileText, User, Plus } from 'lucide-react-native';
import { useFinanceStore } from '../../store/useFinanceStore';

interface FloatingNavDockProps {
  onPressAdd?: () => void;
}

export const FloatingNavDock: React.FC<FloatingNavDockProps> = ({ onPressAdd }) => {
  const { activeTab, setActiveTab } = useFinanceStore();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'budget', label: 'Budget', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <View style={{ position: 'absolute', bottom: 20, left: 16, right: 16, alignItems: 'center', zIndex: 100 }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 999,
          paddingHorizontal: 16,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#3525CD',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 8,
          borderWidth: 1,
          borderColor: '#F1F5F9',
          width: '100%',
        }}
      >
        {/* Item 1: Home */}
        {(() => {
          const item = navItems[0];
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => setActiveTab(item.id)}
              style={{ alignItems: 'center', flex: 1 }}
            >
              <Icon size={22} color={isActive ? '#4F46E5' : '#94A3B8'} />
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 3,
                  fontWeight: '600',
                  color: isActive ? '#4F46E5' : '#94A3B8',
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })()}

        {/* Item 2: Transactions */}
        {(() => {
          const item = navItems[1];
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => setActiveTab(item.id)}
              style={{ alignItems: 'center', flex: 1 }}
            >
              <Icon size={22} color={isActive ? '#4F46E5' : '#94A3B8'} />
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 3,
                  fontWeight: '600',
                  color: isActive ? '#4F46E5' : '#94A3B8',
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })()}

        {/* Floating Add Action Button (FAB) */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={onPressAdd}
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: '#4F46E5',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -28,
            shadowColor: '#4F46E5',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 12,
            elevation: 6,
            borderWidth: 3,
            borderColor: '#FFFFFF',
          }}
        >
          <Plus size={26} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Item 3: Budget */}
        {(() => {
          const item = navItems[2];
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => setActiveTab(item.id)}
              style={{ alignItems: 'center', flex: 1 }}
            >
              <Icon size={22} color={isActive ? '#4F46E5' : '#94A3B8'} />
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 3,
                  fontWeight: '600',
                  color: isActive ? '#4F46E5' : '#94A3B8',
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })()}

        {/* Item 4: Profile */}
        {(() => {
          const item = navItems[3];
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => setActiveTab(item.id)}
              style={{ alignItems: 'center', flex: 1 }}
            >
              <Icon size={22} color={isActive ? '#4F46E5' : '#94A3B8'} />
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 3,
                  fontWeight: '600',
                  color: isActive ? '#4F46E5' : '#94A3B8',
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })()}
      </View>
    </View>
  );
};
