import React from 'react';
import CustomText from '../customText';
import {StyleSheet, View, TextProps} from 'react-native';
import {success} from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import {RF} from '../../exporter';
import Button from '../button';
import {navigate} from '../../services/nav.service';

interface SuccessProps extends TextProps {
  caption: string;
  showNavButtons: boolean;
}
const Success = ({caption, showNavButtons}: Partial<SuccessProps>) => {
  return (
    <View style={styles.container}>
      <FastImage source={success} style={styles.successPic} />
      <CustomText style={{textAlign: 'center'}}>{caption}</CustomText>
      {showNavButtons ? (
        <View style={{marginTop: RF(160)}}>
          <Button
            text={'Back to Home'}
            onPress={() => navigate('Tabs', {screen: 'Home'})}
          />
          <Button text={'See your review'} onPress={() => null} />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  successPic: {
    marginTop: RF(110),
    alignSelf: 'center',
    width: RF(146.59),
    height: RF(180.77),
  },
});
export default Success;
