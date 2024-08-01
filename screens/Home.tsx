import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Card} from 'react-native-paper';
import CardComponent from './components/HomeCardComponent';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({navigation}) => {
  return (
    <LinearGradient colors={['#2C5364', '#203A43']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <Animatable.View
          animation="fadeIn"
          duration={1000}
          style={styles.header}>
          <Card style={styles.totalCard}>
            <Animatable.View animation="fadeIn" duration={800} delay={500}>
              <Text style={styles.headerText}>કુલ એન્ટ્રીઓ</Text>
              <View style={styles.totalCountContainer}>
                <CardComponent
                  title="ફૂલો"
                  value="10"
                  backgroundColor={['#283048', '#859398']}
                  icon="leaf"
                  gradient={true}
                  disabled={true}
                />
                <CardComponent
                  title="શાકભાજી"
                  value="20"
                  backgroundColor={['#283048', '#859398']}
                  icon="shopping-basket"
                  gradient={true}
                  disabled={true}
                />
              </View>
            </Animatable.View>
          </Card>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={500}
          style={styles.grid}>
          <CardComponent
            title="ડેઇલી ફ્લાવર કલેક્શન દાખલ કરો"
            value="ફ્લાવર"
            backgroundColor={['#283048', '#859398']}
            icon="leaf"
            onPress={() => navigation.navigate('Flower')}
            gradient={true}
          />
          <CardComponent
            title="દૈનિક શાકભાજી સંગ્રહ દાખલ કરો"
            value="શાકભાજી"
            backgroundColor={['#859398', '#283048']}
            icon="shopping-basket"
            onPress={() => navigation.navigate('Vegetable')}
            gradient={true}
          />
          <CardComponent
            title="મુલી ની હાજરી નાખો"
            value="મુલી"
            backgroundColor={['#283048', '#859398']}
            icon="group"
            onPress={() => navigation.navigate('EmployeeHome')}
            gradient={true}
          />
          <CardComponent
            title="રૂપિયાનો હિસાબ દાખલ કરો"
            value="રૂપિયા"
            backgroundColor={['#859398', '#283048']}
            icon="money"
            onPress={() => navigation.navigate('MoneyTopTabBar')}
            gradient={true}
          />
          <CardComponent
            title="બિલ બનાવો અને ડાઉનલોડ કરો"
            value="રૂપિયા"
            backgroundColor={['#283048', '#859398']}
            icon="file"
            onPress={() => navigation.navigate('MakeBill')}
            gradient={true}
          />
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalCard: {
    width: '100%',
    padding: 20,
    elevation: 0, // Remove shadow
    borderWidth: 0, // Remove border width
    borderColor: 'transparent', // Set border color to transparent
    backgroundColor: 'transparent',
    overflow: 'hidden', // Make background transparent
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
