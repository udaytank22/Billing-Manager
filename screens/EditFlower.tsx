// EditDataForm.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import TextInputComponent from './components/InputFieldComponent';

const EditFlower = ({route}) => {
  //   const {cardData} = route.params; // Receive card data from the route parameters

  //   const [customer, setCustomer] = useState(cardData.customerName);
  //   const [quantity, setQuantity] = useState(cardData.flowerQuantity);
  //   const [fromDate, setFromDate] = useState(new Date(cardData.purchaseDate));
  //   const [fromDateDisplay, setFromDateDisplay] = useState('');
  //   const [fromDateServer, setFromDateServer] = useState('');
  //   const [remark, setRemark] = useState('');

  //   useEffect(() => {
  //     // Set the formatted dates based on the card data
  //     setFromDateDisplay(formatDate(new Date(cardData.purchaseDate), 'display'));
  //     setFromDateServer(formatDate(new Date(cardData.purchaseDate), 'server'));
  //     setRemark(cardData.remark || '');
  //   }, [cardData]);

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

  //   const handleSubmit = () => {
  //     console.log('Customer:', customer);
  //     console.log('Quantity:', quantity);
  //     console.log('Date:', fromDateServer);
  //     console.log('Remark:', remark);
  //     // Handle form submission to database
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Data</Text>
      <TextInputComponent
        placeholder="Customer"
        // value={customer}
        editable={false}
      />
      <TextInputComponent
        placeholder="Quantity"
        keyboardType="numeric"
        // value={quantity}
        editable={false}
      />
      <View style={styles.dateInput}>
        <Pressable>
          <Text style={styles.dateText}>
            {/* {fromDateDisplay || 'Select Date'} */}
          </Text>
        </Pressable>
      </View>
      <TextInputComponent
        placeholder="Remark"
        // value={remark}
        // onChangeText={setRemark}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => console.warn('Its Working')}>
        <Text style={styles.submitButtonText}>Submit</Text>
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

export default EditFlower;
