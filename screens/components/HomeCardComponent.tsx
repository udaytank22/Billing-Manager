import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const CardComponent = ({
  title,
  value,
  imageSource,
  onPress,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.cardWrapper,
        pressed && !disabled && { opacity: 0.8 },
      ]}>
      <Card style={[styles.card]}>
        <View style={styles.content}>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.textContainer}>
            <Title style={styles.title}>{title}</Title>
            {value && <Paragraph style={styles.value}>{value}</Paragraph>}
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 10,
    borderRadius: 15,
    // overflow: 'hidden',
  },
  card: {
    borderRadius: 15,
    // elevation: 5,
    padding: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 40, // Make the image circular
    // borderWidth: 3,
    // borderColor: '#fff', // White border around the image for a cartoonish effect
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
});

export default CardComponent;
