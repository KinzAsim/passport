import React from 'react';
import { ViewStyle } from 'react-native';
import {CheckBox} from 'react-native-elements';
import {THEME} from '../../exporter';

const CustomCB = ({
  value,
  onPress,
  iconType = 'ionicon',
  checkedIcon = 'checkbox',
  uncheckedIcon = 'square-outline',
  disabled,
  style,
}: {
  value?: boolean;
  iconType?: string;
  checkedIcon?: string;
  uncheckedIcon?: string;
  onPress: any;
  disabled?: boolean;
  style?: ViewStyle;
}) => {
  return (
    <CheckBox
      disabled={disabled}
      iconRight
      iconType={iconType}
      checkedIcon={checkedIcon}
      uncheckedIcon={uncheckedIcon}
      checkedColor={THEME.colors.primary}
      checked={value}
      onPress={onPress}
      containerStyle={style}
    />
  );
};

export default CustomCB;
