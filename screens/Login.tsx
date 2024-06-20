import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {AuthContext} from './elements/AuthContext';
import TextInputComponent from './components/InputFieldComponent';
import * as Animatable from 'react-native-animatable'; // Ensure the correct path

const LoginScreen = ({navigation}) => {
  const {login, loginError} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login({email, password});
    navigation.navigate('Home');
  };

  return (
    <Animatable.View animation="fadeIn" delay={500} style={styles.container}>
      <Animatable.Image
        animation="slideInUp"
        style={styles.logo}
        source={require('../Images/Uday_s_Billing_System_3.png')} // Replace with your logo URL
      />
      <Text style={styles.title}>Flower Billing</Text>
      <View>
        <TextInputComponent
          placeholder="Phone No"
          onChangeText={setEmail}
          value={email}
          keyboardType="numeric"
          autoCapitalize="none"
        />
        <TextInputComponent
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        {/* {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null} */}
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#252525',
  },
  logo: {
    width: '100%',
    height: '50%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Arial',
    color: '#7D7D7D',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E9446A',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
