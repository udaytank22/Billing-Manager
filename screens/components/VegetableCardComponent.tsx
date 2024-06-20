import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const VegetableCardComonent = ({
  vegetableName,
  vegetableWeight,
  vegetableQuentity,
  dateNeeded,
  remark,
  onPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{vegetableName}</Text>
        <View style={styles.detailRow}>
          <FontAwesomeIcon name="leaf" size={16} color="#e67e22" />
          <Text style={styles.detailText}>{vegetableWeight} કિલો</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesomeIcon name="shopping-cart" size={16} color="#e67e22" />
          <Text style={styles.detailText}>{vegetableQuentity} નંગ</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesomeIcon name="calendar" size={16} color="#3498db" />
          <Text style={styles.detailText}>{dateNeeded}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesomeIcon name="comment" size={16} color="#e67e22" />
          <Text style={styles.detailText}>{remark}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.infoButton} onPress={onPress}>
        <Text style={styles.infoButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#000',
  },
  infoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B134F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  infoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VegetableCardComonent;
