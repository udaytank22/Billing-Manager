import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputComponent from './components/InputFieldComponent';
import {Dropdown} from 'react-native-element-dropdown';

const AddFlowerForm = () => {
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
    {label: 'ઉદય ટાંક', value: 'ઉદય ટાંક'},
    {label: 'Jane Doe', value: 'Jane Doe'},
    {label: 'John Smith', value: 'John Smith'},
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
        {label: newCustomerName, value: newCustomerName},
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

  const renderDropdownItem = item => {
    if (item.value === 'add_new') {
      return (
        <TouchableOpacity style={styles.addNewItem} onPress={handleAddCustomer}>
          <Text style={styles.addNewText}>નવો ગ્રાહક ઉમેરો</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.dropdownItemText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ફ્લાવર ઉમેરો</Text>
      <Dropdown
        style={styles.dropdown}
        data={[...customers, {label: 'Add New Customer', value: 'add_new'}]}
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
        renderItem={renderDropdownItem}
        selectedTextStyle={styles.dropdownSelectedText} // Add this line
      />
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
      <TextInputComponent
        placeholder="રૂપિયા"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        editable={false}
      />
      <TextInputComponent
        placeholder="ટોટલ"
        keyboardType="numeric"
        value={totalAmount}
        onChangeText={setTotalAmount}
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
            placeholderText="તારીખ પસંદ કરો"
            value={fromDate}
            mode="date"
            display="spinner"
            onChange={onChangeFromDate}
            style={styles.datePicker}
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

      {/* Modal for adding a new customer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handlePressOutside}>
        <Pressable style={styles.centeredView} onPress={handlePressOutside}>
          <Pressable
            style={styles.modalView}
            onPress={e => e.stopPropagation()} // Prevents press inside the modal from closing it
          >
            <Text style={styles.modalTitle}>નવો ગ્રાહક ઉમેરો</Text>
            <TextInput
              style={styles.input}
              placeholder="ગ્રાહક નું નામ"
              placeholderTextColor="#c0c0c0"
              value={newCustomerName}
              onChangeText={setNewCustomerName}
            />
            <TextInput
              style={styles.input}
              placeholder="ગ્રાહક મોબાઇલ નંબર"
              value={newCustomerMobile}
              placeholderTextColor="#c0c0c0"
              onChangeText={setNewCustomerMobile}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonAdd]}
              onPress={handleModalSubmit}>
              <Text style={styles.textStyle}>ઉમેરો</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={handlePressOutside}>
              <Text style={styles.textStyle}>રદ કરો</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
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
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  dropdownPlaceholder: {
    color: '#000', // Black color for placeholder text
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    color: '#000', // Black color for dropdown options
  },
  dropdownSelectedText: {
    color: '#000', // Black color for selected item text
  },
  addNewItem: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
  },
  addNewText: {
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
    color: '#000', // Black color for selected date
  },
  datePicker: {
    color: '#c0c0c0', // DatePicker color
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
    width: '80%', // Full width of the modal
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
    width: '100%', // Full width
    alignItems: 'center',
  },
  buttonAdd: {
    backgroundColor: '#4CAF50', // Preferred color
  },
  buttonCancel: {
    backgroundColor: '#4CAF50',
    marginTop: 5, // Preferred color
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: '#000', // Black color for modal title
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

export default AddFlowerForm;
