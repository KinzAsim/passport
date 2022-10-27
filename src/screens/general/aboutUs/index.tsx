import React from 'react';
import {View, StyleSheet} from 'react-native';
import CusLoremIpsum from '../../../shared/components/CustomLoremIpsum';
import HeaderWrapper from '../../../shared/components/headerWrapper';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <HeaderWrapper showBtnLeft showTitle title="About Us" />
      <CusLoremIpsum />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AboutUs;
