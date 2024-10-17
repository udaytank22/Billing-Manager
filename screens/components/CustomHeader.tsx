import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ title, showBackButton, onBackPress, showProfile = false, onPress }) => {

    return (
        <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row' }}>
                {showBackButton && (
                    <TouchableOpacity onPress={onBackPress}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
            {showProfile && (
                <Pressable onPress={onPress}>
                    <Image source={require('../../Images/user.png')} style={{ height: 40, width: 40 }} />
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
        padding: 10,
        backgroundColor: '#FFF',
        borderColor: '#000',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 20,
    },
});

export default Header;
