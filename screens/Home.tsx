import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CustomHeader from './components/CustomHeader';
import CardComponent from './components/HomeCardComponent';
import cards from './elements/dummyData';
import * as Animatable from 'react-native-animatable';

const Home = ({ navigation }) => {
  const renderCard = ({ item, index }) => {
    return (
      <Animatable.View animation="fadeInUp" duration={1000} delay={index * 500}>
        <CardComponent
          data={item}
          navigation={navigation}
        />
      </Animatable.View>
    );
  };

  return (
    <View style={styles.gradient}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  gridContainer: {
    paddingBottom: 20,
  },
});

export default Home;