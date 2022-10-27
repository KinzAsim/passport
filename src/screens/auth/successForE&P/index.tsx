import React, {useEffect} from 'react';
import {View} from 'react-native';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import Success from '../../../shared/components/success';
import {navigate} from '../../../shared/services/nav.service';
import {styles} from './styles';

const SuccessForEandP = () => {
  useEffect(() => {
    setTimeout(() => {
      navigate('Login');
    }, 3000);
  }, []);

  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title="Success"/>
      <View style={styles.container}>
        <Success caption={'Your Email & Phone Number are verified successfully!'} />
      </View>
    </>
  );
};
export default SuccessForEandP;
