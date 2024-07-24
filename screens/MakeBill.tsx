import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';

const MakeBill = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {label: 'કસ્ટમર 1', value: 'customer1'},
    {label: 'કસ્ટમર 2', value: 'customer2'},
    {label: 'કસ્ટમર 3', value: 'customer3'},
    {label: 'કસ્ટમર 4', value: 'customer4'},
  ];

  const toggleFromDatePicker = () => {
    setShowFromPicker(!showFromPicker);
  };

  const toggleToDatePicker = () => {
    setShowToPicker(!showToPicker);
  };

  const formatDate = rawDate => {
    if (!rawDate) return '';
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const onChangeFromDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowFromPicker(false);
    }
    setFromDate(selectedDate);
  };

  const onChangeToDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowToPicker(false);
    }
    setToDate(selectedDate);
  };

  const handleDownload = () => {
    // Add logic to download the PDF
    console.log('Download PDF');
  };

  const handleShare = () => {
    // Add logic to share the PDF
    console.log('Share PDF');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>બિલ બનાવો</Text>
      <Dropdown
        style={styles.dropdown}
        data={customers}
        labelField="label"
        valueField="value"
        placeholder="કસ્ટમર પસંદ કરો"
        value={selectedCustomer}
        onChange={item => {
          setSelectedCustomer(item.value);
        }}
      />
      <View style={styles.dateInput}>
        <Pressable onPress={toggleFromDatePicker}>
          <Text style={styles.dateText}>
            {formatDate(fromDate) || 'પ્રારંભ તારીખ પસંદ કરો'}
          </Text>
        </Pressable>
        {showFromPicker && (
          <DateTimePicker
            value={fromDate || new Date()}
            mode="date"
            display="spinner"
            onChange={onChangeFromDate}
          />
        )}
      </View>
      <View style={styles.dateInput}>
        <Pressable onPress={toggleToDatePicker}>
          <Text style={styles.dateText}>
            {formatDate(toDate) || 'અંતિમ તારીખ પસંદ કરો'}
          </Text>
        </Pressable>
        {showToPicker && (
          <DateTimePicker
            value={toDate || new Date()}
            mode="date"
            display="spinner"
            onChange={onChangeToDate}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Icon name="download" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>ડાઉનલોડ કરો</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Icon name="share" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>શેર કરો</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
    paddingHorizontal: 15,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default MakeBill;
