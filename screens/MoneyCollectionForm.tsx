import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import TextInputComponent from './components/InputFieldComponent';

const MoneyCollectionForm = () => {
  const [customer, setCustomer] = useState('');
  const [notCollectedAmount, setNotCollectedAmount] = useState('');
  const [collectedAmount, setCollectedAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('0'); // Default value set to '0'
  const [remark, setRemark] = useState('');
  const [status, setStatus] = useState(''); // Status to display deposited amount
  const [customers, setCustomers] = useState([
    {label: 'ઉદય ટાંક', value: 'uday', notCollected: '200'},
    {label: 'જયેશ પટેલ', value: 'jayesh', notCollected: '150'},
    {label: 'મનિષા શાહ', value: 'manisha', notCollected: '300'},
  ]);

  const handleCustomerChange = value => {
    const selectedCustomer = customers.find(c => c.value === value);
    setCustomer(value);
    setNotCollectedAmount(selectedCustomer?.notCollected || '');
  };

  const handleCollectedAmountChange = text => {
    setCollectedAmount(text);
    const collected = parseFloat(text);
    const notCollected = parseFloat(notCollectedAmount);
    const total = notCollected - collected;

    if (collected > notCollected) {
      setTotalAmount(notCollectedAmount);
      setStatus(`જમા: ₹${(collected - notCollected).toString()}`);
    } else {
      setTotalAmount(total >= 0 ? total.toString() : '');
      setStatus('');
    }
  };

  const handleSubmit = () => {
    console.log('Customer:', customer);
    console.log('Not Collected Amount:', notCollectedAmount);
    console.log('Collected Amount:', collectedAmount);
    console.log('Total Amount:', totalAmount);
    console.log('Remark:', remark);
    console.log('Status:', status);
    // Handle form submission to database
  };

  const renderDropdownItem = item => (
    <View style={styles.dropdownItem}>
      <Text style={styles.dropdownText}>{item.label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>રૂપિયાનો હિસાબ દાખલ કરો</Text>
      <Dropdown
        style={styles.dropdown}
        data={customers}
        labelField="label"
        valueField="value"
        placeholder="ગ્રાહક પસંદ કરો"
        placeholderStyle={styles.placeholderText}
        value={customer}
        onChange={item => handleCustomerChange(item.value)}
        renderItem={renderDropdownItem}
        selectedTextStyle={styles.selectedText} // Ensure selected option text color is black
      />
      <TextInputComponent
        placeholder="બાકી રકમ"
        keyboardType="numeric"
        value={notCollectedAmount}
        editable={false}
      />
      <TextInputComponent
        placeholder="એકત્રિત રકમ"
        keyboardType="numeric"
        value={collectedAmount}
        onChangeText={handleCollectedAmountChange}
      />
      <TextInputComponent
        placeholder="કુલ રકમ"
        keyboardType="numeric"
        value={totalAmount}
        editable={false}
      />
      {status ? <Text style={styles.statusText}>{status}</Text> : null}
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
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  dropdownText: {
    color: 'black', // Set dropdown item text color to black
  },
  placeholderText: {
    color: '#c0c0c0', // Placeholder text color
  },
  selectedText: {
    color: 'black', // Ensure selected dropdown item text color is black
  },
  statusText: {
    color: '#000', // Red color for status text
    fontSize: 16,
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

export default MoneyCollectionForm;
