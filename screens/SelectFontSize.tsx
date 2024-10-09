// FontSizePicker.js
import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFontSize } from './FontSizeContext';

const FontSizePicker = () => {
    const { fontSize, setFontSize } = useFontSize();

    return (
        <View>
            <Text>Select Font Size:</Text>
            <Picker
                selectedValue={fontSize}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setFontSize(itemValue)}
            >
                {/* You can adjust the sizes as per your design preference */}
                <Picker.Item label="8" value={8} />
                <Picker.Item label="12" value={12} />
                <Picker.Item label="16" value={16} />
                <Picker.Item label="20" value={20} />
                <Picker.Item label="24" value={24} />
                <Picker.Item label="28" value={28} />
                <Picker.Item label="32" value={32} />
            </Picker>
        </View>
    );
};

export default FontSizePicker;
