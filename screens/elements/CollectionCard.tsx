// elements/CollectionCard.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CollectedCard = ({
  name,
  collectedAmount,
  notCollectedAmount,
  status,
  type,
  collectedDate,
}) => {
  console.log(type);
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      {status === 'Collected' && (
        <>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>એકત્રિત રકમ: </Text>
            <Text style={styles.amount}>{collectedAmount} રૂપિયા</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>આવેલા રૂપિયા ની તારીખ: </Text>
            <Text style={styles.amount}>{collectedDate}</Text>
          </View>
        </>
      )}
      {status === 'Pending' && (
        <>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>બાકી રકમ: </Text>
            <Text style={styles.amount}>{notCollectedAmount} રૂપિયા</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>
              છેલ્લે આવેલા રૂપિયા ની તારીખ:
            </Text>
            <Text style={styles.amount}>{collectedDate}</Text>
          </View>
        </>
      )}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>સ્થિતિ: </Text>
        <Text
          style={[
            styles.status,
            status === 'Collected' ? styles.collected : styles.pending,
          ]}>
          {status === 'Collected' ? 'એકત્રિત' : 'બાકી'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  amountLabel: {
    fontSize: 16,
    color: '#555',
  },
  amount: {
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
    color: '#555',
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
