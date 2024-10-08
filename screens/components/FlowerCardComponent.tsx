import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const FlowerCardComponent = ({
  customerName,
  flowerQuantity,
  flowerAmount,
  purchaseDate,
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
      {/* Gradient Background */}
      <View
        style={styles.gradientBackground}
      >
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{customerName}</Text>

          <View style={styles.detailRow}>
            <Image
              source={require('../../Images/view-beautiful-abstract-3d-flower.png')}
              style={styles.icon}
            />
            <Text style={styles.detailText}>{flowerQuantity} નંગ</Text>
          </View>

          <View style={styles.detailRow}>
            <Image
              source={require('../../Images/stack-money-gold-coins-3d-cartoon-style-icon-coins-with-dollar-sign-wad-cash-currency-flat-vector-illustration-wealth-investment-success-savings-economy-profit-concept.png')}
              style={styles.icon}
            />
            <Text style={styles.detailText}>{flowerAmount} રૂપિયા</Text>
          </View>

          <View style={styles.detailRow}>
            <Image
              source={require('../../Images/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept.png')}
              style={styles.icon}
            />
            <Text style={styles.detailText}>{purchaseDate}</Text>
          </View>
        </View>

        {/* Buttons */}
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
    overflow: 'hidden', // Ensures the gradient doesn't overflow
  },
  gradientBackground: {
    padding: 15,
    borderRadius: 10,
  },
  cardDetails: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3, // Reduced margin for less height
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14, // Reduced text size to optimize space
    color: '#000',
  },
  icon: {
    width: 20, // Reduced icon size
    height: 20,
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14, // Slightly reduced text size for compact look
  },
});

export default FlowerCardComponent;
