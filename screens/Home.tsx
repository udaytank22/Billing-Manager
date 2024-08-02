import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CardComponent from './components/HomeCardComponent';
import * as Animatable from 'react-native-animatable';

const Home = ({navigation}) => {
  const cards = [
    {
      title: 'ડેઇલી ફ્લાવર કલેક્શન દાખલ કરો',
      value: 'ફ્લાવર',
      backgroundColor: '#FFC542',
      imageSource: require('../Images/view-beautiful-abstract-3d-flower.png'),
      onPress: () => navigation.navigate('Flower'),
    },
    {
      title: 'દૈનિક શાકભાજી સંગ્રહ દાખલ કરો',
      value: 'શાકભાજી',
      backgroundColor: '#FF565E',
      imageSource: require('../Images/gradient-christmas-basket-illustration.png'),
      onPress: () => navigation.navigate('Vegetable'),
    },
    {
      title: 'મુલી ની હાજરી નાખો',
      value: 'મુલી',
      backgroundColor: '#3ED598',
      imageSource: require('../Images/india-republic-day-national-celebration-3d-style.png'),
      onPress: () => navigation.navigate('EmployeeHome'),
    },
    {
      title: 'રૂપિયાનો હિસાબ દાખલ કરો',
      value: 'રૂપિયા',
      backgroundColor: '#FF565E',
      imageSource: require('../Images/stack-money-gold-coins-3d-cartoon-style-icon-coins-with-dollar-sign-wad-cash-currency-flat-vector-illustration-wealth-investment-success-savings-economy-profit-concept.png'),
      onPress: () => navigation.navigate('MoneyTopTabBar'),
    },
    {
      title: 'બિલ બનાવો અને ડાઉનલોડ કરો',
      value: 'રૂપિયા',
      backgroundColor: '#3ED598',
      imageSource: require('../Images/blue-folder-with-information-about-employee-3d-illustration-cartoon-drawing-folder-with-files-documents-3d-style-white-background-business-recruitment-management-organization-concept.png'),
      onPress: () => navigation.navigate('MakeBill'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.grid}>
          {cards.map((card, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={500}
              delay={index * 300}
              style={styles.card}>
              <CardComponent
                title={card.title}
                value={card.value}
                backgroundColor={card.backgroundColor}
                imageSource={card.imageSource}
                onPress={card.onPress}
              />
            </Animatable.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1F2E35', // Background color for the container
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'column',
  },
  card: {
    width: '100%',
    marginBottom: 10,
  },
});

export default Home;
