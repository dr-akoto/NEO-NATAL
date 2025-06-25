import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Mic, Bot, User, Heart, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'normal' | 'warning' | 'emergency';
}

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI health assistant. How can I help you today? You can ask me about pregnancy symptoms, nutrition, or any health concerns.',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickQuestions = [
    'How is my baby developing?',
    'What should I eat today?',
    'I have morning sickness',
    'When is my next appointment?',
    'I feel dizzy',
    'Emergency symptoms'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.trim());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponse.type,
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userText: string): { text: string; type?: 'normal' | 'warning' | 'emergency' } => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('emergency') || lowerText.includes('bleeding') || lowerText.includes('severe pain')) {
      return {
        text: '⚠️ This sounds like it could be serious. Please contact your doctor immediately or go to the nearest hospital. For immediate emergency assistance, tap the Emergency button at the bottom of the screen.',
        type: 'emergency'
      };
    }
    
    if (lowerText.includes('dizzy') || lowerText.includes('nausea') || lowerText.includes('morning sickness')) {
      return {
        text: 'Morning sickness and dizziness are common during pregnancy. Try eating small, frequent meals and stay hydrated. Ginger tea can help with nausea. However, if symptoms are severe or persistent, please consult your healthcare provider.',
        type: 'warning'
      };
    }
    
    if (lowerText.includes('baby') || lowerText.includes('develop')) {
      return {
        text: 'At 28 weeks, your baby is about the size of an eggplant! Their brain is developing rapidly, and they can now blink and have sleep-wake cycles. You might feel more pronounced movements now. Keep up with your prenatal visits to monitor development.'
      };
    }
    
    if (lowerText.includes('eat') || lowerText.includes('food') || lowerText.includes('nutrition')) {
      return {
        text: 'Focus on iron-rich foods like lean meats, beans, and spinach. Include calcium sources like dairy or fortified plant milks. Don\'t forget your prenatal vitamins! Avoid raw fish, unpasteurized foods, and limit caffeine. Would you like specific meal suggestions?'
      };
    }
    
    if (lowerText.includes('appointment')) {
      return {
        text: 'Your next appointment is scheduled for Friday at 2:00 PM with Dr. Mensah. You\'ll have a routine checkup and ultrasound. Make sure to bring your list of questions and any concerns you\'d like to discuss.'
      };
    }
    
    return {
      text: 'I understand your concern. During pregnancy, it\'s important to stay informed and address any worries. Can you provide more specific details about what you\'re experiencing? This will help me give you better guidance.'
    };
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <View key={message.id} style={[styles.messageContainer, isUser ? styles.userMessage : styles.aiMessage]}>
        <View style={styles.messageHeader}>
          <View style={[styles.avatarContainer, isUser ? styles.userAvatar : styles.aiAvatar]}>
            {isUser ? <User color="#FFFFFF" size={16} /> : <Bot color="#FFFFFF" size={16} />}
          </View>
          <Text style={styles.senderName}>{isUser ? 'You' : 'AI Assistant'}</Text>
        </View>
        
        <View style={[
          styles.messageBubble, 
          isUser ? styles.userBubble : styles.aiBubble,
          message.type === 'emergency' && styles.emergencyBubble,
          message.type === 'warning' && styles.warningBubble
        ]}>
          <Text style={[
            styles.messageText, 
            isUser ? styles.userText : styles.aiText,
            (message.type === 'emergency' || message.type === 'warning') && styles.alertText
          ]}>
            {message.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <Bot color="#FFFFFF" size={32} />
            </View>
            <View>
              <Text style={styles.headerTitle}>AI Health Assistant</Text>
              <Text style={styles.headerSubtitle}>Available 24/7 for your health questions</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Questions */}
        <View style={styles.quickQuestionsContainer}>
          <Text style={styles.quickQuestionsTitle}>Quick Questions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickQuestionsScroll}>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickQuestionButton}
                onPress={() => handleQuickQuestion(question)}
              >
                <Text style={styles.quickQuestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
          
          {isLoading && (
            <View style={[styles.messageContainer, styles.aiMessage]}>
              <View style={styles.messageHeader}>
                <View style={[styles.avatarContainer, styles.aiAvatar]}>
                  <Bot color="#FFFFFF" size={16} />
                </View>
                <Text style={styles.senderName}>AI Assistant</Text>
              </View>
              <View style={[styles.messageBubble, styles.aiBubble, styles.loadingBubble]}>
                <Text style={styles.loadingText}>Thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask about symptoms, nutrition, or health concerns..."
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={styles.voiceButton}
              onPress={() => {/* Voice input functionality */}}
            >
              <Mic color="#64748B" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.disabledSendButton]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim() || isLoading}
            >
              <Send color={inputText.trim() ? "#FFFFFF" : "#94A3B8"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
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
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#DBEAFE',
  },
  quickQuestionsContainer: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#64748B',
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  quickQuestionsScroll: {
    paddingLeft: 24,
  },
  quickQuestionButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  quickQuestionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#3B82F6',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userAvatar: {
    backgroundColor: '#3B82F6',
  },
  aiAvatar: {
    backgroundColor: '#10B981',
  },
  senderName: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emergencyBubble: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  warningBubble: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  loadingBubble: {
    opacity: 0.7,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#1E293B',
  },
  alertText: {
    color: '#DC2626',
  },
  loadingText: {
    color: '#64748B',
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1E293B',
    maxHeight: 100,
    paddingVertical: 8,
  },
  voiceButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledSendButton: {
    backgroundColor: '#E2E8F0',
  },
});