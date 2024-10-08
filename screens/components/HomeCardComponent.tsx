import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CardComponent = ({ data, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(data.navigateTo)} style={styles.card}>
      <View style={styles.cardGradient}
      >
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{data.title}</Text>
          <Text style={styles.cardTitle}>Total: {data.total}</Text>
        </View>
        <Image source={data.imageSource} style={styles.cardImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
    backgroundColor: '#FAF7F0',
    borderColor: '#000',
    borderWidth: 1
  },
  cardGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginLeft: 15,
  },
  cardTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CardComponent;
