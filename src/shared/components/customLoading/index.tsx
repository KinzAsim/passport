import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {RF, THEME} from '../../exporter';

const {primary} = THEME.colors;

const CustomLoading = ({visible}: {visible: boolean; bgColor?: string}) => {
  return (
    <>
      {visible && (
        <View style={styles.container}>
          <SkypeIndicator color={primary} size={RF(40)} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});

export default CustomLoading;
