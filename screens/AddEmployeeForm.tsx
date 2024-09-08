import React, {useState} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [employees, setEmployees] = useState([
    {label: 'મુકેશ', value: 'Mukesh'},
    {label: 'સુરેશ', value: 'Suresh'},
    {label: 'મહેશ', value: 'Mahesh'},
  ]);

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
      <Animatable.View animation="fadeInUp" duration={800}>
        <Dropdown
          style={styles.dropdown}
          data={employees}
          labelField="label"
          valueField="value"
          placeholder="કર્મચારી પસંદ કરો"
          placeholderStyle={styles.placeholderText}
          value={employee}
          onChange={item => {
            if (item.value !== 'add_new') {
              setEmployee(item.value);
            }
          }}
          selectedTextStyle={styles.selectedText}
        />
      </Animatable.View>
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
        />
      </Animatable.View>
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
        />
      </Animatable.View>
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
      <Animatable.View
        style={styles.buttonContainer}
        animation="fadeInUp"
        duration={800}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>સબમિટ કરો</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Modal for adding a new employee */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1F2E35',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
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
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dropdownText: {
    color: 'black', // Set dropdown item text color to black
  },
  selectedText: {
    color: 'black', // Ensure selected text color is black
  },
  placeholderText: {
    color: 'black', // Set placeholder text color to black
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
    color: 'black', // Set date picker text color to black
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
  addNewItem: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginVertical: 5,
  },
  addNewText: {
    color: '#fff',
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
    backgroundColor: 'white',
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
    borderRadius: 20,
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
    color: 'black', // Set modal title color to black
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default AddEmployeeForm;
