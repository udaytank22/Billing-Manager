import React from "react";
import { StyleSheet, Text, View, Linking, Pressable } from "react-native";
import CustomHeader from './components/CustomHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyAccount = ({ navigation }) => {

    const address = 'Nagalpar Road, Nani NagalPar, Anjar, Kutchh (370110)';
    const phoneNumber = '9773027241';
    const email = 'tankuday9059@gmail.com';

    const openMap = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(url).catch(err => {
            console.error("An error occurred while trying to open the map: ", err);
        });
    };

    const callPhoneNumber = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`)
            .catch(err => console.error('Error:', err));
    };

    const handleEmailPress = () => {
        const mailtoUrl = `mailto:${email}`;
        Linking.openURL(mailtoUrl).catch((err) => {
            console.error('Failed to open email client:', err);
        });
    };

    return (
        <View style={styles.container}>
            <CustomHeader title='My Account' showBackButton={true} onBackPress={() => navigation.goBack()} />
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Personal Details</Text>
                <View style={styles.detailContainer}>
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons name="account" size={18} color="#4F8EF7" />
                        <Text style={styles.cardDetails}>Mr. Uday Tank</Text>
                    </View>
                    <Pressable onPress={handleEmailPress} style={styles.detailRow}>
                        <MaterialCommunityIcons name="email" size={18} color="#4F8EF7" />
                        <Text style={styles.cardDetails}>{email}</Text>
                    </Pressable>
                    <Pressable onPress={() => callPhoneNumber(phoneNumber)} style={styles.detailRow}>
                        <MaterialCommunityIcons name="phone" size={18} color="#4F8EF7" />
                        <Text style={styles.cardDetails}>{phoneNumber}</Text>
                    </Pressable>
                    <Pressable onPress={openMap} style={styles.detailRow}>
                        <MaterialCommunityIcons name="map-marker" size={18} color="#4F8EF7" />
                        <Text style={styles.cardDetails}>{address}</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Business Details</Text>
                <View style={styles.detailContainer}>
                    <Text style={styles.cardDetails}>Business Name: Tank Brother's</Text>
                    <Text style={styles.cardDetails}>Business Email: tankuday9059@gmail.com</Text>
                    <Text style={styles.cardDetails}>Business Phone: 9773027241</Text>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Average Collection Of Month</Text>
                <View style={styles.detailContainer}>
                    <Text style={styles.cardDetails}>Flower Collection: 1000</Text>
                    <Text style={styles.cardDetails}>Vegetable Collection: 1000</Text>
                    <Text style={styles.cardDetails}>Money Collection: 1000</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    detailContainer: {
        marginTop: 10,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    cardDetails: {
        fontSize: 14,
        color: '#555',
        marginLeft: 10,
    },
});

export default MyAccount;
