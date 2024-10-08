import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const EmployeeCardComponent = ({
  name,
  dayType,
  date,
  shift,
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
        style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{name}</Text>
        <View style={styles.detailRow}>
          <Image
            source={require('../../Images/working-hours.png')}
            style={styles.icon}
          />
          <Text style={styles.detailText}>{`પ્રકાર: ${dayType}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Image
            source={require('../../Images/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept.png')}
            style={styles.icon}
          />
          <Text style={styles.detailText}>{`તારીખ: ${date}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Image
            source={require('../../Images/hourglass.png')}
            style={styles.icon}
          />
          <Text style={styles.detailText}>{`સમય: ${shift}`}</Text>
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
    marginVertical: 10,
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
  cardDetails: {
    flex: 1,
    borderRadius: 10, // Rounded corners for the gradient background
    padding: 10, // Padding inside the card
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000', // Set title color to white for better contrast
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000', // Set detail text color to white for better visibility
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

export default EmployeeCardComponent;