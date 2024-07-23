import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CollectedCard from './elements/CollectionCard';

const MoneyHome = ({route}) => {
  console.log(route.params.status);

  const customers = [
    {
      name: 'ઉદય ટાંક',
      collectedAmount: '500',
      notCollectedAmount: '200',
      status: 'Collected',
    },
    {
      name: 'જયેશ પટેલ',
      collectedAmount: '700',
      notCollectedAmount: '100',
      status: 'Pending',
    },
    {
      name: 'મનિષા શાહ',
      collectedAmount: '300',
      notCollectedAmount: '50',
      status: 'Collected',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {customers.map((customer, index) => (
        <CollectedCard
          key={index}
          name={customer.name}
          collectedAmount={customer.collectedAmount}
          notCollectedAmount={customer.notCollectedAmount}
          status={route.params.status}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});

export default MoneyHome;
