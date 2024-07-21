import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'; // Assuming you want to use FontAwesome icons
import CardComponent from './components/HomeCardComponent';
import * as Animatable from 'react-native-animatable';

const Home = ({navigation}) => {
  const handleCardPress = title => {
    // Handle press logic here
    console.log(`Pressed ${title}`);
  };

  // const openDrawer = () => {
  //   navigation.openDrawer(); // Function to open the drawer navigation
  // };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <Animatable.View animation="fadeIn" delay={500} style={styles.grid}>
          <CardComponent
            title="ડેઇલી ફ્લાવર કલેક્શન દાખલ કરો"
            value="ફ્લાવર"
            backgroundColor="#8e44ad"
            onPress={() => navigation.navigate('Flower')}
            style={styles.card}
          />
          <CardComponent
            title="દૈનિક શાકભાજી સંગ્રહ દાખલ કરો"
            value="શાકભાજી"
            backgroundColor="#2980b9"
            onPress={() => navigation.navigate('Vegetable')}
            style={styles.card}
          />
          <CardComponent
            title="મુલી ની હાજરી નાખો"
            value="મુલી"
            backgroundColor="#e74c3c"
            onPress={() => navigation.navigate('EmployeeHome')}
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
    backgroundColor: '#252525',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B134F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  drawerIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    // textAlign: 'center',
    flex: 1, // To make sure the text takes remaining space
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Two cards per row with some spacing
    marginBottom: 10,
  },
});

export default Home;
