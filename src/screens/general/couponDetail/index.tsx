import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';
import {THEME, RF} from '../../../shared/exporter';
import {styles} from './styles';
import {
  View,
  SafeAreaView,
  Pressable,
  Platform,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import LinearGradient from 'react-native-linear-gradient';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import moment from 'moment';


const {gray, primary, dimGray, dimGreen, white} = THEME.colors;

const CouponDetail = ({route}: any) => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [card, setCard] = useState({});
  const {currentLocation} = useSelector((state: any) => state.root.main);
  const [availableInStoresCount, setAvailableInStoresCount] = useState();
  const [availableInDispans, setavailableInDispans] = useState([]);
  const [id, setId] = useState();
  const [coupon, setCoupon] = useState([]);
  const [categories, setCategories] = useState([]);

  //   let qrCode = route?.params?.qrCode
  //   let dispensary_id = route?.params?.dispensary_id
  //   let lat = route?.params?.lat
  //   let lon = route?.params?.lon
  let item = route?.params?.item;

  //   useEffect(()=>{
  //     setCard(item)
  //   },[])

  //   const fetchRedeemCoupons = () => {
  //     console.log('id....',item.id);
  //     setloading(true);
  //     const params = {
  //       dispensary_id: dispensary_id,
  //       lat: lat,
  //       lon: lon,
  //       qr_code: qrCode,
  //       coupon_id: item.id,
  //     };
  //     console.log('params',params);
  //     getRedeemCoupens(params)
  //       .then((res: any) => {
  //         console.log('response........',res.data);
  //         if(res.data.status == false){
  //           showToast(
  //             'Request Failed',
  //             res.data?.message,
  //             false,
  //           );
  //         }
  //         setCoupon(item)
  //         // dispatch(setCoupons(res.data.data));
  //         // setAllCoupons(res.data.data);
  //       })
  //       .catch((err: any) => {
  //         showToast(
  //           'Request Failed',
  //           err?.response.data?.message,
  //           false,
  //         );
  //       })
  //       .finally(() => setloading(false));
  //   };

  useEffect(() => {
    // fetchRedeemCoupons();
  }, []);

  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title="Coupons" />
      <SafeAreaView style={styles.mainContainer}>
        <Pressable style={styles.imgView}>
          {item && (
            <ImageBackground
              style={styles.offerImage}
              source={{uri: item?.image_path}}
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
                  source={{uri: item?.logo_path}}
                  resizeMode="cover"
                  style={styles.maskImg}
                />
                {item && (
                  <>
                    <View style={styles.outerInnerRec}>
                      <View style={styles.innerRecStyle}>
                        <CustomText size={RF(30)} color={primary} bold>
                          {item?.value}%
                        </CustomText>
                        <CustomText size={RF(8)} bold color={primary}>
                          {item?.name}
                        </CustomText>
                      </View>
                    </View>

                    <CustomText color={white} semiBold size={RF(14)}>
                      Expiration Date:{moment(item?.expiry_date).format('DD MMM YYYY')}
                    </CustomText>

                    <View
                      style={{
                        justifyContent: 'flex-end',
                        top: RF(60),
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        {/* {cardData?.categories &&
                cardData?.categories.map((item: any) => {
                  return (
                    <View
                      style={{
                        backgroundColor: "#000",
                        marginHorizontal: RF(3),
                        paddingHorizontal: RF(10),
                        paddingVertical: RF(3),
                        borderRadius: RF(10),
                        marginBottom: RF(8),
                        marginTop:RF(20)
                      }}
                    >
                      <CustomText color="#fff" size={10}>
                        {item?.name}
                      </CustomText>
                    </View>
                  );
                })} */}
                      </View>
                      <CustomText
                        color="#fff"
                        size={10}
                        style={{marginTop: RF(10)}}>
                        {item?.website}
                      </CustomText>
                    </View>
                  </>
                )}
              </LinearGradient>
            </ImageBackground>
          )}
        </Pressable>
      </SafeAreaView>
      {/* <View style={styles.btnView}>
      <Button text='Redeem Coupens'onPress={fetchRedeemCoupons}/>
      </View> */}
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default CouponDetail;
