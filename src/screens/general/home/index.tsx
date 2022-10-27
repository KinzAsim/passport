import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';
import {oilBottle, organicBG} from '../../../assets/images';
import styles from './styles';
import {
  getCategoryProducts,
  getNearbyDispensaries,
  getCouponsListing,
  GST,
  showToast,
  THEME,
  RF,
} from '../../../shared/exporter';
import SearchBar from '../../../shared/components/searchBar/index';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {ScrollView} from 'react-native-gesture-handler';
import Wrapper from '../../../shared/components/wrapper';
import HomeHeader from '../../../shared/components/homeHeader';
import DispensoriesSection from '../../../shared/components/customDispensorySection';
import CustomOffers from '../../../shared/components/customOffersSection';
import Categories from '../../../shared/components/customCategories';
import {cardData} from '../../../shared/components/customData';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {
  setNearbyDispensories,
  setFeaturedDispensories,
  setCategory,
  setCoupons,
  setCurrentLocation,
  setCurrentAddress,
} from '../../../shared/redux/reducers/mainReducer';
import {useDispatch, useSelector} from 'react-redux';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
const {white, primaryDark} = THEME.colors;

const Home = ({navigation}: any) => {
  const {height,width}=useWindowDimensions();
  const [coordinates, setCoordinates] = useState([]);
  const dispatch = useDispatch();
  const {currentLocation} = useSelector((state: any) => state.root.main);
  const [loading, setloading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showCrossIcon, setShowCrossIcon] = useState(false);
  const {
    nearbyDispensories,
    featuredDispensories,
    category,
    coupons,
    currentAddress,
  } = useSelector((state: any) => state.root.main);
  const getCurrentLocation = async () => {
    if (Platform.OS === 'ios') {
      let permiss = await Geolocation.requestAuthorization('whenInUse');
      if (permiss == 'granted') {
        getCurrentLocationApi();
      } else {
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Device current location permission',
            message: 'Allow app to get your current location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocationApi();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  React.useEffect(() => {
    searchText === '' && fetchAll();
  }, [searchText]);
  const getCurrentLocationApi = () => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        Geocoder.from({
          lat: latitude,
          lng: longitude,
        })
          .then(json => {
            dispatch(
              setCurrentAddress({
                address: json.results[0].formatted_address,
              }),
            );
          })
          .catch(error => console.warn(error));
        let arr = [];
        arr.push(longitude, latitude);
        setCoordinates(arr as any);
        dispatch(
          setCurrentLocation({
            lat: latitude,
            lon: longitude,
          }),
        );
      },
      err => console.log(err),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchProducts = async () => {
    setloading(true);
    const params = {
      page: 1,
      radius: 10000,
      lat: coordinates[1] || currentLocation?.lat,
      lon: coordinates[0] || currentLocation?.lon,
      check_near_by: 0,
      search: searchText !== '' ? searchText : '',
    };
    await getCategoryProducts(params)
      .then((res: any) => {
        let data = res.data.data;
        dispatch(setCategory(data));
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response?.data?.message, false);
      })
      .finally(() => setloading(false));
  };

  const fetchDispensories = async (flag: String) => {
    setloading(true);
    let lat = coordinates[1] || currentLocation?.lat;
    let lon = coordinates[0] || currentLocation?.lon;
    const params = {
      radius: 10000,
      lat: lat,
      lon: lon,
      is_featured: flag == 'nearby' ? 0 : flag == 'featured' && 1,
      per_page: 10,
      search: searchText !== '' ? searchText : '',
      page: 0,
    };
    await getNearbyDispensaries(params)
      .then((res: any) => {
        if (flag == 'nearby') {
          dispatch(setNearbyDispensories(res.data.data));
        } else if (flag == 'featured') {
          dispatch(setFeaturedDispensories(res.data.data));
        }
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };

  const fetchOffers = async () => {
    setloading(true);
    let lat = coordinates[1] || currentLocation?.lat;
    let lon = coordinates[0] || currentLocation?.lon;
    const params = {
      radius: 10000,
      lat: lat,
      lon: lon,
      is_paginate_able: 0,
      per_page: 10,
      page: 0,
    };
    await getCouponsListing(params)
      .then((res: any) => {
        dispatch(setCoupons(res.data.data));
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchAll();
    });
    return willFocusSubscription;
  }, [coordinates]);

  const onRefresh = () => {
    fetchAll();
  };

  const fetchAll = () => {
    setloading(true);
    fetchOffers();
    fetchProducts();
    fetchDispensories('nearby');
    fetchDispensories('featured');
  };
  const onHandleExplore = () => {};
  const onOpenNotification = () => {
    navigation.navigate('Notification');
  };
  const onOpenFavourites = () => {
    navigation.navigate('Favorites');
  };
  const onOpenOffersList = (item: any) => {
    navigation.navigate('DetailSingleCoupon', {item: item});
  };
  const onOpenSeeAll = (type: any) => {
    if (type === 'nearby') {
      navigation.navigate('SeeAllProducts', {
        title: 'Nearby Dispensories',
        lon: coordinates[0],
        lat: coordinates[1],
        flag: 'nearby',
      });
    } else if (type === 'featured') {
      navigation.navigate('SeeAllProducts', {
        title: 'Featured Dispensories',
        lon: coordinates[0],
        lat: coordinates[1],
        flag: 'featured',
      });
    } else if (type === 'categories') {
      navigation.navigate('SeeAllProducts', {
        title: 'Categorires',
        flag: 'category',
        lon: coordinates[0],
        lat: coordinates[1],
      });
    } else if (type === 'offers') {
      navigation.navigate('AllCoupons', {
        lon: coordinates[0],
        lat: coordinates[1],
        flag: 'homeoffers',
      });
    }
  };
  const onOpenMap = () => {
    fetchAll();
  };
  const clearFieldHandler = async () => {
    setSearchText('');
    setShowCrossIcon(false);
  };
  let cReverse = [...coupons];
  cReverse.reverse();

  return (
    <Wrapper style={GST.PH}>
      <View style={styles.headerView}>
        <HomeHeader
          liveLocation={currentAddress.address}
          rewards={650}
          onOpenNotification={onOpenNotification}
          onPressFavorite={onOpenFavourites}
        />
        <SearchBar
          onPress={onOpenMap}
          onChangeText={(text: string) => setSearchText(text)}
          rightIcon={showCrossIcon}
          onRightPress={clearFieldHandler}
          value={searchText}
          text={'Search for products, Dispensary or stores'}
          onPressIn={() => setShowCrossIcon(true)}
          returnType={'search'}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {searchText === '' && (
          <>
            <CustomOffers
              data={cReverse}
              type={'home'}
              onOpenList={onOpenOffersList}
              title={'Offers'}
              onSeeAll={() => onOpenSeeAll('offers')}
            />

            <View style={styles.cardView}>
              <SwiperFlatList
                autoplay={false}
                index={0}
                paginationDefaultColor={primaryDark}
                paginationActiveColor={white}
                showPagination
                paginationStyleItemInactive={styles.cardItemViewOut}
                paginationStyleItemActive={styles.cardItemViewIn}
                data={cardData}
                paginationStyle={styles.pagination}
                renderItem={({item}) => (
                  <Explore
                    card={organicBG}
                    itemImg={oilBottle}
                    title={item.title}
                    description={'Finest quality goods, always fresh'}
                    explore={onHandleExplore}
                  />
                )}
              />
            </View>
          </>
        )}

        <DispensoriesSection
          onSeeAll={() => onOpenSeeAll('nearby')}
          data={nearbyDispensories}
          headingTitle={'Nearby Dispensaries'}
          type={'nearby'}
          navigation={navigation}
          showSeeAll={nearbyDispensories.length < 0 ? false : true}
        />
        <Fragment>
          <Categories
            data={category}
            onOpenList={() => onOpenSeeAll('categories')}
            navigation={navigation}
            type={'category'}
            coordinates={coordinates}
          />
        </Fragment>
        <DispensoriesSection
          showSeeAll
          onSeeAll={() => onOpenSeeAll('featured')}
          data={featuredDispensories}
          headingTitle={'Featured Dispensaries'}
          navigation={navigation}
          type={'featured'}
        />
      </ScrollView>
      <LoadingOverlay loading={loading} />
    </Wrapper>
  );
};

const Explore = ({
  card,
  itemImg,
  title,
  description,
  explore,
}: {
  explore: () => void;
  card: any;
  title: any;
  itemImg: any;
  description: any;
}) => {
  return (
    <ImageBackground style={styles.imgContainer} source={card}>
      <View style={{flex: 1, width: '100%', flexDirection: 'row'}}>
        <View style={{width: '65%', paddingLeft: RF(10)}}>
          <CustomText
            size={30}
            color={white}
            numberOfLines={2}
            style={styles.customText}>
            {title}
          </CustomText>
          <CustomText color={white} size={13} numberOfLines={2}>
            {description}
          </CustomText>
        </View>
        <FastImage source={itemImg} style={styles.bImg} />
      </View>
    </ImageBackground>
  );
};

export default Home;
