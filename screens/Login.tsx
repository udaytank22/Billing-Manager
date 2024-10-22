import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from './elements/AuthContext';
import CustomButton from './components/CustomButton'; // Import your new button component

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      login(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Full-size Top Image */}
      <Image
        style={styles.bannerImage}
        source={require('../Images/topImage.png')}
      />

      {/* Bottom Curved View */}
      <View style={styles.bottomView}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subText}>Welcome back to Business Manager, we missed you!</Text>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Image style={styles.icon} source={require('../Images/user-icon.png')} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#A9A9A9"
              style={styles.input}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Image style={styles.icon} source={require('../Images/password-icon.png')} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <Text style={styles.forgotText}>Forgot Password?</Text>

          {/* Sign In Button */}
          <CustomButton
            text="Sign In"
            onPress={login}
            height={50}
            width={'100%'}
            buttonStyle={{ marginVertical: 20 }}
            colors={['#FF7A59', '#FF4A32', '#FF7A59']} // Custom gradient colors
          />

          {/* Or Continue with */}
          <View style={styles.otherOptionContainer}>
            <Text style={styles.orText}>Or continue with</Text>
          </View>

          {/* Third-Party Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity onPress={handleGoogleSignIn} style={styles.socialButton}>
              <Image style={styles.socialIcon} source={require('../Images/google-logo.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image style={styles.socialIcon} source={require('../Images/apple-logo.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image style={styles.socialIcon} source={require('../Images/facebook-logo.png')} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light grey background for a softer look
  },
  bannerImage: {
    width: '100%',
    height: height * 0.35,
    resizeMode: 'cover',
  },
  bottomView: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // White background for the bottom view
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333', // Darker text for better readability
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666666', // Slightly darker grey for the subtitle
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', // Light grey input background
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: '#333', // Dark grey for the icon color
  },
  input: {
    flex: 1,
    color: '#333', // Dark text for input
  },
  forgotText: {
    color: '#A4A4A4',
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'right',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    backgroundColor: '#E0E0E0', // Light grey for social buttons
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 50,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  otherOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  orText: {
    color: '#666666',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;
