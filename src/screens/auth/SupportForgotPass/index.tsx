import React from 'react';
import {View} from 'react-native';
import CusSupport from '../../../shared/components/CusSupport';
import {styles} from './styles';
import {cross} from '../../../assets/images';

const SupportForgotPass = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <CusSupport
        showSubjectLine
        leftIcon={cross}
        title={'Support'}
        subject={'Subject Line'}
        body={'Body of Content'}
        buttonTitle={'Submit'}
        type={'support'}
        navigation={navigation}
      />
    </View>
  );
};

export default SupportForgotPass;
