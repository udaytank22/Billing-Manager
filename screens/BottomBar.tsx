// MyTabs.js
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './profile';
import CustomTabBar from './elements/CustomTabBar'; // Import the custom tab bar component
import AddButtons from './components/AddButtons';
import Notification from './notification';

const Tab = createBottomTabNavigator();


function MyTabs() {

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />} // Use the custom tab bar here
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="AddButtons" component={AddButtons} />
            <Tab.Screen name="Notification" component={Notification} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default MyTabs;
