import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {styles} from './styles';
import {sadSmiley} from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';

const NoCoupen = () => {
  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title="XYZ Dispencery" />
      <View style={styles.container}>
        <FastImage style={styles.sadPic} source={sadSmiley} />
        <CustomText bold size={14}>
          Sorry not coupon available
        </CustomText>
        <CustomText size={12}>
          It is long established fact that a reader will be distracted by the
          readable content layout.
        </CustomText>
      </View>
    </>
  );
};

export default NoCoupen;
