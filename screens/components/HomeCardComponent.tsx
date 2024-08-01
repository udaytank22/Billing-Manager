import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const CardComponent = ({
  title,
  value,
  backgroundColor,
  icon,
  onPress,
  gradient = false,
  disabled = false,
}) => {
  const GradientBackground = gradient ? (
    <LinearGradient colors={backgroundColor} style={styles.gradient}>
      <Content title={title} value={value} icon={icon} />
    </LinearGradient>
  ) : (
    <View style={[styles.card, {backgroundColor}]}>
      <Content title={title} value={value} icon={icon} />
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.cardWrapper,
        pressed && !disabled && {opacity: 1},
      ]}>
      {GradientBackground}
    </Pressable>
  );
};

const Content = ({title, value, icon}) => (
  <View style={styles.content}>
    <Icon name={icon} size={24} color="#000" style={styles.icon} />
    <View style={styles.textContainer}>
      <Title style={styles.title}>{title}</Title>
      {value && <Paragraph style={styles.value}>{value}</Paragraph>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  card: {
    padding: 20,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  value: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CardComponent;
