import React, { useEffect, useState } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../Home';
import Flower from '../FlowerTopBar';
import AddFlower from '../AddFlower';
import EditFlower from '../EditFlower';
import Vegetable from '../VegetableTopBar';
import EmployeeHome from '../EmployeeHome';
import AddVegetableForm from '../AddVegetable';
import MoneyHome from '../MoneyHome';
import MoneyTopTabBar from '../MoneyDetailsPage';
import AddEmployeeForm from '../AddEmployeeForm';
import MoneyCollectionForm from '../MoneyCollectionForm';
import MakeBill from '../MakeBill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailPage from '../MoneyDetailsPage';
import FlowerHome from '../FlowerHome';
import VegrtableHome from '../VegetableHome';
import MyTabs from '../BottomBar';
import ProfileUpdate from '../ProfileDetails';
import MyAccount from '../MyAccount';
import FontSizePicker from '../SelectFontSize';
import { ActivityIndicator, Text, View } from 'react-native';
import Transactions from '../Transactions';

const Stack = createStackNavigator();

const AppStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS, // You can choose other presets as well
      }}>
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="FlowerHome"
        component={FlowerHome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="VegrtableHome"
        component={VegrtableHome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Vegetable"
        component={Vegetable}
        options={{
          title: 'શાક',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#F5F5F5',
          },
        }}
      />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EmployeeHome"
        component={EmployeeHome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MoneyHome"
        component={MoneyHome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddFlower"
        component={AddFlower}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddVegetableForm"
        component={AddVegetableForm}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditFlower"
        component={EditFlower}
        options={{
          title: 'સંપાદિત કરો ફોર્મ',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#F5F5F5',
          },
        }}
      />
      <Stack.Screen
        name="AddEmployeeForm"
        component={AddEmployeeForm}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MoneyCollectionForm"
        component={MoneyCollectionForm}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MakeBill"
        component={MakeBill}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ProfileUpdate"
        component={ProfileUpdate}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="FontSizePicker"
        component={FontSizePicker}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
