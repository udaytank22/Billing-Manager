import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageSelect = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

    const saveLanguage = async () => {
        if (selectedLanguage) {
            try {
                await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
                navigation.navigate('Home'); // Navigate to home page after selecting language
            } catch (e) {
                console.log('Error saving language', e);
            }
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Select a Language</Text>
            <FlatList
                data={languages}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedLanguage(item)}>
                        <Text style={{
                            padding: 10,
                            backgroundColor: selectedLanguage === item ? '#fc9700' : '#f0f0f0',
                            marginVertical: 5,
                            color: '#000'
                        }}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
            />
            <Button title="Confirm" onPress={saveLanguage} />
        </View>
    );
};

export default LanguageSelect;
