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
import CardComponent from './components/FlowerCardComponent';
import FixedBottom from './elements/FixedBottom';

const FloweHome = ({route, navigation}) => {
  const [search, setSearch] = React.useState('');

  const cardsData = [
    {
      customerName: 'ઉદય ટાંક ',
      flowerQuantity: '500',
      flowerAmount: '500',
      purchaseDate: '2023-06-15',
    },
    {
      customerName: 'Jane Doe',
      flowerQuantity: '100',
      flowerAmount: '1000',
      purchaseDate: '2023-06-16',
    },
    {
      customerName: 'John Smith',
      flowerQuantity: '800',
      flowerAmount: '800',
      purchaseDate: '2023-06-17',
    },
    {
      customerName: 'John Smith',
      flowerQuantity: '800',
      flowerAmount: '800',
      purchaseDate: '2023-06-17',
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
            customerName={card.customerName}
            flowerQuantity={card.flowerQuantity}
            flowerAmount={card.flowerAmount}
            purchaseDate={card.purchaseDate}
            onPress={() => navigation.navigate('EditFlower')}
          />
        ))}
      </ScrollView>

      {route.params.status === 'Daily' && (
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
      )}
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

export default FloweHome;
