import React, {useEffect, useState} from 'react';
import {View, FlatList, Pressable} from 'react-native';
import CustomText from '../../../shared/components/customText';
import {
  getCategoryProducts,
  getNearbyDispensaries,
  getCouponsListing,
  GST,
  RF,
  showToast,
  THEME,
  getProductsListing,
  getDispensaryDetails,
} from '../../../shared/exporter';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {filter} from '../../../assets/images';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {navigate} from '../../../shared/services/nav.service';
import {useDispatch} from 'react-redux';
import EmptyList from '../../../shared/components/emptyList';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import {Rating} from 'react-native-ratings';

const {primary, gray, dullLightGrey, white, black} = THEME.colors;

const SeeAllProducts = ({navigation, route, index}: any) => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [nearByDispensData, setnearByDispensData] = useState([]);
  const [feeaturedDispensData, setfeaturedDispensData] = useState([]);
  const [feeaturedProducts, setFeaturedProducts] = useState([]);
  const [categoryDispensary, setCategoryDispensary] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [category, setCategory] = useState([]);

  let flag = route.params?.flag;
  let data = route?.params?.data;
  let lat = route?.params?.lat || data?.lat;
  let lon = route?.params?.lon || data?.lon;
  let dispensary_id = route?.params?.dispensary_id;
  let categoryData = route?.params?.category;
  let brand = route?.params?.brand;
  let id = route?.params?.id;
  let catagories = route?.params?.catagories;
  let brands=route?.params?.brands;
  
  useEffect(() => {
    if (flag == 'nearby' || flag == 'featured') {
      fetchDispensories();
    } else if (flag == 'offers') {
      fetchOffers();
    } else if (flag == 'category') {
      fetchProducts();
    } else if (flag == 'featuredProducts') {
      fetchFeaturedProducts();
    } else if (flag == 'Category Dispensaries') {
      fetchDispensories();
    } else if (flag === 'brand') {
      setloading(false);
    } else if (flag === 'flowers') {
      setloading(false);
    } else if (flag === 'organic') {
      setloading(false);
    }
  }, []);

  const fetchDispensories = () => {
    setloading(true);
    const params = {
      radius: 10000000,
      lat: lat,
      lon: lon,
      is_featured:
        flag == 'nearby' || flag == 'Category Dispensaries'
          ? 0
          : flag == 'featured' && 1,
      per_page: 10,
      search: 1,
      page: 0,
      category_id: flag == 'Category Dispensaries' ? id : null,
    };
    getNearbyDispensaries(params)
      .then((res: any) => {
        if (flag == 'nearby') {
          setnearByDispensData(res?.data?.data);
        } else if (flag == 'featured') {
          setfeaturedDispensData(res?.data?.data);
        } else if (flag == 'Category Dispensaries') {
          setCategoryDispensary(res?.data?.data);
        }
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  const fetchProducts = () => {
    setloading(true);
    const params = {
      page: 1,
      radius: 100000000000000,
      lat: lat,
      lon: lon,
      check_near_by: 0,
    };

    getCategoryProducts(params)
      .then((res: any) => {
        let data = res?.data?.data;

        dispatch(setCategory(data));
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  const fetchOffers = () => {
    setloading(true);
    const params = {
      radius: 100000000000000,
      lat: lat,
      lon: lon,
      is_paginate_able: 0,
      per_page: 10,
      page: 0,
    };
    getCouponsListing(params)
      .then((res: any) => {
        dispatch(setCoupons(res.data.data));
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  const fetchFeaturedProducts = () => {
    setloading(true);
    const params = {
      dispensary_id: dispensary_id,
      is_featured: 1,
    };
    getProductsListing(params)
      .then((res: any) => {
        let data = res.data.data;
        dispatch(setFeaturedProducts(data));
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  const listEmpty = () => {
    return (
      <View style={[GST.AIC, GST.flex]}>
        <EmptyList
          title={'No dispensary yet.'}
          description={'There is no dispensary availabe.'}
        />
      </View>
    );
  };

  const onOpenItemDetail = (type: any, item: any) => {
    if (type === 'nearby' ||type === 'featured' ) {
      navigation.navigate('StoreDetails', {item: item});
    } else if (type === 'featured') {
      navigation.navigate('ProductDetails', {item: item});
    } else if (type === 'Category Dispensaries') {
      navigation.navigate('StoreDetails', {item: item});
    } else if (type === 'category') {
      navigation.push('SeeAllProducts', {
        id: item?.id,
        flag: 'Category Dispensaries',
        title: 'Category Dispensaries',
        lat: item?.lat,
        lon: item?.lon,
      });
    } else if (type === 'featuredProducts' || 'organic') {
      navigation.navigate('ProductDetails', {detail: item, data: data});
    }else if (type === 'brand') {
      console.log('brands')
    }else{

    }
  };
  const filterHandler = () => {
    navigate('Filters',{catagoryList:catagories,allBrands:brands,data:categoryData});
  };
  return (
    <>
      <HeaderWrapper
        title={route?.params?.title}
        showTitle
        showBtnLeft
        rightBtn={filter}
        showRightText
        onPressFilter={filterHandler}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{padding: RF(10)}}
          key={index}
          data={
            flag == 'nearby'
              ? nearByDispensData
              : flag == 'featured'
              ? feeaturedDispensData
              : flag === 'offers'
              ? coupons
              : flag == 'featuredProducts'
              ? categoryData
              : flag == 'Category Dispensaries'
              ? categoryDispensary
              : flag === 'brand'
              ? brand
              : flag === 'category'
              ? category
              : flag === 'flowers'
              ? categoryData
              : flag === 'organic'
              ? categoryData
              : category
          }
          keyExtractor={(_: any, index) => String(index)}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={listEmpty}
          renderItem={({item, index}: any) => {
            return (
              <Pressable
                style={styles.mainView}
                onPress={() => onOpenItemDetail(flag, item)}>
                <FastImage
                  source={{uri: item?.image_path}}
                  style={styles.img}
                />
                <View style={styles.innerView}>
                  <CustomText bold size={13} numberOfLines={1}>
                    {item?.name}
                  </CustomText>
                  <View style={{width: '80%'}}>
                    <CustomText size={11} color={gray} numberOfLines={2}>
                      {item?.description}
                    </CustomText>
                  </View>
                  {item?.avg_reviews && (
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
                        startingValue={Number(item?.avg_reviews)}
                        imageSize={15}
                        readonly
                        ratingBackgroundColor={dullLightGrey}
                      />
                      <CustomText size={11} color={black} numberOfLines={2}>
                        {Number(item?.avg_reviews).toFixed(1)}{' '}
                        <CustomText size={11} color={black}>
                          ({item?.total_reviews})
                        </CustomText>
                      </CustomText>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default SeeAllProducts;
