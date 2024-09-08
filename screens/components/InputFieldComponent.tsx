import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const TextInputComponent = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  keyboardType,
  onBlur,
  value,
  editable,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#000"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      editable={editable}
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
