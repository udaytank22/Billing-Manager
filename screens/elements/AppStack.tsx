import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Home';
import DrawerHome from './Drawer';
import FloweHome from '../FlowerHome';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      {/* <DrawerHome /> */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FlowerHome"
        component={FloweHome}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
