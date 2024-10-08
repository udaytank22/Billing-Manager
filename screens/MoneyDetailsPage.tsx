import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './components/CustomHeader';

const DetailPage = ({ route, navigation }) => {
  const sortedCollectionDetails = [...route.params.collectedAmount].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Render each row of the table
  const renderItem = ({ index, item }) => {
    const isLatest = index === 0;
    return (
      <View style={[styles.tableRow, isLatest && styles.highlight]}>
        <Text style={[styles.tableCell, styles.cellWithBorder]}>{route.params.collectedDate}</Text>
        <Text style={styles.tableCell}>₹ {route.params.collectedAmount}</Text>
      </View>
    );
  };

  // Function to handle the phone number press
  const handlePhonePress = () => {
    const phoneNumber = `tel:${route.params.contactDetails}`;
    Linking.openURL(phoneNumber).catch((err) => console.error('Error opening dialer:', err));
  };

  return (
    <>
      <Header
        title="Money Details"
        onBackPress={() => navigation.goBack()}
        showBackButton={true}
      />
      <LinearGradient
        colors={['#8e6f79', '#1a1519', '#2f1e34']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        {/* Customer Details */}
        <View style={styles.amountSection}>
          <Text style={styles.customerName}>{route.params.name}</Text>
          <TouchableOpacity onPress={handlePhonePress}>
            <Text style={styles.customerContact}>Contact: {route.params.contactDetails}</Text>
          </TouchableOpacity>
        </View>

        {/* Pending and Collected Amount Details */}
        <View style={styles.amountSection}>
          <View style={styles.amountRow}>
            <Text style={styles.label}>Pending Amount:</Text>
            <Text style={styles.value}>₹ {route.params.collectedAmount}</Text>
          </View>
          <View style={styles.amountRow}>
            <Text style={styles.label}>Total Collected:</Text>
            <Text style={styles.value}>
              ₹ {route.params.collectedAmount}
            </Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.cellWithBorder]}>Date</Text>
          <Text style={styles.tableHeaderText}>Amount</Text>
        </View>

        {/* Collection Details */}
        <FlatList
          data={sortedCollectionDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  // Customer section styles
  customerDetails: {
    marginBottom: 20,
    alignItems: 'center',
  },
  customerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  customerContact: {
    fontSize: 16,
    color: '#000', // Changed to blue for clickable text
    marginTop: 5,
  },
  // Pending and collected amounts section styles
  amountSection: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    elevation: 2,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  // Table header style
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  tableHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  // Table row style
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  highlight: {
    backgroundColor: '#fffae6',
    borderColor: '#ffdd59',
    borderWidth: 1,
  },
  // Table cell style
  tableCell: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  cellWithBorder: {
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});

export default DetailPage;
