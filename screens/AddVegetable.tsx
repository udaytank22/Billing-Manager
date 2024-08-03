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
import * as Animatable from 'react-native-animatable';

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
      <Animatable.View animation="fadeInUp" duration={800}>
        <Text style={styles.fieldTitle}>શાકભાજી પસંદ કરો</Text>
        <Dropdown
          style={styles.dropdown}
          data={vegetables}
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
          selectedTextStyle={styles.selectedText} // Adding selectedTextStyle
        />
      </Animatable.View>
      {bags.map((bag, index) => (
        <Animatable.View key={index} animation="fadeInUp" duration={800}>
          <View style={styles.bagContainer}>
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
        </Animatable.View>
      ))}
      <Animatable.View animation="fadeInUp" duration={800}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddBag}>
          <Text style={styles.addButtonText}>ઝબલા ઉમેરો</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" duration={800}>
        <Text style={styles.fieldTitle}>કુલ બેગ</Text>
        <TextInputComponent
          placeholder="કુલ બેગ"
          keyboardType="numeric"
          value={totalBags}
          editable={false}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" duration={800}>
        <Text style={styles.fieldTitle}>કુલ વજન</Text>
        <TextInputComponent
          placeholder="કુલ વજન"
          keyboardType="numeric"
          value={totalWeight}
          editable={false}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" duration={800}>
        <Text style={styles.fieldTitle}>તારીખ પસંદ કરો</Text>
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
      </Animatable.View>
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
              style={styles.modalInput}
              placeholder="શાકભાજી નામ"
              value={newVegetableName}
              onChangeText={setNewVegetableName}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalSubmit}>
              <Text style={styles.modalButtonText}>ઉમેરો</Text>
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
    padding: 16,
    backgroundColor: '#1F2E35',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff',
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  placeholderText: {
    color: '#000',
  },
  dropdownText: {
    color: '#ffffff',
  },
  bagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    color: '#000000',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  dateText: {
    color: '#000',
  },
  fieldTitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#2C3E50',
  },
  addNewItem: {
    padding: 10,
    backgroundColor: '#1ABC9C',
  },
  addNewText: {
    color: '#ffffff',
  },
});

export default AddVegetableForm;
