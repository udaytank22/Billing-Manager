import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import CustomHeader from './components/CustomHeader'; // Import custom header
import CardComponent from './components/HomeCardComponent'; // New card component
import cards from './elements/dummyData'; // Import dummy data
import * as Animatable from 'react-native-animatable';

const Home = ({ navigation }) => {
  const [isAddNowOpen, setIsAddNowOpen] = useState(false);

  const toggleAddNow = () => {
    setIsAddNowOpen(!isAddNowOpen);
  };

  const renderCard = ({ item, index }) => {
    return (
      <Animatable.View animation="fadeInUp" duration={1000} delay={index * 600}>
        <CardComponent
          data={item}
          navigation={navigation}
        />
      </Animatable.View>
    );
  };

  return (
    <View style={styles.gradient}>
      <CustomHeader title="Home" showBackButton={false} showProfile={true} onPress={() => navigation.navigate('ProfileUpdate')} />

      <View style={styles.container}>


        <FlatList
          data={cards}
          renderItem={renderCard}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: '#FAF7F0'
  },
  container: {
    paddingHorizontal: 15,
  },
  totalContainer: {
    position: 'absolute',
    right: 0,
    top: 10,
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  totalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  colorIndicator: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 5,
  },
  totalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  graphContainer: {
    alignItems: 'center',
  },
  gridContainer: {
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FF6347',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plusIcon: {
    fontSize: 28,
    color: '#fff',
  },
  addNowContainer: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    padding: 20,
  },
  entryButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  entryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;
