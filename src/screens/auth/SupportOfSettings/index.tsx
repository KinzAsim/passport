import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import CusSupport from '../../../shared/components/CusSupport';
import {cross} from '../../../assets/images';
import {RouteProp} from '@react-navigation/native';

interface Props {
  navigation: any;
  route: RouteProp<{
    params: {
      sheetRef: any;
    };
  }>;
}

const SupportForSettings = ({route, navigation}: Props) => {
  // console.log('re...', route?.params?.sheetRef?.current?.hide());

  return (
    <>
      <View style={styles.container}>
        <CusSupport
          showSubjectLine
          leftIcon={cross}
          title={'Support'}
          subject={'Subject Line'}
          body={'Describe your issue here....'}
          buttonTitle={'Submit'}
          // showRating
          type={'support'}
          navigation={navigation}
        />
      </View>
    </>
  );
};

export default SupportForSettings;
