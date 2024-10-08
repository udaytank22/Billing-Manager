import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient'; // Assuming expo-linear-gradient is installed

const CustomButton = ({ text, onPress, height, width, buttonStyle, textStyle, colors }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, { height, width }, buttonStyle]}>
            <LinearGradient
                colors={colors || ['#a242cd', '#b94f76', '#bf5263']} // Default gradient colors
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
            >
                <Text style={[styles.buttonText, textStyle]}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomButton;
