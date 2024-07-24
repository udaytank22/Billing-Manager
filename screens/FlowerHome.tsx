import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import CardComponent from './components/FlowerCardComponent';
import FixedBottom from './elements/FixedBottom';

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
      customerName: 'Jane Doe',
      flowerQuantity: '100',
      flowerAmount: '1000',
      purchaseDate: '2023-06-16',
    },
    {
      customerName: 'John Smith',
      flowerQuantity: '800',
      flowerAmount: '800',
      purchaseDate: '2023-06-17',
    },
    // Add more data as needed
  ];

  const [filteredData, setFilteredData] = useState(cardsData);

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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="શોધો"
          placeholderTextColor="#000"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}>
          <Text style={styles.filterButtonText}>શોધો</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData.filter(card =>
          card.customerName.toLowerCase().includes(search.toLowerCase()),
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cardsContainer}
        renderItem={({item}) => (
          <CardComponent
            customerName={item.customerName}
            flowerQuantity={item.flowerQuantity}
            flowerAmount={item.flowerAmount}
            purchaseDate={item.purchaseDate}
            onPress={() =>
              navigation.navigate('EditFlower', {
                cardData: item,
                pageType: 'FlowerHome',
              })
            }
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
              value={selectedCustomer}
              onChange={item => setSelectedCustomer(item.value)}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>
                {selectedDate ? selectedDate.toDateString() : 'તારીખ પસંદ કરો'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}

            <TextInput
              style={styles.amountInput}
              placeholder="કુલ રકમ"
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

      {route.params.status === 'Daily' && (
        <FixedBottom>
          <View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.push('AddFlower')}>
              <Text style={styles.addButtonText}>એન્ટ્રી ઉમેરો</Text>
            </TouchableOpacity>
          </View>
        </FixedBottom>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
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
  addButton: {
    marginRight: 15,
    backgroundColor: '#1d3557',
    borderRadius: 20,
    width: '50%',
    height: '50%',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdown: {
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dateText: {
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  amountInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FloweHome;
