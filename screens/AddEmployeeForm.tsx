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

  const handleAddEmployee = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    if (newEmployeeName) {
      setEmployees([
        ...employees,
        {label: newEmployeeName, value: newEmployeeName},
      ]);
      setEmployee(newEmployeeName);
      setModalVisible(false);
      setNewEmployeeName('');
    } else {
      alert('Please enter an employee name.');
    }
  };

  const renderDropdownItem = item => {
    if (item.value === 'add_new') {
      return (
        <TouchableOpacity
          style={[styles.addNewItem, styles.dropdownItem]}
          onPress={handleAddEmployee}>
          <Text style={styles.addNewText}>Add New Employee</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.dropdownItem}>
        <Text>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>કર્મચારી દાખલ કરો</Text>
      <Dropdown
        style={styles.dropdown}
        data={[...employees, {label: 'Add New Employee', value: 'add_new'}]}
        labelField="label"
        valueField="value"
        placeholder="કર્મચારી પસંદ કરો"
        value={employee}
        onChange={item => {
          if (item.value !== 'add_new') {
            setEmployee(item.value);
          }
        }}
        renderItem={renderDropdownItem}
      />
      <Dropdown
        style={styles.dropdown}
        data={workingTypes}
        labelField="label"
        valueField="value"
        placeholder="કામનો પ્રકાર પસંદ કરો"
        value={workingType}
        onChange={item => setWorkingType(item.value)}
      />
      <Dropdown
        style={styles.dropdown}
        data={times}
        labelField="label"
        valueField="value"
        placeholder="સમય પસંદ કરો"
        value={time}
        onChange={item => setTime(item.value)}
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

      {/* Modal for adding a new employee */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Employee</Text>
            <TextInput
              style={styles.input}
              placeholder="Employee Name"
              value={newEmployeeName}
              onChangeText={setNewEmployeeName}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleModalSubmit}>
              <Text style={styles.textStyle}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addNewItem: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginVertical: 5,
  },
  addNewText: {
    color: '#fff',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
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
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 200,
  },
});

export default AddEmployeeForm;
