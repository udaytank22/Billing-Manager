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
  const [bags, setBags] = useState([{quantity: '', weight: ''}]);
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateDisplay, setFromDateDisplay] = useState('');
  const [fromDateServer, setFromDateServer] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [remark, setRemark] = useState('');
  const [totalBags, setTotalBags] = useState('');
  const [totalWeight, setTotalWeight] = useState('');

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

  const handleAddBag = () => {
    setBags([...bags, {quantity: '', weight: ''}]);
  };

  const handleBagChange = (index, field, value) => {
    const updatedBags = bags.map((bag, i) => {
      if (i === index) {
        return {...bag, [field]: value};
      }
      return bag;
    });
    setBags(updatedBags);
    calculateTotals(updatedBags);
  };

  const calculateTotals = bags => {
    let totalBags = 0;
    let totalWeight = 0;
    bags.forEach(bag => {
      totalBags += parseInt(bag.quantity) || 0;
      totalWeight +=
        (parseInt(bag.quantity) || 0) * (parseFloat(bag.weight) || 0);
    });
    setTotalBags(totalBags.toString());
    setTotalWeight(totalWeight.toString());
  };

  const handleSubmit = () => {
    console.log('Customer:', customer);
    console.log('Bags:', bags);
    console.log('Total Bags:', totalBags);
    console.log('Total Weight:', totalWeight);
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
      {bags.map((bag, index) => (
        <View key={index} style={styles.bagContainer}>
          <TextInputComponent
            placeholder="બેગની સંખ્યા"
            keyboardType="numeric"
            value={bag.quantity}
            onChangeText={text => handleBagChange(index, 'quantity', text)}
          />
          <TextInputComponent
            placeholder="વજન (કિલોગ્રામમાં)"
            keyboardType="numeric"
            value={bag.weight}
            onChangeText={text => handleBagChange(index, 'weight', text)}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddBag}>
        <Text style={styles.addButtonText}>બેગ ઉમેરો</Text>
      </TouchableOpacity>
      <TextInputComponent
        placeholder="કુલ બેગ"
        keyboardType="numeric"
        value={totalBags}
        editable={false}
      />
      <TextInputComponent
        placeholder="કુલ વજન"
        keyboardType="numeric"
        value={totalWeight}
        editable={false}
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
  bagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
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
