import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './elements/AuthContext';

const LoginScreen = ({ navigation }) => {

  const { login } = useContext(AuthContext)
  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      console.log('111')
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo)
      login(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error)
      } else {
        console.log(error)
      }
    }
  };

  return (
    <Animatable.View animation="fadeIn" delay={500} style={styles.container}>
      <Animatable.Image
        animation="slideInUp"
        style={styles.logo}
        source={require('../Images/Tank_Brothers-removebg-preview.png')} // Replace with your logo URL
      />
      <Pressable style={styles.button} onPress={handleGoogleSignIn}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.googleLogo}
            source={require('../Images/google-logo.png')} // Path to your Google logo image
          />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </View>
      </Pressable>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252525',
  },
  logo: {
    width: '100%',
    height: '60%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;