import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Heart, Baby, Shield } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800' }}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(59, 130, 246, 0.9)', 'rgba(139, 92, 246, 0.9)']}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <Heart color="#FFFFFF" size={40} />
              <Baby color="#FFFFFF" size={36} style={styles.babyIcon} />
            </View>
            <Text style={styles.title}>MamaAI</Text>
            <Text style={styles.subtitle}>Your AI-Powered Maternal Health Companion</Text>
          </View>

          <View style={styles.featuresSection}>
            <View style={styles.feature}>
              <Heart color="#FFFFFF" size={24} />
              <Text style={styles.featureText}>24/7 AI Health Assistant</Text>
            </View>
            <View style={styles.feature}>
              <Shield color="#FFFFFF" size={24} />
              <Text style={styles.featureText}>Emergency Response System</Text>
            </View>
            <View style={styles.feature}>
              <Baby color="#FFFFFF" size={24} />
              <Text style={styles.featureText}>Pregnancy Journey Tracking</Text>
            </View>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/(auth)/role-selection')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.languageSection}>
            <Text style={styles.languageText}>Available in English • Twi • Hausa • Ewe • Ga • Français</Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  babyIcon: {
    marginLeft: -8,
  },
  title: {
    fontSize: 48,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 26,
  },
  featuresSection: {
    marginVertical: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  buttonSection: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#3B82F6',
    textAlign: 'center',
  },
  secondaryButton: {
    paddingVertical: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#E0E7FF',
    textAlign: 'center',
  },
  languageSection: {
    alignItems: 'center',
  },
  languageText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#C7D2FE',
    textAlign: 'center',
  },
});