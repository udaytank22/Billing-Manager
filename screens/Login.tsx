import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {signInWithGoogle} from './GoogleSignIn'; // Import the Google Sign-In function

const LoginScreen = ({navigation}) => {
  const handleGoogleSignIn = async () => {
    const userInfo = await signInWithGoogle();
    if (userInfo) {
      // Extract the token or user information as needed
      console.log('Google Access Token:', userInfo.idToken);
      // Navigate to the home screen or another screen
      navigation.navigate('Home');
    }
  };

  return (
    <Animatable.View animation="fadeIn" delay={500} style={styles.container}>
      <Animatable.Image
        animation="slideInUp"
        style={styles.logo}
        source={require('../Images/Uday_s_Billing_System_3.png')} // Replace with your logo URL
      />
      <Pressable style={styles.button} onPress={handleGoogleSignIn}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.googleLogo}
            source={require('../Images/google-logo.png')} // Path to your Google logo image
          />
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
    width: '80%',
    height: '40%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF', // White background for the button
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row', // Align items horizontally
  },
  buttonContent: {
    flexDirection: 'row', // Align logo and text horizontally
    alignItems: 'center', // Center items vertically
  },
  googleLogo: {
    width: 240, // Adjust as needed
    height: 100, // Adjust as needed
    marginRight: 10, // Space between logo and text
  },
  buttonText: {
    color: '#000000', // Black text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
