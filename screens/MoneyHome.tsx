import React from 'react';
import {View, StyleSheet, ScrollView, Pressable, Text} from 'react-native';
import CollectedCard from './elements/CollectionCard';
import FixedBottom from './elements/FixedBottom';

const MoneyHome = ({route, navigation}) => {
  // console.log(route.params.status);

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
    <>
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
      {route.params.status === 'Pending' && (
        <FixedBottom>
          <View>
            <Pressable
              style={{
                marginRight: 15,
                backgroundColor: '#1d3557',
                borderRadius: 20,
                width: '50%',
                height: '50%',
                justifyContent: 'center',
              }}
              onPress={() => navigation.push('MoneyCollectionForm')}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: 'white',
                }}>
                એન્ટ્રી ઉમેરો
              </Text>
            </Pressable>
          </View>
        </FixedBottom>
      )}
    </>
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
