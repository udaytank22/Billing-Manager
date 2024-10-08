import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

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
      <View
        style={styles.gradientBackground}>
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{vegetableName}</Text>
          <View style={styles.detailRow}>
            <Image
              source={require('../../Images/gradient-christmas-basket-illustration.png')}
              style={styles.icon}
            />
            <Text style={styles.detailText}>{vegetableWeight} કિલો</Text>
          </View>
          <View style={styles.detailRow}>
            <Image
              source={require('../../Images/pallet.png')}
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
            <Image
              source={require('../../Images/edit.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Image
              source={require('../../Images/delete_10336397.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    shadowColor: '#000',
    backgroundColor: '#FAF7F0',
    borderColor: '#000',
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    overflow: 'hidden',
  },
  gradientBackground: {
    borderRadius: 10, // Same as container to maintain the round effect
    padding: 15,
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000', // White text for better contrast on gradient
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000', // White text for contrast on gradient
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#6fcf97',
    paddingVertical: 8,
    paddingHorizontal: 15, // Reduced padding for compact buttons
    borderRadius: 5,
    marginHorizontal: 10
  },
  deleteButton: {
    backgroundColor: '#f2994a',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14, // Slightly reduced text size for compact look
  },
});

export default VegetableCardComponent;