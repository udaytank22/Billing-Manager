import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const TextInputComponent = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  keyboardType,
  onBlur,
  value,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#8a8a8a"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default TextInputComponent;
