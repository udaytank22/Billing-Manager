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

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Home',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4B134F',
          },
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="user" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Flower"
        component={Flower}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="Vegetable"
        component={Vegetable}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="EmployeeHome"
        component={EmployeeHome}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddFlower"
        component={AddFlower}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditFlower"
        component={EditFlower}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
