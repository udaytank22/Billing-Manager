import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [loginError, setLoginError] = useState('');

  const login = async (values, userInfo) => {
    console.log('userInfo', values.user.id)
    await AsyncStorage.setItem('userToken', values.user.id);
    setUserToken(values.user.id);
    // try {
    //   setIsLoading(true);
    //   // Simulating an API call for login
    //   const {email, password} = values;
    //   if (email === 'test@test.com' && password === 'password') {

    //     setLoginError('');
    //   } else {
    //     setLoginError('Invalid credentials');
    //   }
    // } catch (e) {
    //   console.log(e);
    //   setLoginError('Failed to login');
    // }
    // setIsLoading(false);
  };

  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
    setLoginError('');
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        setUserToken(userToken);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error: ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, loginError }}>
      {children}
    </AuthContext.Provider>
  );
};
