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
import * as Animatable from 'react-native-animatable';

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

  const renderDropdownItem = item => (
    <View style={styles.dropdownItem}>
      <Text style={styles.dropdownText}>{item.label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInUp" style={styles.title}>
        બિલ બનાવો
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
        <Text style={styles.fieldTitle}>કસ્ટમર</Text>
        <Dropdown
          style={styles.dropdown}
          data={customers}
          labelField="label"
          valueField="value"
          placeholder="કસ્ટમર પસંદ કરો"
          placeholderStyle={styles.placeholderText}
          value={selectedCustomer}
          onChange={item => {
            setSelectedCustomer(item.value);
          }}
          renderItem={renderDropdownItem}
          selectedTextStyle={styles.selectedText}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
        <Text style={styles.fieldTitle}>પ્રારંભ તારીખ</Text>
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
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
        <Text style={styles.fieldTitle}>અંતિમ તારીખ</Text>
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
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Icon name="download" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>ડાઉનલોડ કરો</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Icon name="share" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>શેર કરો</Text>
        </TouchableOpacity>
      </Animatable.View>
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
  inputContainer: {
    marginBottom: 20,
  },
  fieldTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
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
  dateInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
