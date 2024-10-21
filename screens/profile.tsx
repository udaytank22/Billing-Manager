import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have this package
import CustomHeader from './components/CustomHeader';
import { AuthContext } from "./elements/AuthContext";

const Profile = ({ navigation }) => {
    const { logout } = useContext(AuthContext);

    const options = [
        { id: '1', title: 'Edit profile information', icon: 'create-outline' },
        { id: '2', title: 'Notifications', icon: 'notifications-outline', action: 'ON' },
        { id: '3', title: 'Logout', icon: 'log-out-outline', action: '', onPress: logout }
    ];

    const moreOptions = [
        { id: '1', title: 'Help & Support', icon: 'help-circle-outline' },
        { id: '2', title: 'Contact us', icon: 'call-outline' },
        { id: '3', title: 'Privacy policy', icon: 'document-text-outline' }
    ];

    const renderOption = ({ item }) => {
        return (
            <Pressable style={styles.optionContainer} onPress={item.onPress}>
                <Icon name={item.icon} size={24} color="#5C5C5C" />
                <Text style={styles.optionText}>{item.title}</Text>
                {item.action && <Text style={styles.optionAction}>{item.action}</Text>}
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <CustomHeader title='Profile' />

            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <Image source={require('../Images/user.png')} style={styles.profileImage} />
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProfileUpdate')}>
                    <Icon name="pencil-outline" size={18} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.profileName}>Puerto Rico</Text>
                <Text style={styles.profileDetails}>yourmail@domain.com | +01 234 567 89</Text>
            </View>

            {/* Account Options */}
            <View style={styles.optionsList}>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOption}
                />
            </View>

            <View style={styles.optionsList}>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOption}
                />
            </View>

            {/* More Options */}
            <View style={styles.moreContainer}>
                <Text style={styles.moreTitle}>More</Text>
                <FlatList
                    data={moreOptions}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOption}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    profileHeader: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 4,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#fff',
    },
    editButton: {
        position: 'absolute',
        top: 70,
        right: 110,
        backgroundColor: '#ff6347',
        borderRadius: 50,
        padding: 6,
        elevation: 2,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 5,
    },
    profileDetails: {
        color: '#555',
        fontSize: 12,
    },
    optionsList: {
        marginTop: 10,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    optionText: {
        flex: 1,
        marginLeft: 5,
        color: '#333',
        fontSize: 14,
    },
    optionAction: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    moreContainer: {
        marginHorizontal: 16,
        marginTop: 20,
    },
    moreTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5C5CFF',
        marginBottom: 10,
    },
});

export default Profile;
