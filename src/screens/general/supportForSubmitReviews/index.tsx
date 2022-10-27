import React, {Component} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import CusSupport from '../../../shared/components/CusSupport';
import {RF} from '../../../shared/exporter';

const SupportForSubmitReviews = ({navigation, route, type}: any) => {
  let id = route?.params?.id;
  let rData = route?.params?.RewiewData;
  return (
    <>
      <View style={styles.container}>
        <CusSupport
          navigation={navigation}
          title={'Submit Your Review'}
          subject={
            route?.params?.type === 'dispensary'
              ? 'Dispensary Name'
              : 'Product Name'
          }
          body={'Your Opinion'}
          showRating
          attachFile
          buttonTitle={'Next'}
          showRightText
          btnStyle={{height: RF(80), justifyContent: 'flex-end'}}
          type={route?.params?.type === 'dispensary' ? 'dispensary' : 'product'}
          type_id={id}
          detailData={route?.params?.detailData}
          RewiewData={route?.params?.type === 'dispensary' ? null : rData}
        />
      </View>
    </>
  );
};

export default SupportForSubmitReviews;
