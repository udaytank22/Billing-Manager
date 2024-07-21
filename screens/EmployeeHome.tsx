import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EmployeeCardComponent from './components/EmployeeCardComponent';
import FixedBottom from './elements/FixedBottom';

const EmployeeHome = ({navigation}) => {
  const [search, setSearch] = React.useState('');

  const employeeData = [
    {
      name: 'રાજ કુમાર',
      dayType: 'આખો દિવસ',
      date: '2024-07-21',
      shift: 'સવાર',
    },
    {
      name: 'આરતી બેન',
      dayType: 'અડધું',
      date: '2024-07-20',
      shift: 'સાંજ',
    },
    {
      name: 'વિપુલ સિંહ',
      dayType: 'આખો દિવસ',
      date: '2024-07-19',
      shift: 'સવાર',
    },
    // Add more dummy data as needed
  ];

  const filteredData = employeeData.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="શોધો"
          placeholderTextColor="#000"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cardsContainer}
        renderItem={({item}) => (
          <EmployeeCardComponent
            name={item.name}
            dayType={item.dayType}
            date={item.date}
            shift={item.shift}
          />
        )}
      />

      <FixedBottom>
        <View>
          <TouchableOpacity
            style={{
              marginRight: 15,
              backgroundColor: '#1d3557',
              borderRadius: 20,
              width: '50%',
              height: '50%',
              justifyContent: 'center',
            }}
            onPress={() => navigation.push('AddEmployee')}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: 'white',
              }}>
              એન્ટ્રી ઉમેરો
            </Text>
          </TouchableOpacity>
        </View>
      </FixedBottom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  cardsContainer: {
    paddingBottom: 20,
  },
});

export default EmployeeHome;
