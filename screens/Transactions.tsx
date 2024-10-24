import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    PermissionsAndroid,
    Alert,
    Modal,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import Header from './components/CustomHeader';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics'; // Biometric Library
import { BlurView } from '@react-native-community/blur';

const Transactions = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPinModal, setShowPinModal] = useState(false);
    const [pin, setPin] = useState('');
    const [usingScreenLock, setUsingScreenLock] = useState(false);

    const rnBiometrics = new ReactNativeBiometrics();

    // Handle Biometric Authentication
    const authenticateUser = async () => {
        const { available, biometryType } = await rnBiometrics.isSensorAvailable();

        if (available) {
            try {
                const result = await rnBiometrics.simplePrompt({
                    promptMessage: `Authenticate using ${biometryType || 'biometrics'} to view transactions`,
                    cancelButtonText: 'Cancel',
                });

                if (result.success) {
                    setIsAuthenticated(true);
                } else {
                    Alert.alert('Authentication Failed', 'Please try again.');
                    navigation.goBack(); // Exit if authentication fails
                }
            } catch (error) {
                console.error('Biometric authentication error:', error);
                setUsingScreenLock(true); // Show PIN modal for screen lock
                setShowPinModal(true); // Show the PIN modal
            }
        } else {
            Alert.alert('Authentication Required', 'Biometric authentication not available.');
            navigation.goBack(); // Exit if biometrics are unavailable
        }
    };

    const verifyPin = async () => {
        const credentials = await Keychain.getGenericPassword();

        if (!credentials) {
            await savePin(pin);
            Alert.alert('PIN Set', 'Your PIN has been set successfully.');
            setIsAuthenticated(true);
            setShowPinModal(false);
            setUsingScreenLock(false);
        } else if (credentials.password === pin) {
            setIsAuthenticated(true);
            setShowPinModal(false);
            setUsingScreenLock(false);
        } else {
            Alert.alert('Invalid PIN', 'Please try again.'); // Uncomment this line to alert on invalid PIN
        }
        setPin('');
    };

    const savePin = async (newPin) => {
        await Keychain.setGenericPassword('user', newPin);
    };

    // Request SMS permissions
    const requestSmsPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                {
                    title: 'SMS Permission',
                    message: 'This app needs access to your SMS to show transactions',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                fetchBankTransactionSms();
            } else {
                setError('SMS permission denied. Cannot fetch transactions.');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // Fetch SMS messages and filter transactions
    const fetchBankTransactionSms = () => {
        SmsAndroid.list(
            JSON.stringify({
                box: 'inbox',
                maxCount: 1000,
            }),
            (fail) => {
                console.log('Failed to fetch SMS:', fail);
                setError('Failed to fetch SMS');
            },
            (count, smsList) => {
                const smsArray = JSON.parse(smsList);

                const transactionMessages = smsArray.filter((sms) =>
                    /credited|debit/i.test(sms.body)
                );

                const formattedTransactions = transactionMessages.map((sms) => {
                    const creditMatch = sms.body.match(
                        /INR\s+([\d,.]+)\s+credited\s+to\s+A\/c\s+no\.\s+(XX\d+).*?on\s+(\d{2}-\d{2}-\d{2})/i
                    );

                    const debitMatch = sms.body.match(
                        /Debit\s+INR\s+([\d,.]+)\s+A\/c\s+no\.\s+(XX\d+)\s+(\d{2}-\d{2}-\d{2})/i
                    );

                    if (creditMatch) {
                        return {
                            id: sms._id,
                            type: 'CREDIT',
                            amount: creditMatch[1],
                            account: creditMatch[2],
                            date: creditMatch[3],
                        };
                    } else if (debitMatch) {
                        return {
                            id: sms._id,
                            type: 'DEBIT',
                            amount: debitMatch[1],
                            account: debitMatch[2],
                            date: debitMatch[3],
                        };
                    }

                    return null;
                }).filter(Boolean);

                setTransactions(formattedTransactions);
            }
        );
    };

    // Authenticate user and request SMS permission on component mount
    useEffect(() => {
        authenticateUser().then(() => {
            requestSmsPermission();
        });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.cellWithBorder]}>{item.date}</Text>
            <Text style={styles.tableCell}>{item.type}</Text>
            <Text style={styles.tableCell}>{item.amount}</Text>
            <Text style={styles.tableCell}>{item.account}</Text>
        </View>
    );

    return (
        <>
            <Header title={'My Transactions'} onBackPress={() => navigation.goBack()} showBackButton={true} />
            <View style={styles.container}>
                {!isAuthenticated || showPinModal && (
                    <BlurView blurType="light" blurAmount={10} style={styles.absoluteBlur} />
                )}
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : (
                    <>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, styles.cellWithBorder]}>Date</Text>
                            <Text style={[styles.tableHeaderText, styles.cellWithBorder]}>Type</Text>
                            <Text style={[styles.tableHeaderText, styles.cellWithBorder]}>Amount</Text>
                            <Text style={styles.tableHeaderText}>Account</Text>
                        </View>

                        <FlatList
                            data={transactions}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        />
                    </>
                )}
            </View>
            <Modal visible={showPinModal || usingScreenLock} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{usingScreenLock ? 'Enter Screen Lock' : 'Enter PIN'}</Text>
                    <TextInput
                        style={styles.pinInput}
                        secureTextEntry
                        keyboardType="numeric"
                        value={pin}
                        onChangeText={setPin}
                    />
                    <TouchableOpacity style={styles.verifyButton} onPress={verifyPin}>
                        <Text style={styles.buttonText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#eee',
        borderBottomWidth: 2,
        borderColor: '#ccc',
    },
    tableHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
    },
    tableCell: {
        fontSize: 16,
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    cellWithBorder: {
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalTitle: { fontSize: 24, marginBottom: 20, color: '#fff' },
    pinInput: { width: '80%', backgroundColor: '#fff', padding: 10, marginBottom: 20, color: '#000' },
    verifyButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
    buttonText: { color: '#fff' },
    absoluteBlur: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default Transactions;
