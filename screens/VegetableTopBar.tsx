import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';
import VegetableHome from './VegetableHome';

const Topbar = createMaterialTopTabNavigator();

const Flower = () => {
  return (
    <Topbar.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#f4f4f4' }, // Top bar background color
        tabBarActiveTintColor: '#000', // Active tab text color (orange tone as mentioned for consistency)
        tabBarInactiveTintColor: '#bbb', // Inactive tab text color
        tabBarLabelStyle: { fontSize: 13 }, // Tab label font size
        tabBarIndicatorStyle: { backgroundColor: '#000' }, // Indicator color under active tab
      }}>
      <Topbar.Screen
        name="Daily"
        component={VegetableHome}
        initialParams={{ status: 'Daily' }}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={styles.tabLabelContainer}>
              <Image
                source={require('../Images/6307185-removebg-preview.png')}
                style={styles.icon}
              />
              <Text style={{ color: focused ? '#000' : '#bbb', marginLeft: 5 }}>
                દૈનિક
              </Text>
            </View>
          ),
        }}
      />
      <Topbar.Screen
        name="AllEntries"
        component={VegetableHome}
        initialParams={{ status: 'AllEntry' }}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={styles.tabLabelContainer}>
              <Image
                source={require('../Images/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept.png')}
                style={styles.icon}
              />
              <Text style={{ color: focused ? '#000' : '#bbb', marginLeft: 5 }}>
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
