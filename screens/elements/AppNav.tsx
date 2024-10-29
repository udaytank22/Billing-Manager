import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../redux/slices/authSlice';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AppNav = () => {
  const dispatch = useDispatch();
  const { isLoading, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
