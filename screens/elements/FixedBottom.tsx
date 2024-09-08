import React from 'react';
import {StyleSheet, View} from 'react-native';

const FixedBottom = ({children}) => {
  return (
    <View style={style.container}>
      {children && React.cloneElement(children, {style: style.btn})}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    height: 100,
  },
  btn: {
    height: '100 %',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FixedBottom;
