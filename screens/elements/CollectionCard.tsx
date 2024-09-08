// elements/CollectedCard.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

const CollectedCard = ({
  name,
  collectedAmount,
  notCollectedAmount,
  status,
  type,
  collectedDate,
  animation,
  delay,
}) => {
  console.log(type);
  return (
    <Animatable.View
      animation={animation}
      duration={1000}
      delay={delay}
      style={styles.cardContainer}>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{name}</Text>
        {status === 'Collected' && (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.amountLabel}>એકત્રિત રકમ: </Text>
              <Text style={styles.detailText}>{collectedAmount} રૂપિયા</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.amountLabel}>આવેલા રૂપિયા ની તારીખ: </Text>
              <Text style={styles.detailText}>{collectedDate}</Text>
            </View>
          </>
        )}
        {status === 'Pending' && (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.amountLabel}>બાકી રકમ: </Text>
              <Text style={styles.detailText}>{notCollectedAmount} રૂપિયા</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.amountLabel}>
                છેલ્લે આવેલા રૂપિયા ની તારીખ:{' '}
              </Text>
              <Text style={styles.detailText}>{collectedDate}</Text>
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
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    backgroundColor: '#475E69',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cardDetails: {
    flex: 1,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  amountLabel: {
    fontSize: 16,
    color: '#fff',
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: '#fff',
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
