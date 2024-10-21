import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputComponent from './components/InputFieldComponent';
import { Dropdown } from 'react-native-element-dropdown';
import * as Animatable from 'react-native-animatable';
import CustomHeader from './components/CustomHeader';

const AddVegetableForm = ({ navigation }) => {
  const [customer, setCustomer] = useState('');
  const [bags, setBags] = useState([{ quantity: '', weight: '' }]);
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateDisplay, setFromDateDisplay] = useState('');
  const [fromDateServer, setFromDateServer] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [remark, setRemark] = useState('');
  const [totalBags, setTotalBags] = useState('0');
  const [totalWeight, setTotalWeight] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);
  const [newVegetableName, setNewVegetableName] = useState('');
  const [vegetables, setVegetables] = useState([
    { label: 'બટાકા', value: 'બટાકા' },
    { label: 'લીલી ડુંગળી', value: 'લીલી ડુંગળી' },
    { label: 'ફુલાવર', value: 'ફુલાવર' },
  ]);

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
    if (Platform.OS === 'android') {
      setShowFromPicker(false);
    }
    setFromDate(currentDate);
    setFromDateDisplay(formatDate(currentDate, 'display'));
    setFromDateServer(formatDate(currentDate, 'server'));
  };

  const handleAddBag = () => {
    setBags([...bags, { quantity: '', weight: '' }]);
  };

  const handleBagChange = (index, field, value) => {
    const updatedBags = bags.map((bag, i) => {
      if (i === index) {
        return { ...bag, [field]: value };
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
      totalWeight += (parseInt(bag.quantity) || 0) * (parseFloat(bag.weight) || 0);
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

  const handleAddVegetable = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    if (newVegetableName) {
      setVegetables([...vegetables, { label: newVegetableName, value: newVegetableName }]);
      setCustomer(newVegetableName);
      setModalVisible(false);
      setNewVegetableName('');
    } else {
      alert('Please fill in the vegetable name field.');
    }
  };

  const handlePressOutside = () => {
    setModalVisible(false);
  };

  return (
    <>
      <CustomHeader title='Add Vegetable' showBackButton={true} onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View>
          <Animatable.View animation="fadeInUp" duration={800}>
            <Text style={styles.fieldTitle}>શાકભાજી પસંદ કરો</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={vegetables}
              search
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder='શાકભાજી પસંદ કરો'
              value={customer}
              onChange={item => {
                setCustomer(item.value);
              }}
            />
          </Animatable.View>

          {bags.map((bag, index) => (
            <Animatable.View key={index} animation="fadeInUp" duration={800} style={{ marginTop: 10 }} >
              <View style={styles.bagContainer}>
                <TextInputComponent
                  placeholder="ઝબલાની સંખ્યા"
                  keyboardType="numeric"
                  value={bag.quantity}
                  onChangeText={text => handleBagChange(index, 'quantity', text)}
                  style={styles.bagInput}
                />
                <TextInputComponent
                  placeholder="વજન (કિલોગ્રામમાં)"
                  keyboardType="numeric"
                  value={bag.weight}
                  onChangeText={text => handleBagChange(index, 'weight', text)}
                  style={styles.bagInput}
                />
              </View>
            </Animatable.View>
          ))}
        </View>

        <Animatable.View animation="fadeInUp" duration={800}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddBag}>
            <Text style={styles.addButtonText}>ઝબલા ઉમેરો</Text>
          </TouchableOpacity>
        </Animatable.View>

        <View style={styles.totalsContainer}>
          <Animatable.View animation="fadeInUp" duration={800} style={styles.amountContainer}>
            <Text style={styles.fieldTitle}>કુલ બેગ:</Text>
            <Text style={styles.totalText}>{totalBags}</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={800} style={styles.amountContainer}>
            <Text style={styles.fieldTitle}>કુલ વજન:</Text>
            <Text style={styles.totalText}>{totalWeight}</Text>
          </Animatable.View>
        </View>

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

        <Animatable.View animation="fadeInUp" duration={800}>
          <Text style={styles.fieldTitle}>નોંધ</Text>
          <TextInputComponent
            placeholder="નોંધ"
            value={remark}
            onChangeText={setRemark}
            style={styles.remarkInput}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={800}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>સબમિટ કરો</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32, // Increased size for better visibility
    fontWeight: '700', // Bold font for emphasis
    color: '#333',
    marginBottom: 20,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
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
  itemTextStyle: {
    color: '#000',
  },
  placeholderText: {
    color: '#aaa',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  bagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  bagInput: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff', // White background for inputs
  },
  addButton: {
    backgroundColor: '#007BFF', // Primary color
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  totalsContainer: {
    marginTop: 20,
    marginBottom: 20,
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
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff', // White background for date input
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 80,
    backgroundColor: '#fff', // White background for remark input
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#28a745', // Success color
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AddVegetableForm;
