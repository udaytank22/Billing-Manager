// AddFlowerForm.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputComponent from './components/InputFieldComponent';
import DropDownComponent from './components/DropDownComponent';

const AddVegetableForm = () => {
  const [customer, setCustomer] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateDisplay, setFromDateDisplay] = useState('');
  const [fromDateServer, setFromDateServer] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [remark, setRemark] = useState('');

  const customers = [
    {label: 'ઉદય ટાંક', value: 'બટાકા'},
    {label: 'Jane Doe', value: 'લીલી ડુંગળી'},
    {label: 'John Smith', value: 'ફુલાવર'},
    // Add more customers as needed
  ];

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>શાકભાજી ઉમેરો</Text>
      <DropDownComponent
        selectedValue={customer}
        onValueChange={itemValue => setCustomer(itemValue)}
        items={customers}
        placeholder="શાકભાજી પસંદ કરો"
      />
      <TextInputComponent
        placeholder="જથ્થો"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
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
          />
        )}
      </View>
      <TextInputComponent
        placeholder="નોંધ"
        value={remark}
        onChangeText={setRemark}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>સબમિટ કરો</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  dateInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 15,
  },
  dateText: {
    color: '#000',
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
  },
});

export default AddVegetableForm;
