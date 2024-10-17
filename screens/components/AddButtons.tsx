import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing vector icons
import CustomHeader from "../components/CustomHeader";

// Card component for options
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
            activeOpacity={0.8}
        >
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                <LinearGradient
                    colors={['#4C669F', '#3B5998', '#192f6a']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cardBackground}
                >
                    <Icon name={iconName} size={30} color="#fff" style={styles.icon} />
                    <Text style={styles.cardTitle}>{title}</Text>
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
        backgroundColor: '#FFF'
    },
    listContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FFF'
    },
    card: {
        marginVertical: 10,
        borderRadius: 15,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    cardBackground: {
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
});

export default AddButtons;
