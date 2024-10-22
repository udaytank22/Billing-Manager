import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from './components/CustomHeader';

const ProfileUpdate = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <CustomHeader title="Update Profile" showBackButton={true} onBackPress={() => navigation.goBack()} />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Edit Profile</Text>
                    <TouchableOpacity>
                        <Image
                            source={require('../Images/user.png')}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>

                {/* Form Section */}
                <View style={styles.form}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Enter your username"
                        placeholderTextColor='#999'
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        placeholderTextColor='#999'
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                        placeholderTextColor='#999'
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Enter your password"
                        placeholderTextColor='#999'
                        secureTextEntry
                    />

                    <Text style={styles.sectionTitle}>Business Details</Text>

                    <Text style={styles.label}>Business Name</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Enter your business name"
                        placeholderTextColor='#999'
                    />

                    <Text style={styles.label}>Business Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Enter your business email"
                        keyboardType="email-address"
                        placeholderTextColor='#999'
                    />

                    <Text style={styles.label}>Business Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder="Enter your business phone number"
                        keyboardType="phone-pad"
                        placeholderTextColor='#999'
                    />

                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Enter your address"
                        placeholderTextColor='#999'
                    />

                    {/* Update Button */}
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
        backgroundColor: '#FAFAFA',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#f0f4f7',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    form: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 5,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    updateButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ProfileUpdate;
