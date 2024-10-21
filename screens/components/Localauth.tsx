// src/components/LocalAuth.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import LocalAuthentication from 'react-native-local-authentication';

const LocalAuth = ({ onAuthenticated }) => {
    const authenticate = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate',
                fallbackLabel: 'Use Passcode',
                cancelLabel: 'Cancel',
            });

            if (result.success) {
                onAuthenticated();
            } else {
                Alert.alert('Authentication failed!');
            }
        } else {
            Alert.alert('No biometric authentication available.');
        }
    };

    useEffect(() => {
        authenticate();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Authenticating...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LocalAuth;
