import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have this package
import CustomHeader from './components/CustomHeader';
import { AuthContext } from "./elements/AuthContext";

const Profile = ({ navigation }) => {

    const { logout } = useContext(AuthContext)

    const options = [
        { id: '1', title: 'My Account', icon: 'person-outline', actionIcon: 'chevron-forward-outline' },
        { id: '2', title: 'Select Preferred Language', icon: 'language-outline', actionIcon: 'chevron-forward-outline' },
        { id: '3', title: 'Select Font Size', icon: 'text-outline', actionIcon: 'chevron-forward-outline' },
        { id: '4', title: 'Trash', icon: 'trash-outline', actionIcon: 'chevron-forward-outline' },
        { id: '5', title: 'Log out', icon: 'log-out-outline', actionIcon: 'chevron-forward-outline' }
    ];

    const moreOptions = [
        { id: '1', title: 'Help & Support', icon: 'help-circle-outline' },
        { id: '2', title: 'About App', icon: 'information-circle-outline' }
    ];

    const renderOption = ({ item }) => {
        const handleNavigation = () => {
            // Define navigation based on title or id
            if (item.title === 'My Account') {
                navigation.navigate('MyAccount');
            } else if (item.title === 'Select Preferred Language') {
                navigation.navigate('LanguageSelect');
            } else if (item.title === 'Select Font Size') {
                navigation.navigate('FontSizePicker');
            } else if (item.title === 'Trash') {
                navigation.navigate('Trash');
            } else if (item.title === 'Log out') {
                logout();
            }
            // Add more navigation as needed
        };

        return (
            <Pressable style={styles.optionContainer} onPress={handleNavigation}>
                <Icon name={item.icon} size={24} color="#5C5C5C" />
                <Text style={styles.optionText}>{item.title}</Text>
                <Icon name={item.actionIcon} size={20} color="#5C5C5C" />
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <CustomHeader title='Profile' />
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <Image source={require('../Images/user.png')} style={styles.profileImage} />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>Itunuoluwa Abidoye</Text>
                    <Text style={styles.profileHandle}>@itunuoluwa</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProfileUpdate')}>
                    <Icon name="pencil-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Account Options */}
            <View>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOption}
                    style={styles.optionsList}
                />

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF7F0',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#5C5CFF',
        borderRadius: 10,
        margin: 16,
        elevation: 3,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },
    profileName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileHandle: {
        color: '#fff',
        fontSize: 14,
    },
    editButton: {
        backgroundColor: '#5C5CFF',
        padding: 8,
        borderRadius: 20,
        position: 'absolute',
        right: 10,
        top: 10,
    },
    optionsList: {
        marginHorizontal: 16,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 8,
        elevation: 1,
    },
    optionText: {
        flex: 1,
        marginLeft: 16,
        color: '#333',
        fontSize: 16,
    },
    moreContainer: {
        marginHorizontal: 16,
    },
    moreTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5C5CFF',
        marginBottom: 10,
    },
});

export default Profile;
