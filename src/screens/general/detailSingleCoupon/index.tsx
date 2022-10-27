import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';
import {
  GST,
  THEME,
  RF,
  showToast,
  addOrRemoveFavourites,
  getCoupons_Dispensory,
} from '../../../shared/exporter';
import {styles} from './styles';
import {
  View,
  Platform,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CusActionSheet from '../../../shared/components/cusActionSheet';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import LinearGradient from 'react-native-linear-gradient';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import moment from 'moment';
import Like from 'react-native-vector-icons/AntDesign';

const {gray, primary, white, dimGreen} = THEME.colors;

const DetailSingleCoupon = ({route}: any) => {
  let item = route?.params?.item;
  const data = [];
  data.push(item);
  const ref = useRef<any>();
  const [loading, setloading] = useState(false);
  const [like, setLike] = useState(item?.is_favourite);
  const [availableInStoresCount, setAvailableInStoresCount] = useState(
    item?.available_in_dispensaries,
  );
  const [availableInDispans, setavailableInDispans] = useState([]);
  const [id, setId] = useState(item?.id);
  useEffect(() => {
    setTimeout(() => {
      fetchAvailableDisp();
    }, 1000);
  }, []);
  const onTouch = () => {
    setloading(true);
    setLike(!like);
    let params = {
      type_id: id,
      type: 'coupon',
    };
    addOrRemoveFavourites(params)
      .then((res: any) => {
        let data = res.data;
        console.log('DATA', data);
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  const fetchAvailableDisp = () => {
    setloading(true);
    const params = {
      coupon_id: id,
    };
    getCoupons_Dispensory(params)
      .then((res: any) => {
        setavailableInDispans(res.data.data);
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };

  return (
    <View style={styles.mainView}>
      <HeaderWrapper showBtnLeft showTitle title="Coupon" />
      <Section />
      <TouchableOpacity
        onPress={onTouch}
        style={{
          zIndex: 1,
          top: RF(20),
          left: Platform.OS === 'ios' ? RF(285) : RF(300),
          width: RF(70),
        }}>
        <Like name="heart" size={RF(40)} color={like ? primary : dimGreen} />
      </TouchableOpacity>
      <FlatList
        nestedScrollEnabled
        data={data}
        keyExtractor={(_: any, index) => String(index)}
        renderItem={({item, index}: any) => {
          let cat = [];
          cat = item?.categories?.slice(0, 5);
          return (
            <>
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
                    source={{uri: item.logo_path}}
                    resizeMode="cover"
                    style={styles.maskImg}
                  />
                  <View style={styles.outerInnerRec}>
                    <View style={styles.innerRecStyle}>
                      <CustomText
                        numberOfLines={2}
                        size={17}
                        color={primary}
                        bold
                        style={{marginBottom: RF(5)}}>
                        {item?.value}
                      </CustomText>
                      <CustomText size={7} bold color={primary}>
                        {item?.name}
                      </CustomText>
                    </View>
                  </View>
                  <CustomText
                    color={white}
                    semiBold
                    size={9}
                    style={{zindex: 1, bottom: RF(15)}}>
                    Expiration Date:
                    {moment(item?.expiry_date).format('DD MMM YYYY')}
                  </CustomText>
                  <View style={styles.view}>
                    <View style={GST.flexDir1}>
                      {cat &&
                        cat.map((item: any) => {
                          return (
                            <View style={styles.categoryView}>
                              <CustomText color="#fff" size={6}>
                                {item?.name}
                              </CustomText>
                            </View>
                          );
                        })}
                    </View>
                  </View>
                  <CustomText
                    style={{zindex: 1, bottom: RF(5)}}
                    color="#fff"
                    size={7}>
                    {item?.website}
                  </CustomText>
                </LinearGradient>
              </ImageBackground>
            </>
          );
        }}
      />
      <View
        style={{position: 'absolute', bottom: Platform.OS == 'ios' ? 35 : 1}}>
        <BottomSection
          stores={availableInStoresCount}
          onPress={() => ref?.current?.show()}
        />
      </View>
      <CusActionSheet Actref={ref} data={availableInDispans} />
      <LoadingOverlay loading={loading} />
    </View>
  );
};

const Section = () => {
  return (
    <>
      <CustomText style={styles.textTop} size={12} color={gray}>
        Press heart to favourite Coupon
      </CustomText>
    </>
  );
};

const BottomSection = ({
  stores,
  onPress,
}: {
  onPress: () => void;
  stores: any;
}) => {
  return (
    <>
      <View style={styles.text}>
        <CustomText style={GST.pb2} bold size={14}>
          Available in:{'  '}
          <CustomText onPress={onPress} bold size={14} color={primary}>
            {stores > 0 ? stores : 0} {stores > 1 ? 'Stores' : 'Store'}
          </CustomText>
        </CustomText>
        <View style={GST.mt1}>
          <CustomText style={GST.pb35} color={gray}>
            Click to view stores location
          </CustomText>
        </View>
      </View>
    </>
  );
};

export default DetailSingleCoupon;
