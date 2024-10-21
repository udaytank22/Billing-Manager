import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import TextInputComponent from './components/InputFieldComponent';
import * as Animatable from 'react-native-animatable';
import CustomHeader from './components/CustomHeader';

const MoneyCollectionForm = () => {
  const [customer, setCustomer] = useState('');
  const [notCollectedAmount, setNotCollectedAmount] = useState('');
  const [collectedAmount, setCollectedAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('0'); // Default value set to '0'
  const [remark, setRemark] = useState('');
  const [status, setStatus] = useState(''); // Status to display deposited amount
  const [customers, setCustomers] = useState([
    { label: 'ઉદય ટાંક', value: 'uday', notCollected: '200' },
    { label: 'જયેશ પટેલ', value: 'jayesh', notCollected: '150' },
    { label: 'મનિષા શાહ', value: 'manisha', notCollected: '300' },
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

    if (collected < notCollected) {
      setTotalAmount((notCollected - collected).toString());
      setStatus(`બાકી: ₹${(notCollected - collected).toString()}`);
    } else if (collected > notCollected) {
      setTotalAmount('0');
      setStatus(`હાલ ઉપલબ્ધ: ₹${(collected - notCollected).toString()}`);
    } else if (collected == notCollected) {
      setTotalAmount('0');
      setStatus(`હિસાબ ક્લિયર`);
    } else {
      setTotalAmount('0');
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
    <>
      <CustomHeader title='Add collected Money' showBackButton={true} onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>


        <Animatable.View animation="fadeInUp" duration={800}>
          <Text style={styles.fieldTitle}>ગ્રાહક પસંદ કરો</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={customers}
            search
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder='ગ્રાહક'
            value={customer}
            onChange={item => handleCustomerChange(item.value)}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={800}>
          <Text style={styles.fieldTitle}>બાકી રકમ</Text>
          <TextInputComponent
            placeholder="બાકી રકમ"
            keyboardType="numeric"
            value={notCollectedAmount}
            editable={false}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={800}>
          <Text style={styles.fieldTitle}>એકત્રિત રકમ</Text>
          <TextInputComponent
            placeholder="એકત્રિત રકમ"
            keyboardType="numeric"
            value={collectedAmount}
            onChangeText={handleCollectedAmountChange}
          />
        </Animatable.View>

        {status ? (
          <Animatable.View animation="fadeInUp" duration={800}>
            <Text style={styles.statusText}>{status}</Text>
          </Animatable.View>
        ) : null}

        <Animatable.View animation="fadeInUp" duration={800}>
          <Text style={styles.fieldTitle}>નોંધ</Text>
          <TextInputComponent
            placeholder="નોંધ"
            value={remark}
            onChangeText={setRemark}
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  fieldTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
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
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
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
  dropdownText: {
    color: 'black',
  },
  placeholderText: {
    color: '#c0c0c0',
  },
  selectedText: {
    color: 'black',
  },
  statusText: {
    color: '#FF5722', // Change to a more noticeable color
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3, // Button shadow
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoneyCollectionForm;
