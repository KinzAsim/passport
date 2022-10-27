import React from 'react';
import {View, StyleSheet} from 'react-native';
import CusLoremIpsum from '../../../shared/components/CustomLoremIpsum';
import HeaderWrapper from '../../../shared/components/headerWrapper';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <HeaderWrapper showBtnLeft showTitle title="Privacy Policy" />
      <CusLoremIpsum />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PrivacyPolicy;
