import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownComponent from './components/DropDownComponent';
import TextInputComponent from './components/InputFieldComponent';

const MoneyCollectionForm = () => {
  const [customer, setCustomer] = useState('');
  const [notCollectedAmount, setNotCollectedAmount] = useState('');
  const [collectedAmount, setCollectedAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [remark, setRemark] = useState('');

  const customers = [
    {label: 'ઉદય ટાંક', value: 'uday', notCollected: '200'},
    {label: 'જયેશ પટેલ', value: 'jayesh', notCollected: '150'},
    {label: 'મનિષા શાહ', value: 'manisha', notCollected: '300'},
    // Add more customers as needed
  ];

  const handleCustomerChange = value => {
    const selectedCustomer = customers.find(c => c.value === value);
    setCustomer(value);
    setNotCollectedAmount(selectedCustomer.notCollected);
  };

  const handleCollectedAmountChange = text => {
    setCollectedAmount(text);
    const total = parseFloat(notCollectedAmount) - parseFloat(text);
    setTotalAmount(total > 0 ? total.toString() : '');
  };

  const handleSubmit = () => {
    console.log('Customer:', customer);
    console.log('Not Collected Amount:', notCollectedAmount);
    console.log('Collected Amount:', collectedAmount);
    console.log('Total Amount:', totalAmount);
    console.log('Remark:', remark);
    // Handle form submission to database
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>રૂપિયાનો હિસાબ દાખલ કરો</Text>
      <DropDownComponent
        selectedValue={customer}
        onValueChange={handleCustomerChange}
        items={customers}
        placeholder="ગ્રાહક પસંદ કરો"
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
