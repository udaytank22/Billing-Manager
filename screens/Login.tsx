// screens/LoginScreen.js
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputField from './components/InputFieldComponent';
import Button from './components/ButtonComponent';

const LoginScreen = ({navigation}) => {
  const handleLogin = values => {
    navigation.push('Home');
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back...</Text>
      <Image
        style={styles.image}
        source={{uri: 'https://path-to-your-image.png'}} // Replace with your image URL
      />
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={handleLogin}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <InputField
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <InputField
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button title="Login" onPress={handleLogin} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  link: {
    marginTop: 20,
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default LoginScreen;
