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
import EmployeeCardComponent from './components/EmployeeCardComponent';
import FixedBottom from './elements/FixedBottom';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';

const EmployeeHome = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const names = [
    {label: 'રાજ કુમાર', value: 'રાજ કુમાર'},
    {label: 'આરતી બેન', value: 'આરતી બેન'},
    {label: 'વિપુલ સિંહ', value: 'વિપુલ સિંહ'},
    // Add more names as needed
  ];

  const shifts = [
    {label: 'સવાર', value: 'સવાર'},
    {label: 'સાંજ', value: 'સાંજ'},
    // Add more shifts as needed
  ];

  const employeeData = [
    {
      name: 'રાજ કુમાર',
      dayType: 'આખો દિવસ',
      date: '2024-07-21',
      shift: 'સવાર',
    },
    {
      name: 'આરતી બેન',
      dayType: 'અડધું',
      date: '2024-07-20',
      shift: 'સાંજ',
    },
    {
      name: 'વિપુલ સિંહ',
      dayType: 'આખો દિવસ',
      date: '2024-07-19',
      shift: 'સવાર',
    },
    // Add more data as needed
  ];

  const filteredData = employeeData.filter(employee => {
    return (
      (selectedName ? employee.name === selectedName : true) &&
      (selectedDate
        ? employee.date === selectedDate.toISOString().split('T')[0]
        : true) &&
      (selectedShift ? employee.shift === selectedShift : true) &&
      employee.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleFilterApply = () => {
    setShowFilterModal(false);
  };

  const handleFilterClear = () => {
    setSelectedName('');
    setSelectedDate(null);
    setSelectedShift('');
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
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cardsContainer}
        renderItem={({item}) => (
          <EmployeeCardComponent
            name={item.name}
            dayType={item.dayType}
            date={item.date}
            shift={item.shift}
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
              data={shifts}
              labelField="label"
              valueField="value"
              placeholder="શિફ્ટ પસંદ કરો"
              value={selectedShift}
              onChange={item => setSelectedShift(item.value)}
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

      <FixedBottom>
        <View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.push('AddEmployeeForm')}>
            <Text style={styles.addButtonText}>એન્ટ્રી ઉમેરો</Text>
          </TouchableOpacity>
        </View>
      </FixedBottom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
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

export default EmployeeHome;
