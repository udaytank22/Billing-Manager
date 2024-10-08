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

const AddEmployeeForm = () => {
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

  const formatDate = rawDate => {
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
    <View style={styles.container}>
      <Text style={styles.title}>કર્મચારી દાખલ કરો</Text>

      {/* Employee Dropdown */}
      <Text style={styles.fieldTitle}>કર્મચારી પસંદ કરો</Text>
      <Animatable.View animation="fadeInUp" duration={800}>
        <Dropdown
          style={styles.dropdown}
          data={employees}
          labelField="label"
          valueField="value"
          placeholder="કર્મચારી પસંદ કરો"
          placeholderStyle={styles.placeholderText}
          value={employee}
          onChange={item => setEmployee(item.value)}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.dropdownText}
        />
      </Animatable.View>

      {/* Working Type Dropdown */}
      <Text style={styles.fieldTitle}>કામનો પ્રકાર</Text>
      <Animatable.View animation="fadeInUp" duration={800}>
        <Dropdown
          style={styles.dropdown}
          data={workingTypes}
          labelField="label"
          valueField="value"
          placeholder="કામનો પ્રકાર પસંદ કરો"
          placeholderStyle={styles.placeholderText}
          value={workingType}
          onChange={item => setWorkingType(item.value)}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.dropdownText}
        />
      </Animatable.View>

      {/* Time Dropdown */}
      <Text style={styles.fieldTitle}>સમય</Text>
      <Animatable.View animation="fadeInUp" duration={800}>
        <Dropdown
          style={styles.dropdown}
          data={times}
          labelField="label"
          valueField="value"
          placeholder="સમય પસંદ કરો"
          placeholderStyle={styles.placeholderText}
          value={time}
          onChange={item => setTime(item.value)}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.dropdownText}
        />
      </Animatable.View>

      {/* Date Picker */}
      <Text style={styles.fieldTitle}>તારીખ</Text>
      <Animatable.View
        style={styles.dateInput}
        animation="fadeInUp"
        duration={800}>
        <Pressable onPress={toggleDatePicker}>
          <Text style={styles.dateText}>{dateDisplay || 'તારીખ પસંદ કરો'}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChangeDate}
          />
        )}
      </Animatable.View>

      {/* Remark Input */}
      <Text style={styles.fieldTitle}>નોંધ</Text>
      <Animatable.View
        style={styles.inputContainer}
        animation="fadeInUp"
        duration={800}>
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
        duration={800}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>સબમિટ કરો</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  fieldTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 15,
  },
  dropdownText: {
    color: 'black',
  },
  selectedText: {
    color: 'black',
  },
  placeholderText: {
    color: 'black',
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
    color: 'black',
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
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddEmployeeForm;
