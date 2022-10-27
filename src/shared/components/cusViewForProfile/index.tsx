import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText';
import {RF} from '../../../shared/exporter';

export const CusView = ({imageSrc, contentEnteries, onPress}: any) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <FastImage style={styles.imagesStyle} source={imageSrc} />
      <CustomText size={14} style={styles.txt}>
        {contentEnteries}
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: RF(10),
    alignItems: 'center',
    width: RF(120),
  },
  imagesStyle: {
    width: RF(19),
    height: RF(19),
  },
  txt: {paddingLeft: RF(10)},
});
