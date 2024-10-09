import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with your preferred icon library

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddPress = () => {
        setModalVisible(true);
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: '#FAF7F0', // Set a static background color
                paddingVertical: 20,
                paddingHorizontal: 20,
                position: 'relative',
                borderRadius: 20,
                // borderTopLeftRadius: 20,
                borderColor: '#000',
                borderWidth: 1,
                marginVertical: 1,
                marginHorizontal: 10
            }}
        >
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
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: isFocused ? '#333' : 'transparent',
                                borderRadius: 20,
                                paddingVertical: isFocused ? 5 : 0,
                                paddingHorizontal: isFocused ? 15 : 0,
                                alignItems: 'center',
                            }}
                        >
                            <Icon name={iconName} size={24} color={isFocused ? '#fff' : '#b3b3b3'} />
                            {isFocused && (
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 14,
                                        marginLeft: 8,
                                    }}
                                >
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

export default CustomTabBar;