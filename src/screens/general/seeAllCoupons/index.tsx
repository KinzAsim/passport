import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import CustomText from '../../../shared/components/customText';
import Wrapper from '../../../shared/components/wrapper';
import {
  getCouponsListing,
  getFavoriteCoupons,
  GST,
  RF,
  showToast,
  THEME,
} from '../../../shared/exporter';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {FlatGrid} from 'react-native-super-grid';
import {useDispatch, useSelector} from 'react-redux';
import EmptyList from '../../../shared/components/emptyList';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const {primary, gray, white, dimGray} = THEME.colors;

const AllCoupons = ({route, navigation}: any) => {
  const {coupons} = useSelector((state: any) => state.root.main);

  const [loading, setloading] = useState(false);
  const [allCoupons, setAllCoupons] = useState([]);

  useEffect(() => {
    if (route?.params?.flag === 'homeoffers') {
      setAllCoupons(coupons);
  } else if (route?.params?.flag === 'offers') {
      setAllCoupons(route?.params?.category);
    }
  });
  const listEmpty = (type: any) => {
    return (
      <View style={[GST.AIC, GST.flex]}>
        <EmptyList
          title={'No coupons yet.'}
          description={'You didnot favorite any coupon.'}
          titleStyles={{fontSize: RF(16), fontWeight: 'bold', color: gray}}
          desStyles={{
            color: gray,
            fontSize: RF(12),
          }}
        />
      </View>
    );
  };
  const onOpenSingleCoupon = (item: any) => {
    navigation.navigate('DetailSingleCoupon', {item: item});
  };
  let cReverse = [...allCoupons];
  cReverse.reverse();
  return (
    <>
      <HeaderWrapper title="All Coupons" showTitle showBtnLeft />
      <Wrapper style={[GST.PH, styles.wrapperView]}>
        <Coupons
          data={cReverse}
          emptyList={() => listEmpty('coupons')}
          onOpenList={onOpenSingleCoupon}
        />
      </Wrapper>
    </>
  );
};

export const Coupons = ({
  data,
  emptyList,
  onRefresh,
  onOpenList,
}: {
  data: any;
  emptyList: any;
  onRefresh?: () => void;
  onOpenList?: any;
}) => {
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
            <Pressable onPress={() => onOpenList(item)}>
              <ImageBackground
                source={{uri: item.image_path}}
                // resizeMode="contain"
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
                    source={{uri: item?.logo_path}}
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
                      {item?.name}
                      </CustomText>
                    </View>
                  </View>
                  <CustomText
                    color={white}
                    semiBold
                    size={9}
                    style={{paddingBottom: RF(30)}}>
                      Expiration Date:{moment(item?.expiry_date).format('DD MMM YYYY')}
                  </CustomText>
                  {/* <View style={styles.cView}>
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
                  </View> */}
                  <CustomText style={{paddingBottom:RF(15)}} color="#fff" size={7}>
                    {item?.website}
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

export default AllCoupons;
