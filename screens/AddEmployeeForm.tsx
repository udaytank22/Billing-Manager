import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownComponent from './components/DropDownComponent';
import TextInputComponent from './components/InputFieldComponent';

const AddEmployeeForm = () => {
  const [employee, setEmployee] = useState('');
  const [workingType, setWorkingType] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateDisplay, setDateDisplay] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [remark, setRemark] = useState('');

  const employees = [
    {label: 'મુકેશ', value: 'Mukesh'},
    {label: 'સુરેશ', value: 'Suresh'},
    {label: 'મહેશ', value: 'Mahesh'},
    // Add more employees as needed
  ];

  const workingTypes = [
    {label: 'આખો દિવસ', value: 'Full Day'},
    {label: 'અડધું દિવસ', value: 'Half Day'},
  ];

  const times = [
    {label: 'સવાર', value: 'Morning'},
    {label: 'સાંજ', value: 'Evening'},
  ];

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const formatDate = (rawDate, type) => {
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
      <DropDownComponent
        selectedValue={employee}
        onValueChange={itemValue => setEmployee(itemValue)}
        items={employees}
        placeholder="કર્મચારી પસંદ કરો"
      />
      <DropDownComponent
        selectedValue={workingType}
        onValueChange={itemValue => setWorkingType(itemValue)}
        items={workingTypes}
        placeholder="કામનો પ્રકાર પસંદ કરો"
      />
      <DropDownComponent
        selectedValue={time}
        onValueChange={itemValue => setTime(itemValue)}
        items={times}
        placeholder="સમય પસંદ કરો"
      />
      <View style={styles.dateInput}>
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

export default AddEmployeeForm;
