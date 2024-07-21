import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FloweHome from './FlowerHome';
import VegetableHome from './VegetableHome';

const topbar = createMaterialTopTabNavigator();

const Vegetable = () => {
  return (
    <>
      <topbar.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#1d3557'},
          tabBarActiveTintColor: '#fff',
          tabBarLabelStyle: {fontSize: 13},
        }}>
        <topbar.Screen
          name="દૈનિક"
          component={VegetableHome}
          initialParams={{status: 'Daily'}}
        />
        <topbar.Screen
          name="બધી એન્ટ્રી"
          component={VegetableHome}
          initialParams={{status: 'AllEntry'}}
        />
      </topbar.Navigator>
    </>
  );
};

export default Vegetable;