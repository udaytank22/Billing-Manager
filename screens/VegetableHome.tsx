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
import VegetableCardComonent from './components/VegetableCardComponent';
import FixedBottom from './elements/FixedBottom';

const VegrtableHome = ({navigation, route}) => {
  const [search, setSearch] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const customers = [
    {label: 'બટાકા', value: 'બટાકા'},
    {label: 'લીલી ડુંગળી', value: 'લીલી ડુંગળી'},
    {label: 'ફુલાવર', value: 'ફુલાવર'},
    {label: 'કાકડી', value: 'કાકડી'},
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

    if (selectedQuantity) {
      newFilteredData = newFilteredData.filter(
        card => card.VegetableQuentity === selectedQuantity,
      );
    }

    setFilteredData(newFilteredData);
    setShowFilterModal(false);
  };

  const handleFilterClear = () => {
    setSelectedCustomer('');
    setSelectedDate(null);
    setSelectedQuantity('');
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
          <VegetableCardComonent
            vegetableName={item.customerName}
            vegetableWeight={item.VegetableWeight}
            vegetableQuentity={item.VegetableQuentity}
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
              placeholder="શાકભાજી નામ પસંદ કરો"
              placeholderStyle={{color: '#000'}}
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
              placeholder="મોટા જથ્થો"
              keyboardType="numeric"
              value={selectedQuantity}
              onChangeText={setSelectedQuantity}
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
              onPress={() => navigation.push('AddVegetableForm')}>
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
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
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
    flex: 1,
    marginRight: 10,
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
    flex: 1,
    marginRight: 10,
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
    flex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
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
});

export default VegrtableHome;
