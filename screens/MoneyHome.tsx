import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import CollectedCard from './elements/CollectionCard';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');

const MoneyHome = ({route, navigation}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [search, setSearch] = useState('');

  const names = [
    {label: 'ઉદય ટાંક', value: 'ઉદય ટાંક'},
    {label: 'જયેશ પટેલ', value: 'જયેશ Patel'},
    {label: 'મનિષા શાહ', value: 'મનિષા શાહ'},
    // Add more names as needed
  ];

  const statuses = [
    {label: 'Collected', value: 'Collected'},
    {label: 'Pending', value: 'Pending'},
    // Add more statuses as needed
  ];

  const customers = [
    {
      name: 'ઉદય ટાંક',
      collectedAmount: '500',
      notCollectedAmount: '200',
      lastCollectedDate: '25/07/2024',
      status: 'Collected',
    },
    {
      name: 'જયેશ Patel',
      collectedAmount: '700',
      notCollectedAmount: '100',
      lastCollectedDate: '28/05/2024',
      status: 'Pending',
    },
    {
      name: 'મનિષા શાહ',
      collectedAmount: '300',
      notCollectedAmount: '50',
      lastCollectedDate: '27/01/2024',
      status: 'Collected',
    },
    {
      name: 'રાજેશ ગોસ્વામી',
      collectedAmount: '800',
      notCollectedAmount: '150',
      lastCollectedDate: '15/03/2024',
      status: 'Pending',
    },
    {
      name: 'નિતિન શર્મા',
      collectedAmount: '600',
      notCollectedAmount: '100',
      lastCollectedDate: '20/02/2024',
      status: 'Collected',
    },
    {
      name: 'પ્રિયા પટેલ',
      collectedAmount: '400',
      notCollectedAmount: '50',
      lastCollectedDate: '10/04/2024',
      status: 'Pending',
    },
    {
      name: 'રાહુલ સિંહ',
      collectedAmount: '900',
      notCollectedAmount: '200',
      lastCollectedDate: '05/06/2024',
      status: 'Collected',
    },
    {
      name: 'કિરણ ગાંધી',
      collectedAmount: '550',
      notCollectedAmount: '100',
      lastCollectedDate: '18/07/2024',
      status: 'Pending',
    },
    {
      name: 'સુરેશ મહેતા',
      collectedAmount: '350',
      notCollectedAmount: '50',
      lastCollectedDate: '22/08/2024',
      status: 'Collected',
    },
    {
      name: 'દિનેશ પરમાર',
      collectedAmount: '450',
      notCollectedAmount: '100',
      lastCollectedDate: '01/09/2024',
      status: 'Pending',
    },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesName = selectedName ? customer.name === selectedName : true;
    const matchesDate = selectedDate
      ? customer.lastCollectedDate === selectedDate.toISOString().split('T')[0]
      : true;
    const matchesStatus = selectedStatus
      ? customer.status === selectedStatus
      : true;
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesName && matchesDate && matchesStatus && matchesSearch;
  });

  const handleFilterApply = () => {
    setShowFilterModal(false);
  };

  const handleFilterClear = () => {
    setSelectedName('');
    setSelectedDate(null);
    setSelectedStatus('');
    setSearch('');
    setShowFilterModal(false);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const renderItem = ({item, index}) => (
    <Animatable.View
      key={index}
      animation="fadeInUp"
      duration={700}
      delay={index * 700}>
      <CollectedCard
        name={item.name}
        collectedAmount={item.collectedAmount}
        notCollectedAmount={item.notCollectedAmount}
        collectedDate={item.lastCollectedDate}
        status={item.status}
      />
    </Animatable.View>
  );

  return (
    <>
      <View style={styles.container}>
        <Animatable.View
          animation="fadeIn"
          duration={5000}
          style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="શોધો"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}>
            <Text style={styles.filterButtonText}>શોધો</Text>
          </TouchableOpacity>
        </Animatable.View>

        <FlatList
          data={filteredCustomers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={() => setShowFilterModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>ફિલ્ટર</Text>

            <Dropdown
              style={styles.dropdown}
              data={names}
              labelField="label"
              valueField="value"
              placeholder="નામ પસંદ કરો"
              placeholderStyle={{color: '#000'}}
              value={selectedName}
              onChange={item => setSelectedName(item.value)}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>
                {selectedDate ? selectedDate.toDateString() : 'તારીખ પસંદ કરો'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}

            <Dropdown
              style={styles.dropdown}
              data={statuses}
              labelField="label"
              valueField="value"
              placeholder="સ્થિતિ પસંદ કરો"
              value={selectedStatus}
              onChange={item => setSelectedStatus(item.value)}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleFilterApply}>
                <Text style={styles.applyButtonText}>એપ્લાય</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleFilterClear}>
                <Text style={styles.clearButtonText}>ક્લિયર</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFilterModal(false)}>
                <Text style={styles.closeButtonText}>બંધ કરો</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {route.params.status === 'Pending' && (
        <Animatable.View
          animation="slideInRight"
          duration={4000}
          style={[styles.addButtonContainer, {right: width * -0.03}]}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.push('MoneyCollectionForm')}>
            <Text style={styles.addButtonText}>એન્ટ્રી ઉમેરો</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2E35',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 20,
    borderRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    backgroundColor: '#03a9f4',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#03a9f4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#9e9e9e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 40,
  },
  addButton: {
    backgroundColor: '#FFC542',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default MoneyHome;
