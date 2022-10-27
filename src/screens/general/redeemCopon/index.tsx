import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';
import {close, heart, offerImage1} from '../../../assets/images';
import {
  THEME,
  RF,
  showToast,
  getRedeemCoupens,
  navigationRef,
} from '../../../shared/exporter';
import {styles} from './styles';
import {
  View,
  SafeAreaView,
  Pressable,
  Platform,
  ImageBackground,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import CusActionSheet from '../../../shared/components/cusActionSheet';
import {setCoupons} from '../../../shared/redux/reducers/mainReducer';
import {useDispatch, useSelector} from 'react-redux';
import {cardData} from '../../../shared/components/customData';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import LinearGradient from 'react-native-linear-gradient';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import Button from '../../../shared/components/button';
import moment from 'moment';

const {gray, primary, dimGray, dimGreen, white} = THEME.colors;

const RedeemCoupon = ({route, navigation}: any) => {
  const [loading, setloading] = useState(false);
  const [coupon, setCoupon] = useState<any>([]);

  let qrCode = route?.params?.qrCode;
  let dispensary_id = route?.params?.dispensary_id;
  let lat = route?.params?.lat;
  let lon = route?.params?.lon;
  let item = route?.params?.item;

  useEffect(() => {
    setCoupon(item);
  }, []);
  const fetchRedeemCoupons = () => {
    setloading(true);
    const params = {
      dispensary_id: dispensary_id,
      lat: lat,
      lon: lon,
      qr_code: qrCode,
      coupon_id: item.id,
    };
    getRedeemCoupens(params)
      .then((res: any) => {
        if (res.data.status == false) {
          showToast('Request Failed', res.data?.message, false);
        } else {
          showToast('Success', 'Successfully Redeem Coupon', true);
          navigation.navigate('SuccessRedeem');
        }
        navigationRef.navigate('Home');
      })
      .catch((err: any) => {
        showToast(
          'Request Failed',
          err?.response.data?.message?.join(', '),
          false,
        );
      })
      .finally(() => setloading(false));
  };
  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title="Coupons" />
      <SafeAreaView style={styles.mainContainer}>
        <Pressable style={styles.imgView}>
          {coupon && (
            <ImageBackground
              style={styles.offerImage}
              source={{uri: coupon?.image_path}}
              imageStyle={styles.bR}>
              <LinearGradient
                colors={[
                  'rgba(0, 0, 0, 0.4)',
                  'rgba(0, 0, 0, 0.4)',
                  'rgba(0, 0, 0, 0.4)',
                  'rgba(0, 0, 0, 0.4)',
                  'rgba(0, 0, 0, 0.4)',
                ]}
                style={[styles.offerImage, {position: 'absolute'}]}>
                <FastImage
                  source={{uri: coupon?.logo_path}}
                  resizeMode="cover"
                  style={styles.maskImg}
                />
                {coupon && (
                  <>
                    <View style={styles.outerInnerRec}>
                      <View style={styles.innerRecStyle}>
                        <CustomText size={RF(30)} color={primary} bold>
                          {coupon?.value}
                        </CustomText>
                        <CustomText size={RF(8)} bold color={primary}>
                          {coupon?.name}
                        </CustomText>
                      </View>
                    </View>

                    <CustomText color={white} semiBold size={RF(14)}>
                    Expiration Date:{moment(coupon?.expiry_date).format('DD MMM YYYY')}
                    </CustomText>

                    <View
                      style={{
                        justifyContent: 'flex-end',
                        top: RF(60),
                        alignItems: 'center',
                      }}>
                      <CustomText
                        color="#fff"
                        size={10}
                        style={{marginTop: RF(10)}}>
                        {coupon?.website}
                      </CustomText>
                    </View>
                  </>
                )}
              </LinearGradient>
            </ImageBackground>
          )}
        </Pressable>
      </SafeAreaView>
      <View style={styles.btnView}>
        <Button text="Redeem Coupens" onPress={fetchRedeemCoupons} />
      </View>
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default RedeemCoupon;
