import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from "../components/CustomHeader";

const OptionCard = ({ title, onPress, iconName }) => {
    const scale = new Animated.Value(1);

    const onPressIn = () => {
        Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
    };

    const onPressOut = () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                <LinearGradient
                    colors={['#1c92d2', '#f2fcfe']} // Soft, vibrant gradient for a modern feel
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cardBackground}
                >
                    <View style={styles.iconContainer}>
                        <Icon name={iconName} size={25} color="#000" style={styles.icon} />
                    </View>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Icon name="chevron-right" size={25} color="#000" style={styles.arrowIcon} />
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

const AddButtons = ({ navigation }) => {
    const options = [
        { id: '1', title: 'Add Flower', navigation: 'AddFlower', iconName: 'flower' },
        { id: '2', title: 'Add Vegetable', navigation: 'AddVegetableForm', iconName: 'food-apple' },
        { id: '3', title: 'Add Employee Attendance', navigation: 'AddEmployeeForm', iconName: 'account-check' },
        { id: '4', title: 'Add Collected Money', navigation: 'MoneyCollectionForm', iconName: 'cash' },
        { id: '5', title: 'Add Nondh', navigation: '', iconName: 'book' },
    ];

    return (
        <View style={styles.container}>
            <CustomHeader title="Add Items" />
            <FlatList
                data={options}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <OptionCard
                        title={item.title}
                        onPress={() => navigation.navigate(item.navigation)}
                        iconName={item.iconName}
                    />
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa', // Softer, neutral background
    },
    listContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    card: {
        marginVertical: 12,
        borderRadius: 15,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    cardBackground: {
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // More subtle transparency
        padding: 12,
        borderRadius: 50,
        marginRight: 15,
    },
    icon: {
        alignSelf: 'center',
    },
    cardTitle: {
        fontSize: 18,
        color: '#000', // Bright, clean text color
        flex: 1,
    },
    arrowIcon: {
        marginLeft: 10,
    },
});

export default AddButtons;