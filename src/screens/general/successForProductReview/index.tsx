import React, {Component} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '../../../shared/components/button';
import CustomText from '../../../shared/components/customText';
import {RF} from '../../../shared/exporter';
import {navigate} from '../../../shared/services/nav.service';
import {styles} from './styles';
import {success} from '../../../assets/images';
import HeaderWrapper from '../../../shared/components/headerWrapper';

const SuccessForProductReview = ({route}: any) => {
  let Data = route?.params?.data;
  console.log('dd....', Data);

  return (
    <>
      <HeaderWrapper showTitle title="Success" />
      <View style={styles.container}>
        <FastImage source={success} style={styles.successPic} />
        <CustomText style={{textAlign: 'center'}}>
          Your Review was successfully submitted!
        </CustomText>
        <View style={{marginTop: RF(160)}}>
          <Button
            text={'Back to Home'}
            onPress={() => navigate('ProductDetails')}
          />
          <Button
            text={'See your Review'}
            onPress={() =>
              navigate('SeeAllReview', {data: Data, title: 'All Reviews'})
            }
          />
        </View>
      </View>
    </>
  );
};

export default SuccessForProductReview;
