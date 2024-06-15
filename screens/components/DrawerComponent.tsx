import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';

const CustomDrawerContent = props => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.drawerHeader}>
        <Image
          source={{uri: 'https://example.com/path-to-your-image.jpg'}} // Replace with your image URL
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Bell Audren</Text>
        <Text style={styles.profileStatus}>PHOENIX</Text>
        <Text style={styles.netCredits}>NET CREDITS: 6778</Text>
      </View>
      <DrawerItemList {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 200,
    backgroundColor: '#4B134F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileStatus: {
    color: 'white',
    fontSize: 14,
  },
  netCredits: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 5,
  },
});

export default CustomDrawerContent;
