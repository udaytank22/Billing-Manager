import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputComponent from './components/InputFieldComponent';
import CustomHeader from './components/CustomHeader';
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
  const [customers, setCustomers] = useState([
    { label: 'ઉદય ટાંક', value: 'ઉદય ટાંક' },
    { label: 'Jane Doe', value: 'Jane Doe' },
    { label: 'John Smith', value: 'John Smith' },
  ]);

  const calculateAmounts = (quantity, rate) => {
    const q = parseFloat(quantity) || 0;
    const r = parseFloat(rate) || 0;
    const calculatedAmount = (q * r) / 100;

    const decimalPart = calculatedAmount % 1;
    const roundedAmount = decimalPart > 0.5 ? Math.ceil(calculatedAmount) : Math.floor(calculatedAmount);

    return roundedAmount.toString();
  };

  const toggleFromDatePicker = () => {
    setShowFromPicker(!showFromPicker);
  };

  const formatDate = (rawDate, type) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return type === 'display' ? `${day}-${month}-${year}` : `${year}-${month}-${day}`;
  };

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromPicker(false);
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

  return (
    <>
      <CustomHeader title='Add Flower' showBackButton={true} onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>ગ્રાહક</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={customers}
            search
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder='ગ્રાહક'
            value={customer}
            onChange={item => setCustomer(item.value)}
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
        <Animatable.View animation="fadeInUp" style={styles.amountContainer}>
          <Text style={styles.fieldTitle}>રૂપિયા: </Text>
          <Text style={styles.amountText}>{amount}</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.amountContainer}>
          <Text style={styles.fieldTitle}>ટોટલ: </Text>
          <Text style={styles.amountText}>{totalAmount}</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>તારીખ</Text>
          {showFromPicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="spinner"
              onChange={onChangeFromDate}
              style={styles.datePicker}
            />
          )}
          {!showFromPicker && (
            <Pressable onPress={toggleFromDatePicker}>
              <TextInputComponent
                placeholder='તારીખ'
                placeholderTextColor='#c0c0c0'
                value={fromDateDisplay}
                style={styles.input}
                editable={false}
              />
            </Pressable>
          )}
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
      </ScrollView >
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF', // Set the background color to white
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    shadowColor: '#000',
    elevation: 10
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginBottom: 10,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  fieldTitle: {
    fontSize: 18,
    color: '#555',
    // marginBottom: 8,
  },
  dropdown: {
    marginVertical: 5,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000', // Added shadow color
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 10, // Added elevation
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#c0c0c0',
    shadowColor: '#000',
    elevation: 10
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  itemTextStyle: {
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000', // Added shadow color
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // elevation: 1, // Added elevation
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  datePicker: {
    backgroundColor: '#fff',
  },
});

export default AddFlowerForm;
