import React, { useRef, useState } from 'react';
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
import EmployeeCardComponent from './components/EmployeeCardComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Header from './components/CustomHeader';

const { width } = Dimensions.get('window');

const EmployeeHome = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState('');
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmployeeName, setNewEmployeeName] = useState('');

  const names = [
    { label: 'રાજ કુમાર', value: 'રાજ કુમાર' },
    { label: 'આરતી બેન', value: 'આરતી બેન' },
    { label: 'વિપુલ સિંહ', value: 'વિપુલ સિંહ' },
    // Add more names as needed
  ];

  const shifts = [
    { label: 'સવાર', value: 'સવાર' },
    { label: 'સાંજ', value: 'સાંજ' },
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
    {
      name: 'પ્રિયા શાહ',
      dayType: 'અડધું',
      date: '2024-07-18',
      shift: 'સાંજ',
    },
    {
      name: 'રાહુલ પટેલ',
      dayType: 'આખો દિવસ',
      date: '2024-07-17',
      shift: 'સવાર',
    },
    {
      name: 'નિશા ગુપ્તા',
      dayType: 'અડધું',
      date: '2024-07-16',
      shift: 'સાંજ',
    },
    {
      name: 'કરણ જોશી',
      dayType: 'આખો દિવસ',
      date: '2024-07-15',
      shift: 'સવાર',
    },
    {
      name: 'સ્વાતિ સિંહ',
      dayType: 'અડધું',
      date: '2024-07-14',
      shift: 'સાંજ',
    },
    {
      name: 'અનિલ શાહ',
      dayType: 'આખો દિવસ',
      date: '2024-07-13',
      shift: 'સવાર',
    },
    {
      name: 'મનીષા પટેલ',
      dayType: 'અડધું',
      date: '2024-07-12',
      shift: 'સાંજ',
    },
  ];

  const handleAddEmployee = () => {
    setModalVisible(true);
  };

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

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setVisibleIndex(viewableItems[0].index);
    }
  });

  const handleModalSubmit = () => {
    console.warn('its working');
  };

  return (
    <View
      style={styles.container}
    >
      <Header title='Employee' showBackButton={true} onBackPress={() => navigation.goBack()} />
      <View style={{ padding: 20, marginBottom: 100 }}>
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
        </Animatable.View>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <EmployeeCardComponent
              name={item.name}
              dayType={item.dayType}
              date={item.date}
              shift={item.shift}
              animation="fadeInUp"
              delay={index * 700}
            />
          )}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
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
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  floatingButton: {
    backgroundColor: '#1d3557',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  floatingButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
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
  addButtonContainer: {
    position: 'absolute',
    bottom: 80,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FF565E',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Adjust as needed
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonFullWidth: {
    width: '100%',
  },
  buttonAdd: {
    backgroundColor: '#4CAF50', // Change this to your preferred color
  },
  buttonClose: {
    backgroundColor: '#4CAF50',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff', // Set modal title color to black
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default EmployeeHome;
