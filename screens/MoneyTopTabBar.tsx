import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Image, StyleSheet, Text, View} from 'react-native';
import FloweHome from './FlowerHome';
import MoneyHome from './MoneyHome';

const Topbar = createMaterialTopTabNavigator();

const Flower = () => {
  return (
    <Topbar.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#1F2E35'},
        tabBarActiveTintColor: '#1F2E35',
        tabBarLabelStyle: {fontSize: 13},
      }}>
      <Topbar.Screen
        name="બાકી"
        component={MoneyHome}
        initialParams={{status: 'Pending'}}
        options={{
          tabBarLabel: ({focused}) => (
            <View style={styles.tabLabelContainer}>
              <Image
                source={require('../Images/6307185-removebg-preview.png')}
                style={styles.icon}
              />
              <Text style={{color: focused ? '#fff' : '#bbb', marginLeft: 5}}>
                બાકી
              </Text>
            </View>
          ),
        }}
      />
      <Topbar.Screen
        name="આવેલા"
        component={MoneyHome}
        initialParams={{status: 'Collected'}}
        options={{
          tabBarLabel: ({focused}) => (
            <View style={styles.tabLabelContainer}>
              <Image
                source={require('../Images/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept.png')}
                style={styles.icon}
              />
              <Text style={{color: focused ? '#fff' : '#bbb', marginLeft: 5}}>
                આવેલા
              </Text>
            </View>
          ),
        }}
      />
    </Topbar.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default Flower;
