import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FloweHome from './FlowerHome';

const topbar = createMaterialTopTabNavigator();

const Flower = () => {
  return (
    <>
      <topbar.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#1d3557'},
          tabBarActiveTintColor: '#fff',
          tabBarLabelStyle: {fontSize: 13},
        }}>
        <topbar.Screen
          name="Daily"
          component={FloweHome}
          initialParams={{status: 'Daily'}}
        />
        <topbar.Screen
          name="All Entry"
          component={FloweHome}
          initialParams={{status: 'AllEntry'}}
        />
      </topbar.Navigator>
    </>
  );
};

export default Flower;
