import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, MapPin, Pill, Clock, Star, Navigation, Phone, ShoppingCart } from 'lucide-react-native';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  openUntil: string;
  phone: string;
  hasDelivery: boolean;
  estimatedTime: string;
}

interface Medicine {
  id: string;
  name: string;
  type: string;
  price: string;
  inStock: boolean;
  description: string;
}

export default function PharmacyScreen() {
  const [selectedTab, setSelectedTab] = useState<'search' | 'nearby'>('nearby');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);

  const nearbyPharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'HealthPlus Pharmacy',
      address: 'Osu, Oxford Street, Accra',
      distance: '0.8 km',
      rating: 4.8,
      openUntil: '10:00 PM',
      phone: '+233 20 123 4567',
      hasDelivery: true,
      estimatedTime: '25 mins',
    },
    {
      id: '2',
      name: 'MedCare Pharmacy',
      address: 'East Legon, Accra',
      distance: '1.2 km',
      rating: 4.6,
      openUntil: '9:00 PM',
      phone: '+233 24 987 6543',
      hasDelivery: true,
      estimatedTime: '35 mins',
    },
    {
      id: '3',
      name: 'Wellness Pharmacy',
      address: 'Tema, Community 1',
      distance: '2.1 km',
      rating: 4.5,
      openUntil: '8:00 PM',
      phone: '+233 26 555 7890',
      hasDelivery: false,
      estimatedTime: 'N/A',
    },
  ];

  const commonMedicines: Medicine[] = [
    {
      id: '1',
      name: 'Prenatal Vitamins',
      type: 'Supplement',
      price: 'GH₵ 45.00',
      inStock: true,
      description: 'Essential vitamins for pregnancy',
    },
    {
      id: '2',
      name: 'Folic Acid',
      type: 'Supplement',
      price: 'GH₵ 18.50',
      inStock: true,
      description: 'Prevents neural tube defects',
    },
    {
      id: '3',
      name: 'Iron Tablets',
      type: 'Supplement',
      price: 'GH₵ 22.00',
      inStock: false,
      description: 'Prevents anemia during pregnancy',
    },
    {
      id: '4',
      name: 'Calcium Supplement',
      type: 'Supplement',
      price: 'GH₵ 35.00',
      inStock: true,
      description: 'Supports bone health',
    },
  ];

  const renderPharmacy = (pharmacy: Pharmacy) => (
    <View key={pharmacy.id} style={styles.pharmacyCard}>
      <View style={styles.pharmacyHeader}>
        <View style={styles.pharmacyInfo}>
          <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
          <View style={styles.ratingContainer}>
            <Star color="#F59E0B" size={16} fill="#F59E0B" />
            <Text style={styles.rating}>{pharmacy.rating}</Text>
          </View>
        </View>
        {pharmacy.hasDelivery && (
          <View style={styles.deliveryBadge}>
            <Text style={styles.deliveryText}>Delivery</Text>
          </View>
        )}
      </View>

      <View style={styles.pharmacyDetails}>
        <View style={styles.detailRow}>
          <MapPin color="#64748B" size={16} />
          <Text style={styles.detailText}>{pharmacy.address}</Text>
          <Text style={styles.distance}>{pharmacy.distance}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock color="#64748B" size={16} />
          <Text style={styles.detailText}>Open until {pharmacy.openUntil}</Text>
        </View>
        {pharmacy.hasDelivery && (
          <View style={styles.detailRow}>
            <ShoppingCart color="#64748B" size={16} />
            <Text style={styles.detailText}>Delivery in {pharmacy.estimatedTime}</Text>
          </View>
        )}
      </View>

      <View style={styles.pharmacyActions}>
        <TouchableOpacity style={[styles.actionButton, styles.directionsButton]}>
          <Navigation color="#3B82F6" size={16} />
          <Text style={styles.directionsButtonText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
          <Phone color="#10B981" size={16} />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
          <Text style={styles.viewButtonText}>View Medicines</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMedicine = (medicine: Medicine) => (
    <View key={medicine.id} style={styles.medicineCard}>
      <View style={styles.medicineInfo}>
        <View style={styles.medicineIcon}>
          <Pill color="#8B5CF6" size={24} />
        </View>
        <View style={styles.medicineDetails}>
          <Text style={styles.medicineName}>{medicine.name}</Text>
          <Text style={styles.medicineType}>{medicine.type}</Text>
          <Text style={styles.medicineDescription}>{medicine.description}</Text>
        </View>
      </View>
      
      <View style={styles.medicineFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{medicine.price}</Text>
          <Text style={[
            styles.stockStatus,
            medicine.inStock ? styles.inStock : styles.outOfStock
          ]}>
            {medicine.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.addToCartButton,
            !medicine.inStock && styles.disabledButton
          ]}
          disabled={!medicine.inStock}
        >
          <ShoppingCart color={medicine.inStock ? "#FFFFFF" : "#CBD5E1"} size={16} />
          <Text style={[
            styles.addToCartText,
            !medicine.inStock && styles.disabledButtonText
          ]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#10B981', '#047857']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Pharmacy Locator</Text>
          <Text style={styles.headerSubtitle}>Find medicines and pharmacies near you</Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <ShoppingCart color="#FFFFFF" size={24} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#64748B" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines or pharmacies..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'nearby' && styles.activeTab]}
          onPress={() => setSelectedTab('nearby')}
        >
          <Text style={[styles.tabText, selectedTab === 'nearby' && styles.activeTabText]}>
            Nearby Pharmacies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'search' && styles.activeTab]}
          onPress={() => setSelectedTab('search')}
        >
          <Text style={[styles.tabText, selectedTab === 'search' && styles.activeTabText]}>
            Common Medicines
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {selectedTab === 'nearby' && (
            <View style={styles.pharmaciesList}>
              {nearbyPharmacies.map(renderPharmacy)}
            </View>
          )}

          {selectedTab === 'search' && (
            <View style={styles.medicinesList}>
              <Text style={styles.sectionTitle}>Pregnancy & Maternal Health</Text>
              <Text style={styles.sectionSubtitle}>
                Essential medicines and supplements for your pregnancy journey
              </Text>
              {commonMedicines.map(renderMedicine)}
            </View>
          )}
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
    color: '#A7F3D0',
    marginTop: 4,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginTop: -12,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1E293B',
    marginLeft: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
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
    backgroundColor: '#10B981',
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
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  pharmaciesList: {
    gap: 16,
  },
  pharmacyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
    marginLeft: 4,
  },
  deliveryBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deliveryText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#16A34A',
  },
  pharmacyDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#10B981',
  },
  pharmacyActions: {
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
  directionsButton: {
    backgroundColor: '#EFF6FF',
  },
  directionsButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#3B82F6',
    marginLeft: 4,
  },
  callButton: {
    backgroundColor: '#F0FDF4',
  },
  callButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#10B981',
    marginLeft: 4,
  },
  viewButton: {
    backgroundColor: '#8B5CF6',
  },
  viewButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  medicinesList: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 24,
  },
  medicineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  medicineInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  medicineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicineDetails: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  medicineType: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8B5CF6',
    marginTop: 2,
  },
  medicineDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginTop: 4,
    lineHeight: 20,
  },
  medicineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
  },
  stockStatus: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: 2,
  },
  inStock: {
    color: '#16A34A',
  },
  outOfStock: {
    color: '#DC2626',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#F1F5F9',
  },
  addToCartText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  disabledButtonText: {
    color: '#CBD5E1',
  },
});