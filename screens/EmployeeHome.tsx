import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardComponent from './components/VegetableCardComponent';
import FixedBottom from './elements/FixedBottom';

const EmployeeHome = ({navigation}) => {
  const [search, setSearch] = React.useState('');

  const cardsData = [
    {
      customerName: 'બટાકા  ',
      VegetableWeight: '500',
      VegetableQuentity: '50',
      purchaseDate: '2023-06-15',
    },
    {
      customerName: 'લીલી ડુંગળી',
      VegetableWeight: '500',
      VegetableQuentity: '20',
      purchaseDate: '2023-06-16',
    },
    {
      customerName: 'ફુલાવર ',
      VegetableWeight: '500',
      VegetableQuentity: '80',
      purchaseDate: '2023-06-17',
    },
    {
      customerName: 'કાકડી',
      VegetableWeight: '500',
      VegetableQuentity: '80',
      purchaseDate: '2023-06-17',
      Remark: 'Just Testing',
    },
    // Add more data as needed
  ];

  const filteredData = cardsData.filter(card =>
    card.customerName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#000"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filteredData.map((card, index) => (
          <CardComponent
            key={index}
            vegetableName={card.customerName}
            vegetableWeight={card.VegetableWeight}
            vegetableQuentity={card.VegetableQuentity}
            dateNeeded={card.purchaseDate}
            remark={card.Remark}
            onPress={() => navigation.navigate('EditFlower')}
          />
        ))}
      </ScrollView>

      <FixedBottom>
        <View>
          <TouchableOpacity
            style={{
              marginRight: 15,
              backgroundColor: '#1d3557',
              borderRadius: 20,
              width: '50%',
              height: '50%',
              justifyContent: 'center',
            }}
            onPress={() => navigation.push('AddFlower')}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: 'white',
              }}>
              Add Entry
            </Text>
          </TouchableOpacity>
        </View>
      </FixedBottom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
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
  cardsContainer: {
    paddingBottom: 20,
  },
});

export default EmployeeHome;
