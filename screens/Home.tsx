import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CustomHeader from './components/CustomHeader';
import CardComponent from './components/HomeCardComponent';
import cards from './elements/dummyData';
import * as Animatable from 'react-native-animatable';

const Home = ({ navigation }) => {
  const [authVisible, setAuthVisible] = useState(false);

  const handleCardPress = (item) => {
    if (item.id === '5') { // Check if it's the "Make Bill" module
      setAuthVisible(true); // Show the authentication component
    } else {
      navigation.navigate(item.navigateTo); // Navigate directly for other modules
    }
  };

  const handleAuthenticationSuccess = () => {
    setAuthVisible(false); // Close the authentication component
    navigation.navigate('MakeBill'); // Navigate to the "Make Bill" module on success
  };

  const renderCard = ({ item, index }) => {
    return (
      <Animatable.View animation="fadeInUp" duration={1000} delay={index * 300}>
        <CardComponent
          data={item}
          navigation={navigation}
          onPress={() => handleCardPress(item)} // Pass the item to handleCardPress
        />
      </Animatable.View>
    );
  };

  return (
    <>
      <CustomHeader
        title="Dashboard"
        showBackButton={false}
        showProfile={true}
        onPress={() => navigation.navigate('ProfileUpdate')}
      />
      <View style={styles.container}>
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
  },
  gridContainer: {
    paddingBottom: 30,
  },
});

export default Home;
