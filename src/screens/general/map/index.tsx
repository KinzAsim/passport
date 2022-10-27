import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Wrapper from '../../../shared/components/wrapper';
import HomeHeader from '../../../shared/components/homeHeader/index';
import SearchBar from '../../../shared/components/searchBar';
import {styles} from './styles';
import CustomText from '../../../shared/components/customText';
import {
  getCategoryProducts,
  getNearbyDispensaries,
  GST,
  RF,
  showToast,
  THEME,
} from '../../../shared/exporter';
import {oval, locationIndicator} from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import {getSingleNearbyDispensaries} from '../../../shared/services/CoupensServices';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Rating} from 'react-native-ratings';

const {white, primary, gray, dullLightGrey} = THEME.colors;

const Map = ({navigation, route}: any) => {
  const mapRef: any = useRef(null);
  const [loading, setloading] = useState(false);
  const [show, setShow] = useState(false);
  const [markers, setMarkers] = useState<any>([]);
  const [i, seti] = React.useState<any>(0);
  const [allcategory, setCategory] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const {currentLocation, currentAddress} = useSelector(
    (state: any) => state.root.main,
  );
  const [showCrossIcon, setShowCrossIcon] = useState(false);

  let lat = currentLocation.lat;
  let lon = currentLocation.lon;

  const onOpenNotification = () => {
    navigation.navigate('Notification');
  };
  const onOpenFavourites = () => {
    navigation.navigate('Favorites');
  };
  const onPressMyLocation = () => {
    setShow(!show);
  };
  const onOpenCardDetail = (e: any) => {
    mapRef?.current?.animateCamera(
      {
        center: {
          latitude: Number(e?.lat),
          longitude: Number(e?.lon),
        },
        pitch: 2,
        heading: 20,
        altitude: 200,
        zoom: 40,
      },
      {duration: 1000},
    );
  };

  useEffect(() => {
    onSearch();
  }, []);

  const onSearch = () => {
    fetchDispensories();
    fetchProducts();
  };

  const fetchDispensories = () => {
    setloading(true);
    const params = {
      radius: 10000000000,
      lat: lat,
      lon: lon,
      is_featured: 0,
      per_page: 10,
      search: searchText !== '' ? searchText : '',
      page: 0,
    };
    getNearbyDispensaries(params)
      .then((res: any) => {
        if (route?.params?.params) {
          const filterDispancry = route?.params?.params;
          setMarkers([filterDispancry]);
          mapRef?.current?.animateCamera(
            {
              center: {
                latitude: Number(filterDispancry?.lat),
                longitude: Number(filterDispancry?.lon),
              },
              pitch: 2,
              heading: 20,
              altitude: 200,
              zoom: 40,
            },
            {duration: 1000},
          );
        } else {
          setMarkers(res.data.data);
          mapRef?.current?.animateCamera(
            {
              center: {
                latitude: Number(res?.data?.data[0]?.lat),
                longitude: Number(res?.data?.data[0]?.lon),
              },
              pitch: 2,
              heading: 20,
              altitude: 200,
              zoom: 40,
            },
            {duration: 1000},
          );
        }
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
  const fetchProducts = () => {
    const params = {
      page: 1,
      radius: 100000,
      lat: lat,
      lon: lon,
      check_near_by: 0,
      search: searchText !== '' ? searchText : '',
    };
    mapRef?.current?.animateCamera(
      {
        center: {
          latitude: lat,
          longitude: lon,
        },
        pitch: 2,
        heading: 20,
        altitude: 200,
        zoom: 40,
      },
      {duration: 1000},
    );
    getCategoryProducts(params)
      .then((res: any) => {
        let data = res.data.data;
        setCategory(data);
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

  const animateToCurrentLocation = () => {
    mapRef?.current?.animateToRegion(
      {
        latitude: currentLocation?.lat,
        longitude: currentLocation?.lon,
        latitudeDelta: 5,
        longitudeDelta: 5,
      },
      1000,
    );
  };
  useEffect(() => {
    animateToCurrentLocation();
  }, []);

  const getSinglecategory = (id: any) => {
    const formdata = new FormData();
    formdata.append('lat', lat);
    formdata.append('lon', lon);
    formdata.append('radius', 100000000);
    formdata.append('category_id', id);
    setloading(true);
    getSingleNearbyDispensaries(formdata)
      .then(res => {
        setMarkers(res.data.data);
        mapRef?.current?.animateCamera(
          {
            center: {
              latitude: Number(lat),
              longitude: Number(lon),
            },
            pitch: 2,
            heading: 20,
            altitude: 200,
            zoom: 40,
          },
          {duration: 1000},
        );
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

  const clearFieldHandler = () => {
    setSearchText('');
    setShowCrossIcon(false);
  };

  var {width, height} = Dimensions.get('window');

  return (
    <Wrapper>
      <View style={styles.headerView}>
        <HomeHeader
          liveLocation={currentAddress?.address}
          rewards={650}
          onOpenNotification={onOpenNotification}
          onPressFavorite={onOpenFavourites}
        />
        <SearchBar
          onPress={onSearch}
          value={searchText}
          onChangeText={(text: string) => setSearchText(text)}
          rightIcon={showCrossIcon}
          onRightPress={clearFieldHandler}
          text={'Search for Dispensary or stores'}
          onPressIn={() => setShowCrossIcon(true)}
        />
      </View>
      <View style={GST.flex}>
        <MapView
          ref={mapRef}
          style={GST.flex}
          maxZoomLevel={20}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={false}
          region={{
            latitude: currentLocation?.lat,
            longitude: currentLocation?.lon,
            latitudeDelta: 0.0034,
            longitudeDelta: 0.0043,
          }}
          showsUserLocation={true}>
          <Marker
            coordinate={{
              latitude: currentLocation.lat,
              longitude: currentLocation.lon,
            }}>
            <View style={styles.Mycircle}>
              <FastImage source={oval} style={styles.oval}>
                <FastImage source={locationIndicator} style={styles.locInd} />
              </FastImage>
            </View>
            <Callout style={styles.pointerImg}>
              <CustomText bold size={14} numberOfLines={1}>
                {currentAddress?.address}
              </CustomText>
            </Callout>
          </Marker>

          {markers?.map((item: any, index: any) => {
            return (
              <Marker
                coordinate={{
                  latitude: Number(item?.lat),
                  longitude: Number(item?.lon),
                }}
                key={index}>
                <View style={styles.circle}>
                  <View style={styles.dot} />
                </View>
                <Callout style={styles.pointerImg}>
                  <CustomText bold size={14}>
                    {item?.name}
                  </CustomText>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 90,
            right: 20,
            padding: 10,
            backgroundColor: THEME.colors.white,
            borderRadius: 5,
            elevation: 5,
          }}
          onPress={animateToCurrentLocation}>
          <Icon name="my-location" size={20} color={THEME.colors.primary} />
        </TouchableOpacity>
        <FilterButton
          data={allcategory}
          i={i}
          onPress={(e: any) => {
            seti(e?.id);
            getSinglecategory(e?.id);
          }}
        />
        <Cards data={markers} onPress={onOpenCardDetail} mapRef={mapRef} />
      </View>
      <LoadingOverlay loading={loading} />
    </Wrapper>
  );
};

const FilterButton = ({
  onPress,
  data,
  i,
}: {
  onPress: any;
  data: any;
  i: any;
}) => {
  return (
    <FlatList
      data={data}
      style={styles.listView}
      horizontal
      pagingEnabled
      keyExtractor={(_: any, index: any) => String(index)}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}: any) => {
        return (
          <Pressable
            onPress={() => onPress(item)}
            style={[
              styles.btn,
              {
                backgroundColor:
                  i === item?.id ? THEME.colors.primary : THEME.colors.white,
              },
            ]}>
            <CustomText
              color={i === item.id ? THEME.colors.white : THEME.colors.black}
              semiBold
              size={14}>
              {item?.name}
            </CustomText>
          </Pressable>
        );
      }}
    />
  );
};

const Cards = ({
  onPress,
  data,
  mapRef,
}: {
  onPress: any;
  data: any;
  mapRef: any;
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{}}
        keyExtractor={(_: any, index) => String(index)}
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          let index = Math.ceil(
            e.nativeEvent.contentOffset.x / Dimensions.get('screen').width,
          );
          let animatedata = data[index];
          if (animatedata?.lat && animatedata?.lon) {
            mapRef?.current?.animateCamera(
              {
                center: {
                  latitude: Number(animatedata?.lat),
                  longitude: Number(animatedata?.lon),
                },
              },
              {duration: 1000},
            );
          }
        }}
        renderItem={({item, index}: any) => {
          return (
            <Pressable style={styles.mainView} onPress={() => onPress(item)}>
              <FastImage source={{uri: item.image_path}} style={styles.img} />
              <View style={styles.innerView}>
                <CustomText bold size={14}>
                  {item?.name}
                </CustomText>
                <View style={styles.addres}>
                  <CustomText size={10} color={gray}>
                    {item?.address}
                  </CustomText>
                </View>
                <View style={[GST.mt1, GST.flexDir]}>
                  <View style={[GST.flexDir]}>
                    <Rating
                      type="custom"
                      ratingColor={primary}
                      tintColor={white}
                      ratingCount={5}
                      startingValue={item?.avg_reviews}
                      imageSize={16}
                      readonly
                      ratingBackgroundColor={dullLightGrey}
                    />
                    <CustomText semiBold>
                      {' '}
                      {Number(item?.avg_reviews).toFixed(1) ?? 0} (
                      {item.total_reviews})
                    </CustomText>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
export default Map;
