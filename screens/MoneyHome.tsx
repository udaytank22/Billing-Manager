import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import CollectedCard from './elements/CollectionCard';
import FixedBottom from './elements/FixedBottom';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

const MoneyHome = ({route, navigation}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [search, setSearch] = useState('');

  const names = [
    {label: 'ઉદય ટાંક', value: 'ઉદય ટાંક'},
    {label: 'જયેશ પટેલ', value: 'જયેશ Patel'},
    {label: 'મનિષા શાહ', value: 'મનિષા શાહ'},
    // Add more names as needed
  ];

  const statuses = [
    {label: 'Collected', value: 'Collected'},
    {label: 'Pending', value: 'Pending'},
    // Add more statuses as needed
  ];

  const customers = [
    {
      name: 'ઉદય ટાંક',
      collectedAmount: '500',
      notCollectedAmount: '200',
      lastCollectedDate: '25/07/2024',
      status: 'Collected',
    },
    {
      name: 'જયેશ Patel',
      collectedAmount: '700',
      notCollectedAmount: '100',
      lastCollectedDate: '28/05/2024',
      status: 'Pending',
    },
    {
      name: 'મનિષા શાહ',
      collectedAmount: '300',
      notCollectedAmount: '50',
      lastCollectedDate: '27/01/2024',
      status: 'Collected',
    },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesName = selectedName ? customer.name === selectedName : true;
    const matchesDate = selectedDate
      ? customer.lastCollectedDate === selectedDate.toISOString().split('T')[0]
      : true;
    const matchesStatus = selectedStatus
      ? customer.status === selectedStatus
      : true;
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesName && matchesDate && matchesStatus && matchesSearch;
  });

  const handleFilterApply = () => {
    setShowFilterModal(false);
  };

  const handleFilterClear = () => {
    setSelectedName('');
    setSelectedDate(null);
    setSelectedStatus('');
    setSearch('');
    setShowFilterModal(false);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#555"
            style={styles.searchIcon}
          />
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

        {filteredCustomers.map((customer, index) => (
          <CollectedCard
            key={index}
            name={customer.name}
            collectedAmount={customer.collectedAmount}
            notCollectedAmount={customer.notCollectedAmount}
            collectedDate={customer.lastCollectedDate}
            status={customer.status}
          />
        ))}
      </ScrollView>

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
              data={names}
              labelField="label"
              valueField="value"
              placeholder="નામ પસંદ કરો"
              value={selectedName}
              onChange={item => setSelectedName(item.value)}
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

            <Dropdown
              style={styles.dropdown}
              data={statuses}
              labelField="label"
              valueField="value"
              placeholder="સ્થિતિ પસંદ કરો"
              value={selectedStatus}
              onChange={item => setSelectedStatus(item.value)}
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

      {route.params.status === 'Pending' && (
        <FixedBottom>
          <View>
            <Pressable
              style={styles.addButton}
              onPress={() => navigation.push('MoneyCollectionForm')}>
              <Text style={styles.addButtonText}>એન્ટ્રી ઉમેરો</Text>
            </Pressable>
          </View>
        </FixedBottom>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginVertical: 10,
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
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default MoneyHome;
