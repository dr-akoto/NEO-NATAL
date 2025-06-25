import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Stethoscope, Heart, Pill } from 'lucide-react-native';

type UserRole = 'mother' | 'health-worker' | 'doctor' | 'pharmacy';

interface Role {
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string[];
}

const roles: Role[] = [
  {
    id: 'mother',
    title: 'Pregnant Mother',
    description: 'Track your pregnancy journey with AI-powered insights and support',
    icon: <Heart color="#FFFFFF" size={32} />,
    gradient: ['#EC4899', '#BE185D'],
  },
  {
    id: 'health-worker',
    title: 'Health Worker / Midwife',
    description: 'Support multiple patients with professional healthcare tools',
    icon: <User color="#FFFFFF" size={32} />,
    gradient: ['#10B981', '#047857'],
  },
  {
    id: 'doctor',
    title: 'Doctor / Specialist',
    description: 'Provide telemedicine consultations and monitor patient health',
    icon: <Stethoscope color="#FFFFFF" size={32} />,
    gradient: ['#3B82F6', '#1D4ED8'],
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy Operator',
    description: 'Manage medicine inventory and fulfill prescription orders',
    icon: <Pill color="#FFFFFF" size={32} />,
    gradient: ['#8B5CF6', '#7C3AED'],
  },
];

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const router = useRouter();

  const handleRoleSelect = (roleId: UserRole) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      router.push({
        pathname: '/(auth)/register',
        params: { role: selectedRole },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#EFF6FF']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Choose Your Role</Text>
            <Text style={styles.subtitle}>
              Select how you'll be using MamaAI to get personalized features
            </Text>
          </View>

          <View style={styles.rolesContainer}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleCard,
                  selectedRole === role.id && styles.selectedCard,
                ]}
                onPress={() => handleRoleSelect(role.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={role.gradient}
                  style={styles.iconContainer}
                >
                  {role.icon}
                </LinearGradient>
                <View style={styles.roleContent}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedRole === role.id && styles.selectedRadio,
                ]} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedRole && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedRole}
          >
            <Text style={[
              styles.continueButtonText,
              !selectedRole && styles.disabledButtonText,
            ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  rolesContainer: {
    marginBottom: 32,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedCard: {
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    marginLeft: 12,
  },
  selectedRadio: {
    borderColor: '#3B82F6',
    backgroundColor: '#3B82F6',
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#CBD5E1',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  disabledButtonText: {
    color: '#94A3B8',
  },
});