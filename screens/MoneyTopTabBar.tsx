import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FloweHome from './FlowerHome';
import MoneyHome from './MoneyHome';

const topbar = createMaterialTopTabNavigator();

const MoneyTopTabBar = () => {
  return (
    <>
      <topbar.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#1d3557'},
          tabBarActiveTintColor: '#fff',
          tabBarLabelStyle: {fontSize: 13},
        }}>
        <topbar.Screen
          name="આવેલા"
          component={MoneyHome}
          initialParams={{status: 'Collected'}}
        />
        <topbar.Screen
          name="બાકી"
          component={MoneyHome}
          initialParams={{status: 'Pending'}}
        />
      </topbar.Navigator>
    </>
  );
};

export default MoneyTopTabBar;
