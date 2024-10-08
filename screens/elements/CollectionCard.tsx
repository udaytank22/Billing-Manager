// elements/CollectedCard.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const CollectedCard = ({
  name,
  collectedAmount,
  notCollectedAmount,
  contactDetails,
  status,
  type,
  collectedDate,
  animation,
  delay,
}) => {
  const navigation = useNavigation();
  return (
    <Animatable.View
      animation={animation}
      duration={1000}
      delay={delay}
      style={styles.cardContainer}>
      <Pressable style={styles.cardDetails} onPress={() => navigation.navigate('DetailPage', { name, collectedAmount, collectedDate, contactDetails })}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardDiscription}>બાકી રૂપિયા</Text>
        <Text style={styles.cardDiscription}>{notCollectedAmount}</Text>
        <View style={styles.statusContainer}>
        </View>
      </Pressable>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    height: 150,
    backgroundColor: '#FAF7F0',
    borderColor: '#000',
    borderWidth: 1,
  },
  cardDetails: {
    flex: 1,
    height: 150,
    width: 150,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 5,
    borderRadius: 8.85
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3d3d3d',
  },
  cardDiscription: {
    fontSize: 15,
    color: '#3d3d3d',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  amountLabel: {
    fontSize: 16,
    color: '#000',
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: '#000',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  collected: {
    color: 'green',
  },
  pending: {
    color: 'red',
  },
});

export default CollectedCard;
