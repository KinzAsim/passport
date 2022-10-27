import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RF, THEME} from '../../exporter';
import CustomText from '../customText';

const {white, primary} = THEME.colors;
const CusLoremIpsum = () => {
  return (
    <View style={styles.container}>
      <CustomText color={primary} style={{marginTop: RF(10)}} size={12}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: RF(20),
    backgroundColor: white,
    paddingHorizontal: RF(15),
    alignItems: 'center',
    paddingVertical: RF(10),
    borderRadius: RF(15),
    marginHorizontal: RF(20),
  },
});

export default CusLoremIpsum;
