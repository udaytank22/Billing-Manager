import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputComponent from './components/InputFieldComponent';
import CustomHeader from './components/CustomHeader'
import { Dropdown } from 'react-native-element-dropdown';
import * as Animatable from 'react-native-animatable';

const AddFlowerForm = ({ navigation }) => {
  const [customer, setCustomer] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('30');
  const [totalAmount, setTotalAmount] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateDisplay, setFromDateDisplay] = useState('');
  const [fromDateServer, setFromDateServer] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [remark, setRemark] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerMobile, setNewCustomerMobile] = useState('');
  const [customers, setCustomers] = useState([
    { label: 'ઉદય ટાંક', value: 'ઉદય ટાંક' },
    { label: 'Jane Doe', value: 'Jane Doe' },
    { label: 'John Smith', value: 'John Smith' },
  ]);

  const calculateAmounts = (quantity, rate) => {
    const q = parseFloat(quantity) || 0;
    const r = parseFloat(rate) || 0;
    const calculatedAmount = (q * r) / 100;
    return calculatedAmount.toString();
  };

  const toggleFromDatePicker = () => {
    setShowFromPicker(!showFromPicker);
  };

  const formatDate = (rawDate, type) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    if (type === 'display') {
      return `${day}-${month}-${year}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  };

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    if (Platform.OS === 'android') {
      setShowFromPicker(false);
    }
    setFromDate(currentDate);
    setFromDateDisplay(formatDate(currentDate, 'display'));
    setFromDateServer(formatDate(currentDate, 'server'));
  };

  const handleSubmit = () => {
    console.log('Customer:', customer);
    console.log('Quantity:', quantity);
    console.log('Date:', fromDateServer);
    console.log('Remark:', remark);
    // Handle form submission to database
  };

  const handleAddCustomer = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    if (newCustomerName && newCustomerMobile) {
      setCustomers([
        ...customers,
        { label: newCustomerName, value: newCustomerName },
      ]);
      setCustomer(newCustomerName);
      setModalVisible(false);
      setNewCustomerName('');
      setNewCustomerMobile('');
    } else {
      alert('Please fill in both fields.');
    }
  };

  const handlePressOutside = () => {
    setModalVisible(false);
  };

  return (
    <>
      <CustomHeader title='Add Flower' showBackButton={true} onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.Text animation="fadeInUp" style={styles.title}>
          ફ્લાવર ઉમેરો
        </Animatable.Text>
        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>ગ્રાહક</Text>
          <Dropdown
            style={styles.dropdown}
            data={customers}
            labelField="label"
            valueField="value"
            placeholder="ગ્રાહક પસંદ કરો"
            placeholderStyle={styles.dropdownPlaceholder}
            value={customer}
            onChange={item => {
              if (item.value !== 'add_new') {
                setCustomer(item.value);
              }
            }}
            selectedTextStyle={styles.dropdownSelectedText}
            renderItem={(item, index) => (
              <View style={{ backgroundColor: 'white', margin: 10 }}>
                <Text style={{ color: 'black' }}>{item.label}</Text>
              </View>
            )}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>જથ્થો</Text>
          <TextInputComponent
            placeholder="જથ્થો"
            keyboardType="numeric"
            value={quantity}
            onChangeText={text => {
              setQuantity(text);
              const newAmount = calculateAmounts(text, rate);
              setAmount(newAmount);
              setTotalAmount(newAmount);
            }}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>ભાવ</Text>
          <TextInputComponent
            placeholder="ભાવ"
            keyboardType="numeric"
            value={rate}
            onChangeText={text => {
              setRate(text);
              const newAmount = calculateAmounts(quantity, text);
              setAmount(newAmount);
              setTotalAmount(newAmount);
            }}
            editable={false}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={[styles.inputContainer, { flexDirection: 'row' }]}>
          <Text style={styles.fieldTitle}>રૂપિયા: </Text>
          <Text style={styles.fieldTitle}>{amount}</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={[styles.inputContainer, { flexDirection: 'row' }]}>
          <Text style={styles.fieldTitle}>ટોટલ: </Text>
          <Text style={styles.fieldTitle}>{totalAmount}</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>તારીખ</Text>
          <View style={styles.dateInput}>
            <Pressable onPress={toggleFromDatePicker}>
              <Text style={styles.dateText}>
                {fromDateDisplay || 'તારીખ પસંદ કરો'}
              </Text>
            </Pressable>
            {showFromPicker && (
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="spinner"
                onChange={onChangeFromDate}
                style={styles.datePicker}
              />
            )}
          </View>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>નોંધ</Text>
          <TextInputComponent
            placeholder="નોંધ"
            value={remark}
            onChangeText={setRemark}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp">
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>સબમિટ કરો</Text>
          </TouchableOpacity>
        </Animatable.View>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FAF7F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  fieldTitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  dropdownPlaceholder: {
    color: '#c0c0c0',
  },
  dropdownSelectedText: {
    color: '#000',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000',
  },
  addNewItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  addNewText: {
    fontSize: 16,
    color: '#007BFF',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  datePicker: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
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
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  modalSubmitButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
});

export default AddFlowerForm;
