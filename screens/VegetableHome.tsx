import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
  Platform,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import VegetableCardComonent from './components/VegetableCardComponent';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient'; // For Gradient Background
import Header from './components/CustomHeader'

const { width } = Dimensions.get('window');

const VegrtableHome = ({ navigation, route }) => {
  const [search, setSearch] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newVegetableName, setNewVegetableName] = useState('');

  const customers = [
    { label: 'બટાકા', value: 'બટાકા' },
    { label: 'લીલી ડુંગળી', value: 'લીલી ડુંગળી' },
    { label: 'ફુલાવર', value: 'ફુલાવર' },
    { label: 'કાકડી', value: 'કાકડી' },
    // Add more customers as needed
  ];

  const cardsData = [
    {
      customerName: 'બટાકા',
      VegetableWeight: '500',
      VegetableQuentity: '50',
      purchaseDate: '2023-06-15',
    },
    {
      customerName: 'લીલી ડુંગળી',
      VegetableWeight: '500',
      VegetableQuentity: '20',
      purchaseDate: '2023-06-16',
    },
    {
      customerName: 'ફુલાવર',
      VegetableWeight: '500',
      VegetableQuentity: '80',
      purchaseDate: '2023-06-17',
    },
    {
      customerName: 'કાકડી',
      VegetableWeight: '500',
      VegetableQuentity: '80',
      purchaseDate: '2023-06-17',
      Remark: 'Just Testing',
    },
    {
      customerName: 'કાકડી',
      VegetableWeight: '500',
      VegetableQuentity: '80',
      purchaseDate: '2023-06-17',
      Remark: 'Just Testing',
    },
    {
      customerName: 'કાકડી',
      VegetableWeight: '500',
      VegetableQuentity: '80',
      purchaseDate: '2023-06-17',
      Remark: 'Just Testing',
    },
    {
      customerName: 'કાકડી',
      VegetableWeight: '500',
      VegetableQuentity: '80',
      purchaseDate: '2023-06-17',
      Remark: 'Just Testing',
    },
  ];

  const [filteredData, setFilteredData] = useState(cardsData);

  return (
    <View
      style={styles.container}>
      <Header title={'Vegrtable List'} showBackButton={true} onBackPress={() => navigation.goBack()} />
      <View style={{ padding: 20, marginBottom: 100 }}>
        <Animatable.View
          animation="fadeIn"
          duration={5000}
          style={styles.inputContainer}>
          <Icon name="search" size={20} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="શોધો"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </Animatable.View>

        <FlatList
          data={filteredData.filter(card =>
            card.customerName.toLowerCase().includes(search.toLowerCase()),
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="fadeInUp"
              duration={1000}
              delay={index * 300}
              style={styles.card}>
              <VegetableCardComonent
                vegetableName={item.customerName}
                vegetableWeight={item.VegetableWeight}
                vegetableQuantity={item.VegetableQuentity}
                dateNeeded={item.purchaseDate}
                remark={item.Remark}
                type={'VegrtableHome'}
                onPress={() =>
                  navigation.navigate('EditFlower', {
                    cardData: item,
                    pageType: 'VegrtableHome',
                  })
                }
              />
            </Animatable.View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  headerContainer: {
    backgroundColor: '#2980B9',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: '#FFF',
  },
  input: {
    flex: 1,
    color: '#FFF',
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
  },
  filterButtonText: {
    color: '#fff',
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    width: '100%',
    marginBottom: 20,
  },
  dateText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#555',
  },
  amountInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  applyButton: {
    backgroundColor: '#2980B9',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#95a5a6',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default VegrtableHome;