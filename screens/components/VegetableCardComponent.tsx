import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

const VegetableCardComponent = ({
  vegetableName,
  vegetableWeight,
  vegetableQuantity,
  dateNeeded,
  remark,
  onEdit,
  onDelete,
  animation,
  delay,
}) => {
  return (
    <Animatable.View
      animation={animation}
      duration={1000}
      delay={delay}
      style={styles.cardContainer}>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{vegetableName}</Text>
        <View style={styles.detailRow}>
          <Image
            source={require('../../Images/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept.png')}
            style={styles.icon}
          />
          <Text style={styles.detailText}>{vegetableWeight} કિલો</Text>
        </View>
        <View style={styles.detailRow}>
          <Image
            source={require('../../Images/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept.png')}
            style={styles.icon}
          />
          <Text style={styles.detailText}>{vegetableQuantity} નંગ</Text>
        </View>
        <View style={styles.detailRow}>
          <Image
            source={require('../../Images/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept.png')}
            style={styles.icon}
          />
          <Text style={styles.detailText}>{dateNeeded}</Text>
        </View>
        {remark && (
          <View style={styles.detailRow}>
            <Image
              source={require('../../Images/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept.png')}
              style={styles.icon}
            />
            <Text style={styles.detailText}>{remark}</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>એડિટ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>કાઢી નાખો</Text>
        </TouchableOpacity>
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
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#4B134F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VegetableCardComponent;
