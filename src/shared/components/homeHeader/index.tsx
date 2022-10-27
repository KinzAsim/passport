import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import CustomText from '../customText';
import {GST, RF, THEME} from '../../exporter';
import {navigate} from '../../services/nav.service';
import FastImage from 'react-native-fast-image';
import {trophy, location, homeheart, bell} from '../../../assets/images';

const {white, primary, lightGray} = THEME.colors;

const onOpenMap = () => {
  navigate('Map');
};
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Passport',
        message: 'Passport access to your location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      onOpenMap();
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
const HomeHeader = ({
  liveLocation,
  rewards,
  onOpenNotification,
  onPressFavorite,
}: {
  onOpenNotification: () => void;
  rewards: any;
  liveLocation: any;
  onPressFavorite: () => void;
}) => {
  return (
    <View style={[styles.headerContainer, GST.flexDir]}>
      <View style={{flexDirection: 'row', width: '50%'}}>
        <Pressable onPress={requestLocationPermission}>
          <FastImage source={location} style={styles.locationImg} />
        </Pressable>
        <View style={[GST.mLeft]}>
          <CustomText color={lightGray}>Your Location</CustomText>
          <CustomText numberOfLines={1} style={{width: RF(150)}}>
            {liveLocation}
          </CustomText>
        </View>
      </View>
      <View style={[GST.flexDir, GST.AIC, styles.mainView]}>
        <Pressable style={{marginRight: RF(10)}} onPress={onPressFavorite}>
          <FastImage source={homeheart} style={styles.heartImg} />
        </Pressable>
        <Pressable style={{marginRight: RF(7)}} onPress={onOpenNotification}>
          <FastImage source={bell} style={styles.notificationImg} />
        </Pressable>
        <Pressable style={[styles.headerView, GST.flexDir]}>
          <FastImage source={trophy} style={styles.trophyImg} />
          <CustomText style={GST.mLeft5} size={14} color={white}>
            {rewards}
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: white,
    alignItems: 'center',
    paddingHorizontal: RF(15),
    marginBottom: RF(10),
  },
  locationImg: {
    marginTop: Platform.OS === 'android' ? RF(1) : RF(0),
    width: RF(30),
    height: RF(30),
  },
  mainView: {},
  headerView: {
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: RF(5),
    borderRadius: 20,
    // marginLeft: RF(10),
    paddingRight: RF(10),
  },
  notificationImg: {
    width: RF(28),
    height: RF(28),
  },
  trophyImg: {
    width: RF(15),
    height: RF(15),
  },
  heartImg: {
    width: RF(22.5),
    height: RF(20),
  },
});

export default HomeHeader;
