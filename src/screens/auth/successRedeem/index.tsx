import React, {useEffect} from 'react';
import {View} from 'react-native';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import Success from '../../../shared/components/success';
import {styles} from './styles';

const SuccessRedeem = ({route, navigation}: any) => {
  let qrCode = route?.params?.qrCode;
  let dispensary_id = route?.params?.dispensary_id;
  let lat = route?.params?.lat;
  let lon = route?.params?.lon;
  let dispensaryName = route?.params?.dispensaryName;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);

  return (
    <>
      <HeaderWrapper title="Redeem" showTitle={true} />
      <View style={styles.container}>
        <Success
          caption={
            'Great you have successfull submitted. Please wait for Admin to approve'
          }
        />
      </View>
    </>
  );
};
export default SuccessRedeem;
