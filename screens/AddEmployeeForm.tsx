import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import TextInputComponent from './components/InputFieldComponent';
import * as Animatable from 'react-native-animatable';
import CustomHeader from './components/CustomHeader';

const AddEmployeeForm = ({ navigation }) => {
  const [employee, setEmployee] = useState('');
  const [workingType, setWorkingType] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateDisplay, setDateDisplay] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [remark, setRemark] = useState('');
  const [employees] = useState([
    { label: 'મુકેશ', value: 'Mukesh' },
    { label: 'સુરેશ', value: 'Suresh' },
    { label: 'મહેશ', value: 'Mahesh' },
  ]);

  const workingTypes = [
    { label: 'આખો દિવસ', value: 'Full Day' },
    { label: 'અડધું દિવસ', value: 'Half Day' },
  ];

  const times = [
    { label: 'સવાર', value: 'Morning' },
    { label: 'સાંજ', value: 'Evening' },
  ];

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    setDate(currentDate);
    setDateDisplay(formatDate(currentDate));
  };

  const handleSubmit = () => {
    console.log('Employee:', employee);
    console.log('Working Type:', workingType);
    console.log('Time:', time);
    console.log('Date:', dateDisplay);
    console.log('Remark:', remark);
    // Handle form submission to database
  };

  return (
    <>
      <CustomHeader title='Add Empolye' showBackButton={true} onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        {/* Employee Dropdown */}
        <Text style={styles.fieldTitle}>કર્મચારી પસંદ કરો</Text>
        <Animatable.View animation="fadeInUp" duration={800}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={employees}
            search
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder='ગ્રાહક'
            value={employee}
            onChange={(item) => setEmployee(item.value)}
          />
        </Animatable.View>

        {/* Working Type Dropdown */}
        <Text style={styles.fieldTitle}>કામનો પ્રકાર</Text>
        <Animatable.View animation="fadeInUp" duration={800}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={workingTypes}
            search
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder='ગ્રાહક'
            value={workingType}
            onChange={(item) => setWorkingType(item.value)}
          />
        </Animatable.View>

        {/* Time Dropdown */}
        <Text style={styles.fieldTitle}>સમય</Text>
        <Animatable.View animation="fadeInUp" duration={800}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={times}
            search
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder='ગ્રાહક'
            value={time}
            onChange={(item) => setTime(item.value)}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>તારીખ</Text>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChangeDate}
            />
          )}
          {!showDatePicker && (
            <Pressable onPress={toggleDatePicker}>
              <TextInputComponent
                placeholder='તારીખ'
                placeholderTextColor='#c0c0c0'
                value={dateDisplay}
                style={styles.input}
                editable={false}
              />
            </Pressable>
          )}
        </Animatable.View>

        {/* Remark Input */}
        <Text style={styles.fieldTitle}>નોંધ</Text>
        <Animatable.View
          style={styles.inputContainer}
          animation="fadeInUp"
          duration={800}
        >
          <TextInputComponent
            placeholder="નોંધ"
            value={remark}
            onChangeText={setRemark}
          />
        </Animatable.View>

        {/* Submit Button */}
        <Animatable.View
          style={styles.buttonContainer}
          animation="fadeInUp"
          duration={800}
        >
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
  title: {
    fontSize: 28,  // Larger title size
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Darker color for better contrast
  },
  fieldTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444', // Softer black for text
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
  placeholderText: {
    color: '#aaa',
  },
  dateInput: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateText: {
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3, // Adding elevation for Android
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18, // Larger text for buttons
    fontWeight: '600',
  },
});

export default AddEmployeeForm;
