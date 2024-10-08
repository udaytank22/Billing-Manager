import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import CustomHeader from "../components/CustomHeader";

// Card component for options
const OptionCard = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.cardTitle}>{title}</Text>
        </TouchableOpacity>
    );
};

const AddButtons = ({ navigation }) => {
    const options = [
        { id: '1', title: 'Add Flower', navigation: 'AddFlower' },
        { id: '2', title: 'Add Vegetable', navigation: 'AddVegetableForm' },
        { id: '3', title: 'Add Employee Attandances', navigation: 'AddEmployeeForm' },
        { id: '4', title: 'Add Collected money', navigation: 'MoneyCollectionForm' },
        { id: '5', title: 'Add Nondh', navigation: '' },
    ];

    const handlePress = (title) => {
        console.log(`${title} selected`);
    };

    return (
        <View style={styles.container}>
            <CustomHeader title="Add Buttons" />
            <FlatList
                data={options}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <OptionCard
                        title={item.title}
                        onPress={() => navigation.navigate(item.navigation)}
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
        backgroundColor: '#FAF7F0',
    },
    listContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default AddButtons;
