// DropDownComponent.js
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, View} from 'react-native';

const DropDownComponent = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
}) => {
  return (
    <View style={styles.dropdown}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}>
        <Picker.Item label={placeholder} value="" />
        {items.map((item, index) => (
          <Picker.Item label={item.label} value={item.value} key={index} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  picker: {
    height: '100%',
    width: '100%',
    color: '#000',
  },
});

export default DropDownComponent;
