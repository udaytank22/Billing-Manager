import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomHeader = ({title}) => {
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
    <LinearGradient
      colors={['#2C5364', '#203A43']}
      start={{x: 0.1, y: 0}} // start from left
      end={{x: 0, y: 0.5}} // end at right
      style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    elevation: 5, // Adds shadow to the header
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomHeader;
