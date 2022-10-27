import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RF, THEME} from '../../exporter';

const {primary, white} = THEME.colors;

const Button = ({text, wrapStyle, onPress, textStyle, disabled}: any) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, wrapStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: RF(12),
    paddingBottom: RF(15),
    paddingLeft: RF(32),
    paddingRight: RF(32),
    borderRadius: RF(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
    marginTop: RF(20),
  },
  text: {
    fontSize: RF(16),
    fontFamily: THEME.fonts.medium,
    color: white,
  },
});

export default Button;
