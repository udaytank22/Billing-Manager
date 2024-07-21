import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VegetableCardComonent from './components/VegetableCardComponent';
import FixedBottom from './elements/FixedBottom';

const VegrtableHome = ({navigation, route}) => {
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
          placeholder="શોધો"
          placeholderTextColor="#000"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cardsContainer}
        renderItem={({item}) => (
          <VegetableCardComonent
            vegetableName={item.customerName}
            vegetableWeight={item.VegetableWeight}
            vegetableQuentity={item.VegetableQuentity}
            dateNeeded={item.purchaseDate}
            remark={item.Remark}
            type={'VegrtableHome'}
            onPress={() =>
              navigation.navigate('EditFlower', {
                cardData: item,
                pageType: 'VegrtableHome',
              })
            }
          />
        )}
      />

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
              onPress={() => navigation.push('AddVegetableForm')}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: 'white',
                }}>
                એન્ટ્રી ઉમેરો
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

export default VegrtableHome;
