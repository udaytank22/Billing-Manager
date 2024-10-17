import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with your preferred icon library
import LinearGradient from 'react-native-linear-gradient'; // For gradient background

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddPress = () => {
        setModalVisible(true);
    };

    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                // Define icons based on route name
                let iconName;
                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'AddButtons') {
                    iconName = 'plus';
                } else if (route.name === 'Notification') {
                    iconName = 'bell';
                } else if (route.name === 'Profile') {
                    iconName = 'user';
                }

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        <View style={[
                            styles.iconContainer,
                            isFocused ? styles.iconContainerFocused : null
                        ]}>
                            <Icon
                                name={iconName}
                                size={28} // Slightly bigger icon size
                                color={isFocused ? '#fff' : '#b3b3b3'}
                            />
                            {isFocused && (
                                <Text style={styles.label}>
                                    {route.name}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FAF7F0', // Set a static background color
        paddingVertical: 15,
        paddingHorizontal: 15,
        position: 'relative',
        borderRadius: 30, // Rounded edges
        elevation: 8, // Shadow for floating effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginVertical: 10,
        marginHorizontal: 10,
        borderColor: '#E0E0E0', // Subtle border color
        borderWidth: 1,
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: 'transparent',
        borderRadius: 20,
    },
    iconContainerFocused: {
        backgroundColor: '#FF6347', // Active tab background color
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    label: {
        color: '#fff',
        fontSize: 10,
        marginLeft: 8,
        fontWeight: '600',
    },
});

export default CustomTabBar;