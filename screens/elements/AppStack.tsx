import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Home';
import Flower from '../FlowerTopBar';
import AddFlower from '../AddFlower';
import EditFlower from '../EditFlower';
import Vegetable from '../VegetableTopBar';
import EmployeeHome from '../EmployeeHome';
import AddVegetableForm from '../AddVegetable';
import MoneyHome from '../MoneyHome';
import MoneyTopTabBar from '../MoneyTopTabBar';
import AddEmployeeForm from '../AddEmployeeForm';
import MoneyCollectionForm from '../MoneyCollectionForm';
import MakeBill from '../MakeBill';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [loginusername, setLoginUserName] = useState('');

  const fetchUserDetail = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo !== null) {
        const userData = JSON.parse(userInfo);
        setLoginUserName(userData?.mainDetail?.name);
        console.log(loginusername);
      } else {
        console.log('No user info found');
      }
    } catch (error) {
      console.error('Error retrieving user info', error);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: `હોમ ${loginusername}`,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#1F2E35',
          },
        }}
      />
      <Stack.Screen
        name="Flower"
        component={Flower}
        options={{
          title: 'ફૂલ',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#1F2E35',
          },
        }}
      />
      <Stack.Screen
        name="Vegetable"
        component={Vegetable}
        options={{
          title: 'શાક',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#1F2E35',
          },
        }}
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
      <Stack.Screen
        name="AddEmployeeForm"
        component={AddEmployeeForm}
        options={{title: 'મુલી ઉમેરો'}}
      />
      <Stack.Screen
        name="MoneyCollectionForm"
        component={MoneyCollectionForm}
        options={{title: 'રૂપિયા કલેક્શન ફોર્મ'}}
      />
      <Stack.Screen
        name="MakeBill"
        component={MakeBill}
        options={{title: 'બિલ બનાવો'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
