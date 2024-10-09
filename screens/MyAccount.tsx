import React from "react";
import { Image, StyleSheet, Text, View, Linking, Pressable } from "react-native";
import CustomHeader from './components/CustomHeader';

const MyAccount = ({ navigation }) => {

    const address = 'NagalparRoad Nani NagalPar, Anjar, Kutchh(370110)';
    const phoneNumber = '9773027241';
    const email = 'tankuday9059@gmail.com';

    const openMap = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(url).catch(err => {
            console.error("An error occurred while trying to open the map: ", err);
        });
    };

    const callPhoneNumber = (phoneNumber) => {
        console.log(phoneNumber)
        // Use the Linking API to open the phone dialer
        Linking.openURL(`tel:${phoneNumber}`)
            .catch(err => console.error('Error:', err)); // Log any error
    };

    // Function to handle email press
    const handleEmailPress = () => {
        // Create a mailto URL
        const mailtoUrl = `mailto:${email}`;

        // Open the email client
        Linking.openURL(mailtoUrl).catch((err) => {
            console.error('Failed to open email client:', err);
        });
    };
    return (
        <View>
            <CustomHeader title='My Account' showBackButton={true} onBackPress={() => navigation.goBack()} />

            <View style={styles.cardGradient}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Personal Details</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.cardDetails}>Name: mr.Uday Tank</Text>
                        <Pressable onPress={handleEmailPress}>
                            <Text style={styles.cardDetails}>
                                Email: {email}
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => callPhoneNumber(phoneNumber)}>
                            <Text style={styles.cardDetails}>
                                Phone No: {phoneNumber}
                            </Text>
                        </Pressable>
                        <Pressable onPress={openMap}>
                            <Text style={styles.cardDetails}>
                                Address: {address}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.cardGradient}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Business Details</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.cardDetails}>Business Name: tank Brother's</Text>
                        <Text style={styles.cardDetails}>Business Email: tankuday9059@gmail.com</Text>
                        <Text style={styles.cardDetails}>Business PhoneNO: 9773027241</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardGradient}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Average Collection Of Month</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.cardDetails}>Flower Collection: 1000</Text>
                        <Text style={styles.cardDetails}>Vegetable Collection: 1000</Text>
                        <Text style={styles.cardDetails}>Money Collection: 1000</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        borderRadius: 15,
        shadowColor: '#000',
        elevation: 10,
        overflow: 'hidden',
        backgroundColor: '#FAF7F0',
        borderColor: '#000',
        borderWidth: 1,
    },
    cardGradient: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#000',
        borderWidth: 1,
        marginVertical: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
    },
    textContainer: {
        flex: 1,
    },
    cardImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginLeft: 15,
    },
    cardTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
    },
    cardDetails: {
        color: '#000',
        fontSize: 13,
        fontWeight: '600',
        paddingVertical: 10
    },
});

export default MyAccount;
