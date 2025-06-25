import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Baby, Calendar, Pill, TrendingUp, CircleAlert as AlertCircle, CircleCheck as CheckCircle, MessageCircle, Bell, Settings } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface HealthMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  status: 'good' | 'warning' | 'danger';
  icon: React.ReactNode;
}

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  type: 'medication' | 'appointment' | 'exercise' | 'hydration';
}

export default function HomeScreen() {
  const [currentWeek, setCurrentWeek] = useState(28);
  const [babySize, setBabySize] = useState('Eggplant');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Take prenatal vitamins', time: '9:00 AM', completed: true, type: 'medication' },
    { id: '2', title: 'Doctor appointment', time: '2:00 PM', completed: false, type: 'appointment' },
    { id: '3', title: 'Drink water (8 glasses)', time: 'Throughout day', completed: false, type: 'hydration' },
    { id: '4', title: 'Light exercise', time: '5:00 PM', completed: false, type: 'exercise' },
  ]);

  const healthMetrics: HealthMetric[] = [
    {
      id: '1',
      title: 'Blood Pressure',
      value: '120',
      unit: '/80 mmHg',
      status: 'good',
      icon: <Heart color="#10B981" size={20} />
    },
    {
      id: '2',
      title: 'Weight Gain',
      value: '+12',
      unit: 'kg',
      status: 'good',
      icon: <TrendingUp color="#10B981" size={20} />
    },
    {
      id: '3',
      title: 'Baby Heart Rate',
      value: '150',
      unit: 'bpm',
      status: 'good',
      icon: <Baby color="#10B981" size={20} />
    },
  ];

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}, Sarah!</Text>
            <Text style={styles.subtitle}>How are you feeling today?</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell color="#64748B" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings color="#64748B" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pregnancy Progress Card */}
        <LinearGradient
          colors={['#EC4899', '#BE185D']}
          style={styles.progressCard}
        >
          <View style={styles.progressContent}>
            <View>
              <Text style={styles.progressWeek}>Week {currentWeek}</Text>
              <Text style={styles.progressDescription}>
                Your baby is now the size of an {babySize.toLowerCase()}!
              </Text>
              <Text style={styles.progressDetail}>
                12 weeks to go • Third trimester
              </Text>
            </View>
            <View style={styles.babyIcon}>
              <Baby color="#FFFFFF" size={48} />
            </View>
          </View>
          
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(currentWeek / 40) * 100}%` }]} />
          </View>
        </LinearGradient>

        {/* Health Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Health Metrics</Text>
          <View style={styles.metricsGrid}>
            {healthMetrics.map((metric) => (
              <View key={metric.id} style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  {metric.icon}
                  <Text style={styles.metricTitle}>{metric.title}</Text>
                </View>
                <Text style={styles.metricValue}>
                  {metric.value}
                  <Text style={styles.metricUnit}>{metric.unit}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* AI Insights */}
        <TouchableOpacity style={styles.insightCard}>
          <LinearGradient
            colors={['#3B82F6', '#1D4ED8']}
            style={styles.insightGradient}
          >
            <View style={styles.insightContent}>
              <View style={styles.insightIcon}>
                <MessageCircle color="#FFFFFF" size={24} />
              </View>
              <View style={styles.insightText}>
                <Text style={styles.insightTitle}>AI Health Insight</Text>
                <Text style={styles.insightDescription}>
                  Your vitals look great! Consider adding more iron-rich foods to your diet.
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <View style={styles.tasksList}>
            {tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskItem}
                onPress={() => toggleTask(task.id)}
              >
                <View style={styles.taskContent}>
                  <View style={[
                    styles.taskCheckbox,
                    task.completed && styles.taskCheckboxCompleted
                  ]}>
                    {task.completed && <CheckCircle color="#FFFFFF" size={16} />}
                  </View>
                  <View style={styles.taskDetails}>
                    <Text style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted
                    ]}>
                      {task.title}
                    </Text>
                    <Text style={styles.taskTime}>{task.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Calendar color="#3B82F6" size={32} />
              <Text style={styles.actionTitle}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Pill color="#8B5CF6" size={32} />
              <Text style={styles.actionTitle}>Order Medicine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <MessageCircle color="#10B981" size={32} />
              <Text style={styles.actionTitle}>Ask AI Assistant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <AlertCircle color="#EF4444" size={32} />
              <Text style={styles.actionTitle}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  progressCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressWeek: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  progressDescription: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FECACA',
    marginTop: 4,
  },
  progressDetail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FED7E2',
    marginTop: 8,
  },
  babyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
  },
  metricValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
  },
  metricUnit: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
  insightCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  insightGradient: {
    padding: 20,
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#DBEAFE',
    lineHeight: 20,
  },
  tasksList: {
    gap: 12,
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#1E293B',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  taskTime: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginTop: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginTop: 12,
    textAlign: 'center',
  },
});