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
import LanguageSelect from '../LanguageSelection';
import FontSizePicker from '../SelectFontSize';

const Stack = createStackNavigator();

const AppStack = () => {
  const [loginusername, setLoginUserName] = useState('');

  // const fetchUserDetail = async () => {
  //   try {
  //     let userInfo = await AsyncStorage.getItem('userInfo');
  //     if (userInfo !== null) {
  //       const userData = JSON.parse(userInfo);
  //       setLoginUserName(userData?.mainDetail?.name);
  //       console.log(loginusername);
  //     } else {
  //       console.log('No user info found');
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving user info', error);
  //   }
  // };

  useEffect(() => {
    // fetchUserDetail();
  }, []);
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
          title: 'વેજીટેબલ ઉમેરો',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#F5F5F5',
          },
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
          title: 'મુલી ઉમેરો',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#F5F5F5',
          },
        }}
      />
      <Stack.Screen
        name="MoneyCollectionForm"
        component={MoneyCollectionForm}
        options={{
          title: 'રૂપિયા કલેક્શન ફોર્મ',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#F5F5F5',
          },
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
        name="LanguageSelect"
        component={LanguageSelect}
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
    </Stack.Navigator>
  );
};

export default AppStack;
