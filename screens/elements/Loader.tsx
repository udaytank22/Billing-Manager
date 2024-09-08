// components/Loader.js
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';

const Loader = () => {
  // Create an animated value
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Define the blinking animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 500, // Duration of fading out
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500, // Duration of fading in
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../Images/Uday_s_Billing_System_3.png')} // Update with the path to your logo
        style={[styles.logo, {opacity}]} // Apply animated opacity
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default Loader;
