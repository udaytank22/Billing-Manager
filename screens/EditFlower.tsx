import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import TextInputComponent from './components/InputFieldComponent';

const EditFlower = ({route}) => {
  const {cardData, pageType} = route.params;
  console.log(pageType);

  const [customer, setCustomer] = useState(cardData.customerName);
  const [quantity, setQuantity] = useState(
    pageType === 'VegrtableHome'
      ? cardData.VegetableWeight
      : cardData.flowerQuantity,
  );
  const [fromDate, setFromDate] = useState(new Date(cardData.purchaseDate));
  const [fromDateDisplay, setFromDateDisplay] = useState('');
  const [fromDateServer, setFromDateServer] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    setFromDateDisplay(formatDate(new Date(cardData.purchaseDate), 'display'));
    setFromDateServer(formatDate(new Date(cardData.purchaseDate), 'server'));
    setRemark(cardData.remark || '');
  }, [cardData]);

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

  const handleSubmit = () => {
    console.log('Customer:', customer);
    console.log('Quantity:', quantity);
    console.log('Date:', fromDateServer);
    console.log('Remark:', remark);
    // Handle form submission to database
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ડેટા સંપાદિત કરો</Text>
      <TextInputComponent
        placeholder="ગ્રાહક"
        value={customer}
        editable={false}
      />
      <TextInputComponent
        placeholder="જથ્થો"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <View style={styles.dateInput}>
        <Pressable>
          <Text style={styles.dateText}>
            {fromDateDisplay || 'તારીખ પસંદ કરો'}
          </Text>
        </Pressable>
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

export default EditFlower;
