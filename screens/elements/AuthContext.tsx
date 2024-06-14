import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { EndPoint } from '../env/index';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loginError, setLoginError] = useState('');

  const login = async () => {
    // let formData = new FormData();

    // formData.append('mobile_no', mobileno);
    // formData.append('password', password);
    // fetch(`${EndPoint}authenticate-user`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Accept: 'application/json',
    //   },
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(async json => {
    //     if (json.success == true) {
    //       let userInfo = json.data;
    //       // console.log(userInfo);
          setUserInfo(userInfo);
    //       setUserToken(userInfo.api_token);
          await AsyncStorage.setItem('userInfo', 'Uday');
          await AsyncStorage.setItem('userToken', 'Uday');
        // } else {
        //   setLoginError(json.message);
        // }

        // setIsLoading(false);
      // })
      // .catch(error => {
      //   console.log('___________error________', error);
      // });
  };

  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
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
      console.log('is logged in error $(e)');
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
