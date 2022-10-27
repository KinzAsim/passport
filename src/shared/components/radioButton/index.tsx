import React from 'react';
import {View, StyleSheet, Pressable, ViewStyle} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {THEME} from '../../exporter';
import CustomText from '../customText';

const {primary} = THEME.colors;

const RadioBtn = ({
  isChecked,
  onClick,
  title,
  containerStyle,
}: {
  title: any;
  isChecked: any;
  onClick: () => void;
  containerStyle?: any;
}) => {
  return (
    <Pressable style={[styles.radioBtnView, containerStyle]} onPress={onClick}>
      <RadioButton.Android
        value="email"
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={onClick}
        color={primary}
      />
      <CustomText bold>{title}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  radioBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RadioBtn;
