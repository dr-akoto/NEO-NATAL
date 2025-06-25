import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TriangleAlert as AlertTriangle, Phone, MapPin, Clock, Heart, Users, Zap } from 'lucide-react-native';

export default function EmergencyScreen() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [location, setLocation] = useState('Getting location...');

  const emergencyContacts = [
    { id: '1', name: 'Emergency Services', number: '112', type: 'primary' },
    { id: '2', name: 'Ridge Hospital', number: '+233 30 2684000', type: 'hospital' },
    { id: '3', name: 'Dr. Kwame Mensah', number: '+233 20 123 4567', type: 'doctor' },
    { id: '4', name: 'Emergency Contact', number: '+233 24 987 6543', type: 'family' },
  ];

  const dangerSigns = [
    'Severe bleeding',
    'Severe headache with blurred vision',
    'High fever (over 38°C)',
    'Persistent vomiting',
    'Severe abdominal pain',
    'Difficulty breathing',
    'Swelling of face/hands',
    'No fetal movement for 12+ hours',
  ];

  useEffect(() => {
    if (isEmergencyActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isEmergencyActive && countdown === 0) {
      handleEmergencyCall();
    }
  }, [isEmergencyActive, countdown]);

  const handleSOSPress = () => {
    Alert.alert(
      'Emergency SOS',
      'This will call emergency services and notify your emergency contacts with your location. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm Emergency', 
          style: 'destructive',
          onPress: () => {
            setIsEmergencyActive(true);
            setCountdown(5);
            // In a real app, this would get actual GPS coordinates
            setLocation('University of Ghana, Legon - GPS: 5.6470° N, 0.1890° W');
          }
        },
      ]
    );
  };

  const handleEmergencyCall = () => {
    setIsEmergencyActive(false);
    setCountdown(5);
    Linking.openURL('tel:112');
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setCountdown(5);
  };

  const callNumber = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'primary':
        return <AlertTriangle color="#FFFFFF" size={20} />;
      case 'hospital':
        return <Heart color="#FFFFFF" size={20} />;
      case 'doctor':
        return <Users color="#FFFFFF" size={20} />;
      default:
        return <Phone color="#FFFFFF" size={20} />;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'primary':
        return ['#EF4444', '#DC2626'];
      case 'hospital':
        return ['#3B82F6', '#1D4ED8'];
      case 'doctor':
        return ['#10B981', '#047857'];
      default:
        return ['#8B5CF6', '#7C3AED'];
    }
  };

  if (isEmergencyActive) {
    return (
      <SafeAreaView style={styles.emergencyContainer}>
        <LinearGradient
          colors={['#EF4444', '#DC2626']}
          style={styles.emergencyBackground}
        >
          <View style={styles.emergencyContent}>
            <View style={styles.emergencyIcon}>
              <AlertTriangle color="#FFFFFF" size={64} />
            </View>
            
            <Text style={styles.emergencyTitle}>Emergency SOS Active</Text>
            <Text style={styles.emergencySubtitle}>
              Calling emergency services in {countdown} seconds
            </Text>
            
            <View style={styles.countdownCircle}>
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>

            <View style={styles.locationContainer}>
              <MapPin color="#FFFFFF" size={20} />
              <Text style={styles.locationText}>{location}</Text>
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelEmergency}
            >
              <Text style={styles.cancelButtonText}>Cancel Emergency</Text>
            </TouchableOpacity>

            <Text style={styles.emergencyNote}>
              Your emergency contacts will be notified with your location
            </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#EF4444', '#DC2626']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <AlertTriangle color="#FFFFFF" size={32} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Emergency</Text>
            <Text style={styles.headerSubtitle}>Quick access to emergency help</Text>
          </View>
        </View>
      </LinearGradient>

      {/* SOS Button */}
      <View style={styles.sosContainer}>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={handleSOSPress}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.sosGradient}
          >
            <Zap color="#FFFFFF" size={48} />
            <Text style={styles.sosText}>SOS</Text>
            <Text style={styles.sosSubtext}>Hold to call emergency</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.sosDescription}>
          Tap to activate emergency SOS. This will call 112 and notify your emergency contacts with your location.
        </Text>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <View style={styles.contactsList}>
          {emergencyContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => callNumber(contact.number)}
            >
              <LinearGradient
                colors={getContactColor(contact.type)}
                style={styles.contactIcon}
              >
                {getContactIcon(contact.type)}
              </LinearGradient>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
              <Phone color="#64748B" size={20} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Danger Signs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>When to Seek Emergency Help</Text>
        <Text style={styles.sectionSubtitle}>
          Call immediately if you experience any of these symptoms:
        </Text>
        <View style={styles.dangerSignsList}>
          {dangerSigns.map((sign, index) => (
            <View key={index} style={styles.dangerSignItem}>
              <AlertTriangle color="#EF4444" size={16} />
              <Text style={styles.dangerSignText}>{sign}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Instructions</Text>
        <View style={styles.instructionsList}>
          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>1</Text>
            </View>
            <Text style={styles.instructionText}>Stay calm and assess the situation</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>2</Text>
            </View>
            <Text style={styles.instructionText}>Call emergency services (112) immediately</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>3</Text>
            </View>
            <Text style={styles.instructionText}>Provide your location and describe the emergency</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>4</Text>
            </View>
            <Text style={styles.instructionText}>Follow the dispatcher's instructions</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  emergencyContainer: {
    flex: 1,
  },
  emergencyBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emergencyIcon: {
    marginBottom: 24,
  },
  emergencyTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  emergencySubtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#FECACA',
    textAlign: 'center',
    marginBottom: 40,
  },
  countdownCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  countdownText: {
    fontSize: 48,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    marginLeft: 8,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    marginBottom: 24,
  },
  cancelButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#EF4444',
  },
  emergencyNote: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FECACA',
    textAlign: 'center',
    lineHeight: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FECACA',
    marginTop: 4,
  },
  sosContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  sosGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  sosSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FECACA',
    marginTop: 4,
  },
  sosDescription: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 24,
  },
  contactsList: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  contactNumber: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginTop: 2,
  },
  dangerSignsList: {
    gap: 12,
  },
  dangerSignItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  dangerSignText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1E293B',
    marginLeft: 12,
    flex: 1,
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructionNumberText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  instructionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1E293B',
    flex: 1,
    lineHeight: 24,
  },
});