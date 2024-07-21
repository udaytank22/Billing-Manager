import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const CardComponent = ({title, value, backgroundColor, onPress}) => {
  return (
    <Pressable
      style={[styles.card, {backgroundColor, shadowColor: backgroundColor}]}
      onPress={onPress} // Pass onPress handler from parent component
      activeOpacity={0.8}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 160,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  value: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 10,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default CardComponent;
