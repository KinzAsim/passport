import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RF, THEME} from '../../exporter';
const {dimGray} = THEME.colors;

const Wrapper = ({children, style}: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: RF(20)}, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dimGray,
  },
});

export default Wrapper;
