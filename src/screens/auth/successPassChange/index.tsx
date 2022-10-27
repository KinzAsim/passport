import React, {useEffect} from 'react';
import {View} from 'react-native';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import Success from '../../../shared/components/success';
import {navigate} from '../../../shared/services/nav.service';
import {styles} from './styles';

const SuccessPassChange = () => {
  useEffect(() => {
    setTimeout(() => {
      navigate('Login');
    }, 3000);
  }, []);

  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title="Success"/>
      <View style={styles.container}>
        <Success caption={'Your Password has been chnaged successfully!'} />
      </View>
    </>
  );
};
export default SuccessPassChange;
