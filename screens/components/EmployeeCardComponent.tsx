// components/EmployeeCardComponent.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmployeeCardComponent = ({name, dayType, date, shift}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.detail}>{`પ્રકાર: ${dayType}`}</Text>
      <Text style={styles.detail}>{`તારીખ: ${date}`}</Text>
      <Text style={styles.detail}>{`સમય: ${shift}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    color: '#555',
  },
});

export default EmployeeCardComponent;
