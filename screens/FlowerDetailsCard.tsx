import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardComponent from './components/FlowerCardComponent';

const FlowerCard = () => {
  const [search, setSearch] = useState('');
  const cardsData = [
    {
      customerName: 'Larry Walter',
      flowerQuantity: '5',
      flowerAmount: '500',
      purchaseDate: '2023-06-15',
    },
    {
      customerName: 'Jane Doe',
      flowerQuantity: '10',
      flowerAmount: '1000',
      purchaseDate: '2023-06-16',
    },
    {
      customerName: 'John Smith',
      flowerQuantity: '8',
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
          />
        ))}
      </ScrollView>
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
  },
  cardsContainer: {
    paddingBottom: 20,
  },
});

export default FlowerCard;
