import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import CardComponent from './components/HomeCardComponent';
import * as Animatable from 'react-native-animatable';

const Home = ({ navigation }) => {
  const [isAddNowOpen, setIsAddNowOpen] = useState(false);
  const [newVegetableName, setNewVegetableName] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerMobile, setNewCustomerMobile] = useState('');
  const [vegetableModalVisible, setVegetableModalVisible] = useState(false);
  const [customerModalVisible, setCustomerModalVisible] = useState(false);

  const cards = [
    {
      title: 'ડેઇલી ફ્લાવર કલેક્શન દાખલ કરો',
      value: 'ફ્લાવર',
      imageSource: require('../Images/view-beautiful-abstract-3d-flower.png'),
      onPress: () => navigation.navigate('Flower'),
    },
    {
      title: 'દૈનિક શાકભાજી સંગ્રહ દાખલ કરો',
      value: 'શાકભાજી',
      imageSource: require('../Images/gradient-christmas-basket-illustration.png'),
      onPress: () => navigation.navigate('Vegetable'),
    },
    {
      title: 'મુલી ની હાજરી નાખો',
      value: 'મુલી',
      imageSource: require('../Images/india-republic-day-national-celebration-3d-style.png'),
      onPress: () => navigation.navigate('EmployeeHome'),
    },
    {
      title: 'રૂપિયાનો હિસાબ દાખલ કરો',
      value: 'રૂપિયા',
      imageSource: require('../Images/stack-money-gold-coins-3d-cartoon-style-icon-coins-with-dollar-sign-wad-cash-currency-flat-vector-illustration-wealth-investment-success-savings-economy-profit-concept.png'),
      onPress: () => navigation.navigate('MoneyTopTabBar'),
    },
    {
      title: 'બિલ બનાવો અને ડાઉનલોડ કરો',
      value: 'રૂપિયા',
      imageSource: require('../Images/blue-folder-with-information-about-employee-3d-illustration-cartoon-drawing-folder-with-files-documents-3d-style-white-background-business-recruitment-management-organization-concept.png'),
      onPress: () => navigation.navigate('MakeBill'),
    },
  ];

  const toggleAddNow = () => {
    setIsAddNowOpen(!isAddNowOpen);
  };

  const handlePressOutside = () => {
    setIsAddNowOpen(false);
    setVegetableModalVisible(false);
    setCustomerModalVisible(false);
  };

  const handleModalSubmit = () => {
    setVegetableModalVisible(false);
    setCustomerModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Daily Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>Total Flowers</Text>
            <Text style={styles.summaryLabel}>1,245</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>Total Collection</Text>
            <Text style={styles.summaryLabel}>₹34,000</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.grid}>
          {cards.map((card, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={1000}
              delay={index * 600}
              style={styles.card}
            >
              <CardComponent
                title={card.title}
                value={card.value}
                imageSource={card.imageSource}
                onPress={card.onPress}
              />
            </Animatable.View>
          ))}
        </View>
      </ScrollView>

      {/* AddNow Button */}
      <TouchableOpacity style={styles.addButton} onPress={toggleAddNow}>
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>

      {/* Swipe-up Animation for AddNow Fields */}
      {isAddNowOpen && (
        <Animatable.View
          animation="slideInUp"
          duration={500}
          style={styles.addNowContainer}
        >
          <TouchableOpacity
            onPress={() => setVegetableModalVisible(true)}
            style={styles.entryButtonYellow}
          >
            <Text style={styles.entryButtonText}>નવી શાકભાજી ઉમેરો</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCustomerModalVisible(true)}
            style={styles.entryButtonBlue}
          >
            <Text style={styles.entryButtonText}>નવો ગ્રાહક ઉમેરો</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}

      {/* Modal for adding new Vegetable */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={vegetableModalVisible}
        onRequestClose={handlePressOutside}
      >
        <Pressable style={styles.centeredView} onPress={handlePressOutside}>
          <Pressable
            style={styles.modalView}
            onPress={(e) => e.stopPropagation()} // Prevents press inside the modal from closing it
          >
            <Text style={styles.modalTitle}>નવી શાકભાજી ઉમેરો</Text>
            <TextInput
              style={styles.input}
              placeholder="શાકભાજી નું નામ"
              placeholderTextColor="#c0c0c0"
              value={newVegetableName}
              onChangeText={setNewVegetableName}
            />
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={handleModalSubmit}
            >
              <Text style={styles.submitButtonText}>ઉમેરો</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal for adding new Customer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={customerModalVisible}
        onRequestClose={handlePressOutside}
      >
        <Pressable style={styles.centeredView} onPress={handlePressOutside}>
          <Pressable
            style={styles.modalView}
            onPress={(e) => e.stopPropagation()} // Prevents press inside the modal from closing it
          >
            <Text style={styles.modalTitle}>નવો ગ્રાહક ઉમેરો</Text>
            <TextInput
              style={styles.input}
              placeholder="ગ્રાહક નું નામ"
              placeholderTextColor="#c0c0c0"
              value={newCustomerName}
              onChangeText={setNewCustomerName}
            />
            <TextInput
              style={styles.input}
              placeholder="ગ્રાહક મોબાઇલ નંબર"
              value={newCustomerMobile}
              placeholderTextColor="#c0c0c0"
              onChangeText={setNewCustomerMobile}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={handleModalSubmit}
            >
              <Text style={styles.submitButtonText}>ઉમેરો</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Light background color for eye cooling effect
  },
  topSection: {
    backgroundColor: '#5B86E5', // Light blue color for top section
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    // backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#fff',
  },
  gridContainer: {
    padding: 15,
  },
  grid: {
    // Additional styles if needed for layout
  },
  card: {
    backgroundColor: '#FFF', // Set the background color to white
    borderRadius: 10,        // Give the card rounded corners
    padding: 15,             // Add padding inside the card
    marginBottom: 20,        // Add margin between cards
    shadowColor: '#000',     // Shadow color (black)
    shadowOffset: {
      width: 0,              // Horizontal shadow offset
      height: 2,             // Vertical shadow offset
    },
    shadowOpacity: 0.25,     // Opacity of the shadow
    shadowRadius: 3.84,      // Blur radius of the shadow
    elevation: 5,            // Elevation for Android (controls shadow depth)
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#5B86E5',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plusIcon: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  addNowContainer: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    padding: 20,
  },
  entryButtonYellow: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  entryButtonBlue: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 10,
  },
  entryButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  modalSubmitButton: {
    backgroundColor: '#5B86E5',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;
