import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ title, showBackButton, onBackPress, showProfile = false, onPress }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {showBackButton && (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
            {showProfile && (
                <Pressable onPress={onPress} style={styles.profileContainer}>
                    <Image source={require('../../Images/user.png')} style={styles.profileImage} />
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0', // Subtle bottom border for clean separation
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    backButton: {
        paddingRight: 15,
        paddingVertical: 5,
    },
    profileContainer: {
        padding: 5,
    },
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0', // Soft border for profile image
    },
});

export default Header;