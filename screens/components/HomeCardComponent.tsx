import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CardComponent = ({ data, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(data.navigateTo)} style={styles.card}>
      <LinearGradient
        colors={['#1c92d2', '#f2fcfe']} // Soft, vibrant gradient for a modern feel
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{data.title}</Text>
          <Text style={styles.cardSubtitle}>Total: {data.total}</Text>
        </View>
        <Image source={data.imageSource} style={styles.cardImage} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardGradient: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  cardTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    color: '#555',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CardComponent;
