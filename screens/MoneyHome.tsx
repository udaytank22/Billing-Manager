import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import CollectedCard from './elements/CollectionCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Header from './components/CustomHeader';

const { width } = Dimensions.get('window');

const MoneyHome = ({ route, navigation }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [search, setSearch] = useState('');

  const customers = [
    {
      name: 'ઉદય ટાંક',
      collectedAmount: '500',
      notCollectedAmount: '0',
      lastCollectedDate: '25/07/2024',
      status: 'Collected',
      contactNo: '1234567890'
    },
    {
      name: 'જયેશ Patel',
      collectedAmount: '700',
      notCollectedAmount: '100',
      lastCollectedDate: '28/05/2024',
      status: 'Pending',
      contactNo: '1234567890'
    },
    {
      name: 'મનિષા શાહ',
      collectedAmount: '300',
      notCollectedAmount: '50',
      lastCollectedDate: '27/01/2024',
      status: 'Collected',
      contactNo: '1234567890'
    },
    {
      name: 'રાજેશ ગોસ્વામી',
      collectedAmount: '800',
      notCollectedAmount: '150',
      lastCollectedDate: '15/03/2024',
      status: 'Pending',
      contactNo: '1234567890'
    },
    {
      name: 'નિતિન શર્મા',
      collectedAmount: '600',
      notCollectedAmount: '100',
      lastCollectedDate: '20/02/2024',
      status: 'Collected',
      contactNo: '1234567890'
    },
    {
      name: 'પ્રિયા પટેલ',
      collectedAmount: '400',
      notCollectedAmount: '50',
      lastCollectedDate: '10/04/2024',
      status: 'Pending',
      contactNo: '1234567890'
    },
    {
      name: 'રાહુલ સિંહ',
      collectedAmount: '900',
      notCollectedAmount: '200',
      lastCollectedDate: '05/06/2024',
      status: 'Collected',
      contactNo: '1234567890'
    },
    {
      name: 'કિરણ ગાંધી',
      collectedAmount: '550',
      notCollectedAmount: '100',
      lastCollectedDate: '18/07/2024',
      status: 'Pending',
      contactNo: '1234567890'
    },
    {
      name: 'સુરેશ મહેતા',
      collectedAmount: '350',
      notCollectedAmount: '50',
      lastCollectedDate: '22/08/2024',
      status: 'Collected',
      contactNo: '1234567890'
    },
    {
      name: 'દિનેશ પરમાર',
      collectedAmount: '450',
      notCollectedAmount: '100',
      lastCollectedDate: '01/09/2024',
      status: 'Pending',
      contactNo: '1234567890'
    },
  ];


  const filteredCustomers = customers.filter(customer => {
    const matchesName = selectedName ? customer.name === selectedName : true;
    const matchesSearch = customer.name.toLowerCase().includes(search.toLowerCase());
    return matchesName && matchesSearch;
  });

  const renderItem = ({ item, index }) => (
    <Animatable.View key={index} animation="fadeInUp" duration={700} delay={index * 700}>
      <CollectedCard
        name={item.name}
        collectedAmount={item.collectedAmount}
        notCollectedAmount={item.notCollectedAmount}
        collectedDate={item.lastCollectedDate}
        contactDetails={item.contactNo}
        status={item.status}
      />
    </Animatable.View>
  );

  return (
    <View
      style={styles.gradientContainer}>
      <Header title='Money' showBackButton={true} onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Animatable.View animation="fadeIn" duration={1000} style={styles.searchContainer}>
          <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="શોધો"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </Animatable.View>

        <FlatList
          data={filteredCustomers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
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
});

export default MoneyHome;
