import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {AuthContext} from './elements/AuthContext';
import TextInputComponent from './components/InputFieldComponent'; // Ensure the correct path

const LoginScreen = ({navigation}) => {
  const {login, loginError} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login({email, password});
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{uri: 'https://path-to-your-logo.png'}} // Replace with your logo URL
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#4B134F',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
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
