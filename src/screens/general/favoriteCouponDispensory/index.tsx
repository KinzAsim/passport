import React, {useEffect, useState} from 'react';
import {View, Pressable, ImageBackground, RefreshControl} from 'react-native';
import CustomText from '../../../shared/components/customText';
import Wrapper from '../../../shared/components/wrapper';
import {
  getDispensaryCoupons,
  GST,
  RF,
  showToast,
  THEME,
} from '../../../shared/exporter';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {FlatGrid} from 'react-native-super-grid';
import EmptyList from '../../../shared/components/emptyList';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const {primary, gray, white, dimGray} = THEME.colors;

const DispensaryCoupons = ({route, navigation}: any) => {
  const [selectedMode1, setSelectedMode1] = useState(true);
  const [selectedMode2, setSelectedMode2] = useState(false);
  const [loading, setloading] = useState(false);
  const [favoriteCoupons, setfavoriteCoupons] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [type, setType] = useState('allCoupons');

  let qrCode = route?.params?.qrCode;
  let dispensary_id = route?.params?.dispensary_id;
  let lat = route?.params?.lat;
  let lon = route?.params?.lon;
  let dispensaryName = route?.params?.dispensaryName;
  console.log('nn...', dispensary_id);

  const onOpenDetail = () => {
    // navigation.navigate('Offers',
    // // {allCoupons:allCoupons}
    // );
  };
  useEffect(() => {
    console.log('MEE CHAL RAHA HON');

    // setloading(true);
    fetchCoupons();
  }, [type]);
  const onClickCoupons = (type: any) => {
    if (type === 'all') {
      setSelectedMode1(true);
      setSelectedMode2(false);
      setType('allCoupons');
      fetchCoupons();
    } else if (type === 'fav') {
      setSelectedMode2(true);
      setSelectedMode1(false);
      setType('favoriteCoupons');
      fetchCoupons();
    }
  };

  const fetchCoupons = () => {
    setloading(true);
    let params = {
      dispensary_id: route?.params?.dispensary_id,
      is_favourite:
        type == 'allCoupons' ? 0 : type == 'favoriteCoupons' ? 1 : null,
    };
    console.log('PP', params);

    getDispensaryCoupons(params)
      .then((res: any) => {
        console.log('ressss', res?.data?.data);
        if (type === 'allCoupons') {
          setAllCoupons(res.data.data);
        } else if (type === 'favoriteCoupons') {
          setfavoriteCoupons(res?.data?.data);
        }
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
    setloading(false);
  };

  const listEmpty = (type: any) => {
    return (
      <View style={[GST.AIC, GST.flex]}>
        <EmptyList
          title={
            type === 'allCoupons'
              ? 'No coupons yet.'
              : 'No Favorite Coupons yet.'
          }
          description={
            type === 'allCoupons'
              ? 'Dispensary do not have any coupon.'
              : 'Dispensary didnot favorite any coupon.'
          }
          titleStyles={styles.title}
          desStyles={styles.des}
        />
      </View>
    );
  };

  const onRefresh = (type: any) => {
    if (type === 'allCoupons') {
      fetchCoupons();
    } else if (type === 'favoriteCoupons') {
      fetchCoupons();
    }
  };
  const navigateToRedeem = (item: any) => {
    navigation.navigate('RedeemCoupon', {
      item,
      qrCode,
      dispensary_id,
      lat,
      lon,
    });
  };

  return (
    <>
      <HeaderWrapper
        title={`${dispensaryName} dispensary`}
        showTitle
        showBtnLeft
        navigationFalse={false}
      />
      <Wrapper style={[GST.PH, styles.wrapperView]}>
        <View style={styles.headerView}>
          <Pressable
            style={styles.textView}
            onPress={() => onClickCoupons('all')}>
            <CustomText
              semiBold
              color={selectedMode1 ? primary : gray}
              size={14}>
              ALL COUPONS
            </CustomText>
            <View
              style={[
                styles.divider,
                {backgroundColor: selectedMode1 ? primary : gray},
              ]}
            />
          </Pressable>
          <Pressable
            style={styles.textView}
            onPress={() => onClickCoupons('fav')}>
            <CustomText
              semiBold
              color={selectedMode2 ? primary : gray}
              size={14}>
              FAVORITE COUPONS
            </CustomText>
            <View
              style={[
                styles.divider1,
                {backgroundColor: selectedMode2 ? primary : gray},
              ]}
            />
          </Pressable>
        </View>
        {selectedMode1 ? (
          <Coupons
            data={allCoupons}
            onOpenList={onOpenDetail}
            emptyList={() => listEmpty('allCoupons')}
            onRefresh={() => onRefresh('allCoupons')}
            onPressCoupon={navigateToRedeem}
          />
        ) : (
          <Coupons
            data={favoriteCoupons}
            onOpenList={onOpenDetail}
            emptyList={() => listEmpty('favoriteCoupons')}
            onRefresh={() => onRefresh('favoriteCoupons')}
            onPressCoupon={navigateToRedeem}
          />
        )}
        <LoadingOverlay loading={loading} />
      </Wrapper>
    </>
  );
};

const Coupons = ({
  data,
  onOpenList,
  emptyList,
  img,
  onRefresh,
  onPressCoupon,
}: {
  data?: any;
  onOpenList?: () => void;
  emptyList?: any;
  img?: any;
  onRefresh?: () => void;
  onPressCoupon: (item: any) => void;
}) => {
  const [categories, setCategories] = useState([]);

  return (
    <View style={styles.container}>
      <FlatGrid
        spacing={10}
        itemDimension={130}
        data={data}
        ListEmptyComponent={emptyList}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        itemContainerStyle={{backgroundColor: dimGray}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        renderItem={({item, index}: any) => {
          const cat = item?.categories?.slice(0, 3);
          return (
            <Pressable onPress={() => onPressCoupon(item)}>
              <ImageBackground
                source={{uri: item.image_path}}
                style={styles.bgImg}>
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                  ]}
                  style={GST.LG}></LinearGradient>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    padding: RF(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{height: '27%'}}></View>
                  <FastImage
                    source={{uri: item.logo_path}}
                    resizeMode="cover"
                    style={styles.maskImg}
                  />
                  <View style={styles.outerInnerRec}>
                    <View style={styles.innerRecStyle}>
                      <CustomText
                        size={15}
                        color={primary}
                        bold
                        numberOfLines={2}
                        style={{marginBottom: RF(1)}}>
                        {item?.value} 
                      </CustomText>
                      <CustomText size={6} bold color={primary}>
                        Purple Goats: 30.61% THC
                      </CustomText>
                    </View>
                  </View>
                  <CustomText
                    color={white}
                    semiBold
                    size={9}
                    style={{marginBottom: RF(6)}}>
                      Expiration Date:{moment(item?.expiry_date).format('DD MMM YYYY')}
                  </CustomText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {cat &&
                      cat.map((item: any, index: any) => {
                        return (
                          <View style={styles.nameView}>
                            <CustomText color="#fff" size={7}>
                              {item?.name}
                            </CustomText>
                          </View>
                        );
                      })}
                  </View>

                  <CustomText color="#fff" size={7}>
                    {item.website}
                  </CustomText>
                </View>
              </ImageBackground>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default DispensaryCoupons;
