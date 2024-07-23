import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CardComponent from './components/HomeCardComponent';
import * as Animatable from 'react-native-animatable';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <Animatable.View animation="fadeIn" delay={500} style={styles.grid}>
          <CardComponent
            title="ડેઇલી ફ્લાવર કલેક્શન દાખલ કરો"
            value="ફ્લાવર"
            backgroundColor="#f2a1c8" // Light pink
            icon="leaf"
            onPress={() => navigation.navigate('Flower')}
            style={styles.card}
          />
          <CardComponent
            title="દૈનિક શાકભાજી સંગ્રહ દાખલ કરો"
            value="શાકભાજી"
            backgroundColor="#a2d9ce" // Light green
            icon="shopping-basket"
            onPress={() => navigation.navigate('Vegetable')}
            style={styles.card}
          />
          <CardComponent
            title="મુલી ની હાજરી નાખો"
            value="મુલી"
            backgroundColor="#f9e79f" // Light yellow
            icon="group"
            onPress={() => navigation.navigate('EmployeeHome')}
            style={styles.card}
          />
          <CardComponent
            title="રૂપિયાનો હિસાબ દાખલ કરો"
            value="રૂપિયા"
            backgroundColor="#85c1ae" // Light teal
            icon="money"
            onPress={() => navigation.navigate('MoneyTopTabBar')}
            style={styles.card}
          />
          <CardComponent
            title="બિલ બનાવો અને ડાઉનલોડ કરો"
            value="રૂપિયા"
            backgroundColor="#d5a6d1" // Light lavender
            icon="file"
            onPress={() => navigation.navigate('MakeBill')}
            style={styles.card}
          />
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5', // Light grey background
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
    borderRadius: 10, // Rounded corners for a modern look
    elevation: 3, // Add shadow for better visibility
  },
});

export default Home;
