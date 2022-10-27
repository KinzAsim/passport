import React, {useEffect} from 'react';
import {View} from 'react-native';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import Success from '../../../shared/components/success';
import {styles} from './styles';

const SuccessFormSubmit = ({route, navigation}: any) => {
  let qrCode = route?.params?.qrCode;
  let dispensary_id = route?.params?.dispensary_id;
  let lat = route?.params?.lat;
  let lon = route?.params?.lon;
  let dispensaryName = route?.params?.dispensaryName;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('FavoriteCouponDispensory', {
        qrCode: qrCode,
        dispensary_id: dispensary_id,
        lat: lat,
        lon: lon,
        dispensaryName: dispensaryName,
      });
    }, 3000);
  }, []);

  return (
    <>
      <HeaderWrapper title="Fill Intake Form" showTitle={true} />
      <View style={styles.container}>
        <Success caption={'Great you have successfully Checked In'} />
      </View>
    </>
  );
};
export default SuccessFormSubmit;
