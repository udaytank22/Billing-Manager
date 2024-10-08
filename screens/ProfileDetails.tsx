import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from './components/CustomHeader'

const ProfileUpdate = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <CustomHeader title="Update Profile" showBackButton={true} onBackPress={() => navigation.goBack()} />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Edit Profile</Text>
                    <TouchableOpacity>
                        <Image
                            source={require('../Images/user.png')}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <Text style={styles.title}>Personal Details</Text>
                    <Text style={styles.label}>Enter Your UserName</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Username"
                        placeholderTextColor='#c0c0c0'
                    />
                    <Text style={styles.label}>Enter Your email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email ID"
                        keyboardType="email-address"
                        placeholderTextColor='#c0c0c0'
                    />
                    <Text style={styles.label}>Enter Your PhoneNO</Text>
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        placeholderTextColor='#c0c0c0'
                    />
                    <Text style={styles.label}>Enter Your password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
                        placeholderTextColor='#c0c0c0'
                        secureTextEntry
                    />


                    <Text style={styles.title}>Business Details</Text>
                    <Text style={styles.label}>Enter Your Business Name</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Username"
                        placeholderTextColor='#c0c0c0'
                    />
                    <Text style={styles.label}>Enter Your Business email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email ID"
                        keyboardType="email-address"
                        placeholderTextColor='#c0c0c0'
                    />
                    <Text style={styles.label}>Enter Your Business PhoneNO</Text>
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        placeholderTextColor='#c0c0c0'
                    />
                    <Text style={styles.label}>Enter Your Address</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
                        placeholderTextColor='#c0c0c0'
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.updateButton}>
                        <Text style={styles.updateButtonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF7F0',
    },
    header: {
        backgroundColor: '#FAF7F0',
        paddingBottom: 20,
        paddingTop: 40,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: '#000',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1
    },
    headerText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    profileImageContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 75,
        padding: 5,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    changePictureText: {
        marginTop: 5,
        color: '#666',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    form: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#000'
    },
    updateButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        color: '#000'
    },
    title: {
        color: '#000',
        fontSize: 20,
        marginBottom: 10
    }
});

export default ProfileUpdate;
