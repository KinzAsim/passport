import React, {Component, useState} from 'react';
import {View, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {styles} from './styles';
import {
  RF,
  THEME,
  GST,
  userCheckInDispensary,
  showToast,
  getNearbyDispensaries,
} from '../../../shared/exporter';
import Button from '../../../shared/components/button';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import {Rating} from 'react-native-ratings';

const {white, primary, black, gray, dullLightGrey} = THEME.colors;

const Dispensary = ({
  navigation,
  route,
}: {
  imgTitile: any;
  location: any;
  ratings: any;
  reviews: any;
  img: any;
  styleModify: any;
  navigation: any;
  route: any;
}) => {
  const [loading, setloading] = useState(false);
  const [list, setList] = useState([route?.params?.data]);

  const fetchData = () => {
    setloading(true);
    const params = {
      dispensary_id: list[0].id,
      qr_code: list[0].qr_code,
      lat: list[0].lat,
      lon: list[0].lon,
    };
    userCheckInDispensary(params)
      .then((res: any) => {
        if (res.data.data.has_filled_intake_form == true) {
          console.log('Already ');
          showToast('Success', 'Already filled intake form', true);
          navigation.navigate('FavoriteCouponDispensory', {
            qrCode: list[0].qr_code,
            dispensary_id: list[0].id,
            lat: list[0].lat,
            lon: list[0].lon,
            dispensaryName: list[0].name,
          });
        } else {
          navigation.navigate('IntakeForm', {
            item: list[0],
            qr_code: list[0].qr_code,
            lat: list[0].lat,
            lon: list[0].lon,
            name: list[0].name,
            dispensaryName: list[0].name,
          });
        }
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };

  const onPressBtn = () => {
    fetchData();
  };
  const onPressStore = (item: any) => {
    // navigate('IntakeForm',{item:item});
  };

  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title="Dispensary" />
      <View style={{padding: RF(20)}}>
        {list.map((item: any, index: any) => (
          <Pressable
            style={styles.imgMainView}
            onPress={() => onPressStore(item)}
            key={index}>
            <View style={{width: '100%', borderRadius: RF(10)}}>
              <FastImage
                source={{uri: item?.image_path}}
                style={styles.sectionImg}
              />
            </View>
            <View style={GST.mt15}>
              <CustomText bold size={16} color={black}>
                {item?.name}
              </CustomText>
              <CustomText semiBold size={14} color={gray} style={GST.mt5}>
                {item?.address}
              </CustomText>
              <View style={[GST.flexDir1, GST.AI, GST.mt1]}>
                <Rating
                  type="custom"
                  ratingColor={primary}
                  tintColor={white}
                  ratingCount={5}
                  startingValue={Number(item?.avg_reviews).toFixed(1)}
                  imageSize={15}
                  readonly
                  ratingBackgroundColor={dullLightGrey}
                />
                <CustomText bold style={GST.mLeft5}>
                  {Number(item?.avg_reviews).toFixed(1)}
                </CustomText>
                <CustomText semiBold style={GST.mLeft5}>
                  ({item?.total_reviews})
                </CustomText>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={styles.btnView}>
        <Button text="Yes Check-In" onPress={onPressBtn} />
      </View>
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default Dispensary;
