import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Image, StyleSheet, Text, View} from 'react-native';
import FloweHome from './FlowerHome';

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
        name="Daily"
        component={FloweHome}
        initialParams={{status: 'Daily'}}
        options={{
          tabBarLabel: ({focused}) => (
            <View style={styles.tabLabelContainer}>
              <Image
                source={require('../Images/6307185-removebg-preview.png')}
                style={styles.icon}
              />
              <Text style={{color: focused ? '#fff' : '#bbb', marginLeft: 5}}>
                દૈનિક
              </Text>
            </View>
          ),
        }}
      />
      <Topbar.Screen
        name="AllEntries"
        component={FloweHome}
        initialParams={{status: 'AllEntry'}}
        options={{
          tabBarLabel: ({focused}) => (
            <View style={styles.tabLabelContainer}>
              <Image
                source={require('../Images/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept.png')}
                style={styles.icon}
              />
              <Text style={{color: focused ? '#fff' : '#bbb', marginLeft: 5}}>
                બધી એન્ટ્રીઓ
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
