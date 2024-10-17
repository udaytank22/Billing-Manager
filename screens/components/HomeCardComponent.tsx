import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CardComponent = ({ data, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(data.navigateTo)} style={styles.card}>
      <LinearGradient
        colors={['#4C669F', '#3B5998', '#192f6a']} // Cooler, professional gradient colors
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
    marginVertical: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    overflow: 'hidden',
    backgroundColor: '#FAF7F0',
    borderColor: '#EAEAEA',
    borderWidth: 1,
  },
  cardGradient: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CardComponent;
