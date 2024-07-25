import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputComponent from './components/InputFieldComponent';
import {Dropdown} from 'react-native-element-dropdown';

const AddVegetableForm = () => {
  const [customer, setCustomer] = useState('');
  const [bags, setBags] = useState([{quantity: '', weight: ''}]);
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateDisplay, setFromDateDisplay] = useState('');
  const [fromDateServer, setFromDateServer] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [remark, setRemark] = useState('');
  const [totalBags, setTotalBags] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newVegetableName, setNewVegetableName] = useState('');
  const [vegetables, setVegetables] = useState([
    {label: 'બટાકા', value: 'બટાકા'},
    {label: 'લીલી ડુંગળી', value: 'લીલી ડુંગળી'},
    {label: 'ફુલાવર', value: 'ફુલાવર'},
  ]);

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

  const handleAddBag = () => {
    setBags([...bags, {quantity: '', weight: ''}]);
  };

  const handleBagChange = (index, field, value) => {
    const updatedBags = bags.map((bag, i) => {
      if (i === index) {
        return {...bag, [field]: value};
      }
      return bag;
    });
    setBags(updatedBags);
    calculateTotals(updatedBags);
  };

  const calculateTotals = bags => {
    let totalBags = 0;
    let totalWeight = 0;
    bags.forEach(bag => {
      totalBags += parseInt(bag.quantity) || 0;
      totalWeight +=
        (parseInt(bag.quantity) || 0) * (parseFloat(bag.weight) || 0);
    });
    setTotalBags(totalBags.toString());
    setTotalWeight(totalWeight.toString());
  };

  const handleSubmit = () => {
    console.log('Customer:', customer);
    console.log('Bags:', bags);
    console.log('Total Bags:', totalBags);
    console.log('Total Weight:', totalWeight);
    console.log('Date:', fromDateServer);
    console.log('Remark:', remark);
    // Handle form submission to database
  };

  const handleAddVegetable = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    if (newVegetableName) {
      setVegetables([
        ...vegetables,
        {label: newVegetableName, value: newVegetableName},
      ]);
      setCustomer(newVegetableName);
      setModalVisible(false);
      setNewVegetableName('');
    } else {
      alert('Please fill in the vegetable name field.');
    }
  };

  const handlePressOutside = () => {
    setModalVisible(false);
  };

  const renderDropdownItem = item => {
    if (item.value === 'add_new') {
      return (
        <TouchableOpacity
          style={[styles.addNewItem]}
          onPress={handleAddVegetable}>
          <Text style={styles.addNewText}>નવી શાકભાજી ઉમેરો</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.dropdownText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>શાકભાજી ઉમેરો</Text>
      <Dropdown
        style={styles.dropdown}
        data={[...vegetables, {label: 'Add New Vegetable', value: 'add_new'}]}
        labelField="label"
        valueField="value"
        placeholder="શાકભાજી પસંદ કરો"
        placeholderStyle={styles.placeholderText}
        value={customer}
        onChange={item => {
          if (item.value !== 'add_new') {
            setCustomer(item.value);
          }
        }}
        renderItem={renderDropdownItem}
      />
      {bags.map((bag, index) => (
        <View key={index} style={styles.bagContainer}>
          <TextInputComponent
            placeholder="ઝબલાની સંખ્યા"
            keyboardType="numeric"
            value={bag.quantity}
            onChangeText={text => handleBagChange(index, 'quantity', text)}
          />
          <TextInputComponent
            placeholder="વજન (કિલોગ્રામમાં)"
            keyboardType="numeric"
            value={bag.weight}
            onChangeText={text => handleBagChange(index, 'weight', text)}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddBag}>
        <Text style={styles.addButtonText}>ઝબલા ઉમેરો</Text>
      </TouchableOpacity>
      <TextInputComponent
        placeholder="કુલ બેગ"
        keyboardType="numeric"
        value={totalBags}
        editable={false}
      />
      <TextInputComponent
        placeholder="કુલ વજન"
        keyboardType="numeric"
        value={totalWeight}
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
            value={fromDate}
            mode="date"
            display="spinner"
            onChange={onChangeFromDate}
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

      {/* Modal for adding a new vegetable */}
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
            <Text style={styles.modalTitle}>નવી શાકભાજી ઉમેરો</Text>
            <TextInput
              style={styles.input}
              placeholder="શાકભાજીનું નામ"
              value={newVegetableName}
              onChangeText={setNewVegetableName}
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
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  dropdownText: {
    color: 'black',
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
  placeholderText: {
    color: 'black',
  },
  bagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
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
    paddingHorizontal: 15,
  },
  dateText: {
    color: 'black',
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
    marginTop: 10, // Preferred color
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
    color: 'black', // Black color for modal title
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%', // Full width
  },
});

export default AddVegetableForm;
