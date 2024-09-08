import React, {useState} from 'react';
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

const Home = ({navigation}) => {
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
      backgroundColor: '#FFC542',
      imageSource: require('../Images/view-beautiful-abstract-3d-flower.png'),
      onPress: () => navigation.navigate('Flower'),
    },
    {
      title: 'દૈનિક શાકભાજી સંગ્રહ દાખલ કરો',
      value: 'શાકભાજી',
      backgroundColor: '#FF565E',
      imageSource: require('../Images/gradient-christmas-basket-illustration.png'),
      onPress: () => navigation.navigate('Vegetable'),
    },
    {
      title: 'મુલી ની હાજરી નાખો',
      value: 'મુલી',
      backgroundColor: '#3ED598',
      imageSource: require('../Images/india-republic-day-national-celebration-3d-style.png'),
      onPress: () => navigation.navigate('EmployeeHome'),
    },
    {
      title: 'રૂપિયાનો હિસાબ દાખલ કરો',
      value: 'રૂપિયા',
      backgroundColor: '#FF565E',
      imageSource: require('../Images/stack-money-gold-coins-3d-cartoon-style-icon-coins-with-dollar-sign-wad-cash-currency-flat-vector-illustration-wealth-investment-success-savings-economy-profit-concept.png'),
      onPress: () => navigation.navigate('MoneyTopTabBar'),
    },
    {
      title: 'બિલ બનાવો અને ડાઉનલોડ કરો',
      value: 'રૂપિયા',
      backgroundColor: '#3ED598',
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
    // Handle form submission for the modal here
    // You can also close the modal after submission
    setVegetableModalVisible(false);
    setCustomerModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.grid}>
          {cards.map((card, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={1000}
              delay={index * 600}
              style={styles.card}>
              <CardComponent
                title={card.title}
                value={card.value}
                backgroundColor={card.backgroundColor}
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
          style={styles.addNowContainer}>
          <TouchableOpacity
            onPress={() => setVegetableModalVisible(true)}
            style={styles.entryButtonYellow}>
            <Text style={styles.entryButtonText}>નવી શાકભાજી ઉમેરો</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCustomerModalVisible(true)}
            style={styles.entryButtonBlue}>
            <Text style={styles.entryButtonText}>નવો ગ્રાહક ઉમેરો</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}

      {/* Modal for adding new Vegetable */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={vegetableModalVisible}
        onRequestClose={handlePressOutside}>
        <Pressable style={styles.centeredView} onPress={handlePressOutside}>
          <Pressable
            style={styles.modalView}
            onPress={e => e.stopPropagation()} // Prevents press inside the modal from closing it
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
              onPress={handleModalSubmit}>
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
        onRequestClose={handlePressOutside}>
        <Pressable style={styles.centeredView} onPress={handlePressOutside}>
          <Pressable
            style={styles.modalView}
            onPress={e => e.stopPropagation()} // Prevents press inside the modal from closing it
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
              onPress={handleModalSubmit}>
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
    padding: 10,
    backgroundColor: '#1F2E35',
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'column',
  },
  card: {
    width: '100%',
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF565E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  plusIcon: {
    fontSize: 30,
    color: '#FFF',
  },
  addNowContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    padding: 20, // Adjusted to match the design
    borderRadius: 10,
  },
  entryButtonYellow: {
    backgroundColor: '#FFC542', // Yellow button color
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryButtonBlue: {
    backgroundColor: '#3ED598', // Blue button color
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryButtonText: {
    fontSize: 16,
    color: '#FFF', // White text color
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  modalSubmitButton: {
    backgroundColor: '#FF565E',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFF', // White text color
    fontWeight: 'bold',
  },
});

export default Home;
