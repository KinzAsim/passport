import React from 'react';
import {View, Pressable, StyleSheet, Switch} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
import CustomText from '../customText';
import FastImage from 'react-native-fast-image';
import {arrowRight} from '../../../assets/images';

const {white, gray, primary} = THEME.colors;

const CusViewForSettings = ({
  title,
  onPress,
  toggleValue,
  toggleValueChange,
}: any) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <CustomText>{title}</CustomText>
      <View style={styles.imgView}>
        {title === 'Notification' ? (
          <Switch
            trackColor={{false: gray, true: primary}}
            thumbColor={white}
            value={toggleValue}
            onValueChange={toggleValueChange}
          />
        ) : (
          <FastImage style={styles.arrowImg} source={arrowRight} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RF(15),
    backgroundColor: white,
    marginTop: RF(2),
    height: '8%',
  },
  imgView: {
    width: RF(20),
    height: RF(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowImg: {
    width: RF(6.5),
    height: RF(12),
  },
});
export default CusViewForSettings;
