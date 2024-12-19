import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';

const BlinkingLogoIndicator = () => {
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const startBlinking = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 0.2, // Fade to 20% opacity
                        duration: 500, // Duration of fade-out
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 1, // Fade back to full opacity
                        duration: 500, // Duration of fade-in
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        startBlinking();
    }, [opacity]);

    return (
        <View style={styles.container}>
            {/* Replace with your custom logo or indicator */}
            <Animated.Image
                source={require('../../Images/Tank_Brothers-removebg-preview.png')} // Replace with your logo path
                style={[styles.logo, { opacity }]}
            />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Set your preferred background color
    },
    logo: {
        width: 100,
        height: 100, // Set size for your logo
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        color: '#333', // Set your preferred text color
        fontWeight: 'bold',
    },
});

export default BlinkingLogoIndicator;
