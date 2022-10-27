import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  FlatList,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import CustomText from '../../../shared/components/customText';
import Wrapper from '../../../shared/components/wrapper';
import {
  getFavoriteCoupons,
  GST,
  RF,
  showToast,
  THEME,
} from '../../../shared/exporter';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {FlatGrid} from 'react-native-super-grid';
import {useDispatch, useSelector} from 'react-redux';
import {
  setFavouriteCoupons,
  setFavouriteProdcts,
} from '../../../shared/redux/reducers/mainReducer';
import EmptyList from '../../../shared/components/emptyList';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import LinearGradient from 'react-native-linear-gradient';
import {Rating} from 'react-native-ratings';
import moment from 'moment';

const {primary, gray, white, dimGray, black, dullLightGrey} = THEME.colors;

const Favorites = ({navigation}: any) => {
  const [selectedMode1, setSelectedMode1] = useState(true);
  const [selectedMode2, setSelectedMode2] = useState(false);
  const {favouriteCoupons} = useSelector((state: any) => state.root.main);
  const {favouriteProdcts} = useSelector((state: any) => state.root.main);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const onClickCoupons = () => {
    setSelectedMode1(true);
    setSelectedMode2(false);
    fetchCoupons();
  };
  const fetchCoupons = () => {
    setloading(true);
    let params = {
      type: 'coupon',
    };
    getFavoriteCoupons(params)
      .then((res: any) => {
        console.log('HWHWHW', res.data.data);
        dispatch(setFavouriteCoupons(res.data.data));
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  const fetchProducts = () => {
    setloading(true);
    const params = {
      type: 'product',
    };
    getFavoriteCoupons(params)
      .then((res: any) => {
        dispatch(setFavouriteProdcts(res.data.data));
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  const onClickProducts = () => {
    setSelectedMode2(true);
    setSelectedMode1(false);
    fetchProducts();
  };
  const listEmpty = (type: any) => {
    return (
      <View style={[GST.AIC, GST.flex]}>
        <EmptyList
          title={type === 'coupons' ? 'No coupons yet.' : 'No products yet.'}
          description={
            type === 'coupons'
              ? 'You didnot favorite any coupon.'
              : 'You didnot favorite any product.'
          }
          titleStyles={{fontSize: RF(16), fontWeight: 'bold', color: gray}}
          desStyles={{
            color: gray,
            fontSize: RF(12),
          }}
        />
      </View>
    );
  };
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchCoupons();
      fetchProducts();
    });
    return willFocusSubscription;
  }, []);
  const onRefresh = (type: any) => {
    if (type === 'coupon') {
      fetchCoupons();
    } else if (type === 'product') {
      fetchProducts();
    }
  };
  const onPressCoupon = (item: any) => {
    navigation.navigate('DetailSingleCoupon', {item: item});
  };
  const onPressProduct = (item: any) => {
    navigation.navigate('ProductDetails', {detail: item});
  };
  return (
    <>
      <HeaderWrapper title="Favorites" showTitle showBtnLeft />
      <Wrapper style={[GST.PH, styles.wrapperView]}>
        <View style={styles.headerView}>
          <Pressable style={styles.textView} onPress={onClickCoupons}>
            <CustomText
              semiBold
              color={selectedMode1 ? primary : gray}
              size={16}>
              COUPONS
            </CustomText>
            <View
              style={[
                styles.divider,
                {backgroundColor: selectedMode1 ? primary : gray},
              ]}
            />
          </Pressable>
          <Pressable style={styles.textView} onPress={onClickProducts}>
            <CustomText
              semiBold
              color={selectedMode2 ? primary : gray}
              size={16}>
              PRODUCTS
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
            data={favouriteCoupons}
            emptyList={() => listEmpty('coupons')}
            onRefresh={() => onRefresh('coupon')}
            onPressCoupon={onPressCoupon}
          />
        ) : (
          <Products
            data={favouriteProdcts}
            emptyList={() => listEmpty('product')}
            onRefresh={() => onRefresh('product')}
            onPressProduct={onPressProduct}
          />
        )}
        <LoadingOverlay loading={loading} />
      </Wrapper>
    </>
  );
};

export const Coupons = ({
  data,
  emptyList,
  onRefresh,
  onPressCoupon,
}: {
  data: any;
  emptyList: any;
  onRefresh: () => void;
  onPressCoupon: any;
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
                    style={{paddingBottom: RF(25)}}>
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

                  <CustomText style={{paddingBottom:RF(10)}} color="#fff" size={7}>
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

export const Products = ({
  data,
  emptyList,
  onRefresh,
  onPressProduct,
}: {
  data: any;
  emptyList: any;
  onRefresh: () => void;
  onPressProduct: any;
}) => {
  const [defaultRating, setdefaultRating] = useState(2);
  const setRating = (item: any) => {
    setdefaultRating(item);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        // pagingEnabled
        keyExtractor={(_: any, index) => String(index)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyList}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        renderItem={({item, index}: any) => {
          return (
            <>
              <Pressable
                onPress={() => onPressProduct(item)}
                style={styles.mainView}>
                <FastImage source={{uri: item.image_path}} style={styles.img} />
                <View style={styles.innerView}>
                  <CustomText bold size={13}>
                    {item.name}
                  </CustomText>
                  <View style={{width: '80%'}}>
                    <CustomText size={11} color={gray} numberOfLines={2}>
                      {item.description}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      paddingTop: RF(5),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
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
                    <CustomText
                      style={GST.mLeft5}
                      size={11}
                      color={black}
                      numberOfLines={2}>
                      {Number(item?.avg_reviews).toFixed(1)}{' '}
                      <CustomText size={11} color={black}>
                        ({item?.total_reviews})
                      </CustomText>
                    </CustomText>
                  </View>
                </View>
              </Pressable>
              <View style={styles.dividerView} />
            </>
          );
        }}
      />
    </View>
  );
};

export default Favorites;
