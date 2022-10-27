import React from 'react';
import {Text, TextInputProps, TextProps} from 'react-native';
import {RF, THEME} from '../../exporter';

interface Props extends TextProps {
  style: any;
  bold: boolean;
  semiBold: boolean;
  size: number;
  color: string;
  capital: boolean;
  children: any;
  numberOfLines: number;
  italic: boolean;
  onPress: () => void;
}

const CustomText = (props: Partial<Props>) => {
  const {
    size = 12,
    color = THEME.colors.black,
    style,
    numberOfLines,
    capital = false,
    onPress,
  } = props;
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: props.bold ? THEME.fonts.bold : THEME.fonts.primary,
          fontSize: RF(size),
          color,
          textTransform: capital ? 'uppercase' : 'none',
        },
        style,
      ]}>
      {props.children}
    </Text>
  );
};

export default CustomText;
