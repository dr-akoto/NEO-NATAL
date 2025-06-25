import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, MapPin, Video, Phone, Plus, User } from 'lucide-react-native';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  location?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function AppointmentsScreen() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed'>('upcoming');
  
  const appointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Kwame Mensah',
      specialty: 'Obstetrician',
      date: 'Today',
      time: '2:00 PM',
      type: 'in-person',
      location: 'Ridge Hospital, Accra',
      status: 'upcoming',
    },
    {
      id: '2',
      doctorName: 'Dr. Akosua Asante',
      specialty: 'Gynecologist',
      date: 'Tomorrow',
      time: '10:30 AM',
      type: 'video',
      status: 'upcoming',
    },
    {
      id: '3',
      doctorName: 'Dr. Emmanuel Osei',
      specialty: 'Pediatrician',
      date: 'Jan 25',
      time: '3:00 PM',
      type: 'in-person',
      location: 'Korle Bu Teaching Hospital',
      status: 'upcoming',
    },
    {
      id: '4',
      doctorName: 'Dr. Kwame Mensah',
      specialty: 'Obstetrician',
      date: 'Jan 15',
      time: '2:00 PM',
      type: 'in-person',
      location: 'Ridge Hospital, Accra',
      status: 'completed',
    },
  ];

  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const completedAppointments = appointments.filter(app => app.status === 'completed');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video color="#3B82F6" size={20} />;
      case 'phone':
        return <Phone color="#10B981" size={20} />;
      default:
        return <MapPin color="#8B5CF6" size={20} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video Call';
      case 'phone':
        return 'Phone Call';
      default:
        return 'In-Person';
    }
  };

  const renderAppointment = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.doctorInfo}>
          <View style={styles.doctorAvatar}>
            <User color="#64748B" size={24} />
          </View>
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.specialty}>{appointment.specialty}</Text>
          </View>
        </View>
        <View style={styles.typeIndicator}>
          {getTypeIcon(appointment.type)}
          <Text style={styles.typeLabel}>{getTypeLabel(appointment.type)}</Text>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Calendar color="#64748B" size={16} />
          <Text style={styles.detailText}>{appointment.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock color="#64748B" size={16} />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
        {appointment.location && (
          <View style={styles.detailRow}>
            <MapPin color="#64748B" size={16} />
            <Text style={styles.detailText}>{appointment.location}</Text>
          </View>
        )}
      </View>

      {appointment.status === 'upcoming' && (
        <View style={styles.appointmentActions}>
          {appointment.type === 'video' && (
            <TouchableOpacity style={[styles.actionButton, styles.joinButton]}>
              <Video color="#FFFFFF" size={16} />
              <Text style={styles.joinButtonText}>Join Call</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.actionButton, styles.rescheduleButton]}>
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Appointments</Text>
          <Text style={styles.headerSubtitle}>Manage your healthcare visits</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
            Upcoming ({upcomingAppointments.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'completed' && styles.activeTab]}
          onPress={() => setSelectedTab('completed')}
        >
          <Text style={[styles.tabText, selectedTab === 'completed' && styles.activeTabText]}>
            Completed ({completedAppointments.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.appointmentsList}>
          {selectedTab === 'upcoming' && upcomingAppointments.length === 0 && (
            <View style={styles.emptyState}>
              <Calendar color="#CBD5E1" size={64} />
              <Text style={styles.emptyStateTitle}>No upcoming appointments</Text>
              <Text style={styles.emptyStateText}>
                Book your next appointment to stay on track with your pregnancy care
              </Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          )}

          {selectedTab === 'upcoming' && upcomingAppointments.map(renderAppointment)}
          {selectedTab === 'completed' && completedAppointments.map(renderAppointment)}
        </View>
      </ScrollView>

      {/* Quick Book Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          style={styles.floatingButtonGradient}
        >
          <Plus color="#FFFFFF" size={28} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#E0E7FF',
    marginTop: 4,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: -12,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    marginTop: 24,
  },
  appointmentsList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  specialty: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginTop: 2,
  },
  typeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
    marginLeft: 4,
  },
  appointmentDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  joinButton: {
    backgroundColor: '#3B82F6',
  },
  joinButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  rescheduleButton: {
    backgroundColor: '#F59E0B',
  },
  rescheduleButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  floatingButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});