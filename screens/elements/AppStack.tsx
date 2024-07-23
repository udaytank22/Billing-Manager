import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Home';
import FloweHome from '../FlowerHome';
import Flower from '../FlowerTopBar';
import AddFlower from '../AddFlower';
import EditFlower from '../EditFlower';
import Vegetable from '../VegetableTopBar';
import EmployeeHome from '../EmployeeHome';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you want to use FontAwesome icons
import AddVegetableForm from '../AddVegetable';
import MoneyHome from '../MoneyHome';
import MoneyTopTabBar from '../MoneyTopTabBar';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'હોમ',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4B134F',
          },
        }}
      />
      <Stack.Screen name="Flower" component={Flower} options={{title: 'ફૂલ'}} />
      <Stack.Screen
        name="Vegetable"
        component={Vegetable}
        options={{title: 'શાક'}}
      />
      <Stack.Screen
        name="MoneyTopTabBar"
        component={MoneyTopTabBar}
        options={{title: 'રૂપિયાનો હિસાબ'}}
      />
      <Stack.Screen
        name="EmployeeHome"
        component={EmployeeHome}
        options={{title: 'મુલી'}}
      />
      <Stack.Screen
        name="MoneyHome"
        component={MoneyHome}
        options={{title: 'રૂપિયાનો હિસાબ'}}
      />
      <Stack.Screen
        name="AddFlower"
        component={AddFlower}
        options={{title: 'ફ્લાવર ઉમેરો'}}
      />
      <Stack.Screen
        name="AddVegetableForm"
        component={AddVegetableForm}
        options={{title: 'વેજીટેબલ ઉમેરો'}}
      />
      <Stack.Screen
        name="EditFlower"
        component={EditFlower}
        options={{title: 'સંપાદિત કરો ફોર્મ'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
