import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import CardComponent from './components/FlowerCardComponent';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');

const FloweHome = ({route, navigation}) => {
  const [search, setSearch] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const customers = [
    {label: 'ઉદય ટાંક', value: 'uday'},
    {label: 'Jane Doe', value: 'jane'},
    {label: 'John Smith', value: 'john'},
    // Add more customers as needed
  ];

  const cardsData = [
    {
      customerName: 'ઉદય ટાંક',
      flowerQuantity: '500',
      flowerAmount: '500',
      purchaseDate: '2023-06-15',
    },
    {
      customerName: 'જેન ડો',
      flowerQuantity: '100',
      flowerAmount: '1000',
      purchaseDate: '2023-06-16',
    },
    {
      customerName: 'જૉન સ્મિથ',
      flowerQuantity: '800',
      flowerAmount: '800',
      purchaseDate: '2023-06-17',
    },
    {
      customerName: 'માર્ક વોટસન',
      flowerQuantity: '300',
      flowerAmount: '300',
      purchaseDate: '2023-06-18',
    },
    {
      customerName: 'એમિલી ચેન',
      flowerQuantity: '200',
      flowerAmount: '200',
      purchaseDate: '2023-06-19',
    },
    {
      customerName: 'ડેવિડ લી',
      flowerQuantity: '600',
      flowerAmount: '600',
      purchaseDate: '2023-06-20',
    },
    {
      customerName: 'સોફિયા પાટેલ',
      flowerQuantity: '400',
      flowerAmount: '400',
      purchaseDate: '2023-06-21',
    },
    {
      customerName: 'રાહુલ શર્મા',
      flowerQuantity: '900',
      flowerAmount: '900',
      purchaseDate: '2023-06-22',
    },
    {
      customerName: 'પ્રિયા જૈન',
      flowerQuantity: '700',
      flowerAmount: '700',
      purchaseDate: '2023-06-23',
    },
    {
      customerName: 'વિક્રમ સિંહ',
      flowerQuantity: '1000',
      flowerAmount: '1000',
      purchaseDate: '2023-06-24',
    },
  ];

  const [filteredData, setFilteredData] = useState(cardsData);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerMobile, setNewCustomerMobile] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleFilterApply = () => {
    let newFilteredData = cardsData;

    if (selectedCustomer) {
      newFilteredData = newFilteredData.filter(
        card => card.customerName === selectedCustomer,
      );
    }

    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      newFilteredData = newFilteredData.filter(
        card => card.purchaseDate === formattedDate,
      );
    }

    if (selectedAmount) {
      newFilteredData = newFilteredData.filter(
        card => card.flowerAmount === selectedAmount,
      );
    }

    setFilteredData(newFilteredData);
    setShowFilterModal(false);
  };

  const handleAddCustomer = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {};

  const handlePressOutside = () => {
    setModalVisible(false);
  };

  const handleFilterClear = () => {
    setSelectedCustomer('');
    setSelectedDate(null);
    setSelectedAmount('');
    setFilteredData(cardsData); // Reset to original data
    setShowFilterModal(false);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setVisibleIndex(viewableItems[0].index);
    }
  });

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeIn"
        duration={5000}
        style={styles.searchContainer}>
        <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="શોધો"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}>
          <Text style={styles.filterButtonText}>શોધો</Text>
        </TouchableOpacity>
      </Animatable.View>

      <FlatList
        data={filteredData.filter(card =>
          card.customerName.toLowerCase().includes(search.toLowerCase()),
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <CardComponent
            customerName={item.customerName}
            flowerQuantity={item.flowerQuantity}
            flowerAmount={item.flowerAmount}
            purchaseDate={item.purchaseDate}
            animation="fadeInUp"
            delay={index * 700}
            onEdit={() =>
              navigation.navigate('EditFlower', {
                cardData: item,
                pageType: 'FlowerHome',
              })
            }
            onDelete={undefined}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
          />
        )}
      />

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={() => setShowFilterModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>ફિલ્ટર</Text>

            <Dropdown
              style={styles.dropdown}
              data={customers}
              labelField="label"
              valueField="value"
              placeholder="ગ્રાહક પસંદ કરો"
              placeholderStyle={{color: '#000'}}
              value={selectedCustomer}
              onChange={item => setSelectedCustomer(item.value)}
              selectedTextStyle={styles.dropdownSelectedText}
              renderItem={(item, index) => (
                <View style={{backgroundColor: 'white', margin: 10}}>
                  <Text style={{color: 'black'}}>{item.label}</Text>
                </View>
              )}
            />

            <View style={{backgroundColor: '#fff', marginBottom: 20}}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateText}>
                  {selectedDate
                    ? selectedDate.toDateString()
                    : 'તારીખ પસંદ કરો'}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display={Platform.OS === 'android' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                />
              )}
            </View>
            <TextInput
              style={styles.amountInput}
              placeholder="કુલ રકમ"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={selectedAmount}
              onChangeText={setSelectedAmount}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleFilterApply}>
                <Text style={styles.applyButtonText}>એપ્લાય</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleFilterClear}>
                <Text style={styles.clearButtonText}>ક્લિયર</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFilterModal(false)}>
                <Text style={styles.closeButtonText}>બંધ કરો</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2E35',
  },
  dropdownSelectedText: {
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 20,
    borderRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 80,
  },
  addButton: {
    backgroundColor: '#FFC542',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#1F2E35',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newCustomerButtonContainer: {
    position: 'absolute',
    bottom: 20,
  },
  newCustomerButton: {
    backgroundColor: '#3498db',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  newCustomerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FF565E',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    marginRight: 20,
  },
  amountInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#f44336',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  clearButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  modalView: {
    width: '80%',
    backgroundColor: '#FF565E',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  modalSubmitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default FloweHome;
