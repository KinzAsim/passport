import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';
import {close, heart} from '../../../assets/images';
import {
  GST,
  THEME,
  RF,
  getCouponsListing,
  showToast,
  addOrRemoveFavourites,
  getCoupons_Dispensory,
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
import {useDispatch, useSelector} from 'react-redux';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import LinearGradient from 'react-native-linear-gradient';
import {sadSmiley} from '../../../assets/images';
import moment from 'moment';

const {gray, primary, dimGray, white} = THEME.colors;

const Offers = ({route, navigation}: any) => {
  const dispatch = useDispatch<any>();
  const ref = useRef<any>();
  const [loading, setloading] = useState(false);
  const [availableInStoresCount, setAvailableInStoresCount] = useState();
  const [availableInDispans, setavailableInDispans] = useState([]);
  const [id, setId] = useState();
  const [categories, setCategories] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const {currentLocation, Coupon} = useSelector(
    (state: any) => state.root.main,
  );
  const [cardCount, setcardCount] = useState(0);
  const [cardIndex, setCarIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const onSwiped = (type: any, card: any) => {
    allCoupons.map((c, index) => {});
    let params = {
      type_id: id,
      type: 'coupon',
    };
    if (type === 'right') {
      addOrRemoveFavourites(params)
        .then((res: any) => {
          let data = res.data.data;
          dispatch(setCategories(data));
        })
        .catch((err: any) => {
          showToast('Request Failed', err?.response.data?.message, false);
        })
        .finally(() => setloading(false));
    }
  };
  const fetchOffers = () => {
    setloading(true);
    const params = {
      radius: 10000,
      lat: currentLocation?.lat,
      lon: currentLocation?.lon,
      is_paginate_able: 0,
      per_page: 10,
      page: 0,
    };
    getCouponsListing(params)
      .then((res: any) => {
        setAllCoupons(res?.data?.data.reverse());
        setcardCount(res.data.data.length);
        setCarIndex(0);
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  useEffect(() => {
    fetchOffers();
  }, []);
  const fetchAvailableDisp = () => {
    const params = {
      coupon_id: id,
    };
    getCoupons_Dispensory(params)
      .then((res: any) => {
        setavailableInDispans(res?.data?.data);
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  const availableDispDetails = () => {
    ref?.current?.show();
    fetchAvailableDisp();
  };
  const handleOnSwipe = () => {
    if (cardCount !== null || cardCount !== 0) {
      setcardCount(cardCount - 1);
    }
    setCarIndex(cardIndex + 1);
  };

  const renderCard = (cardData: any, cardIndex: any) => {
    setAvailableInStoresCount(cardData?.available_in_dispensaries);
    setId(cardData?.id);
    let temp: any = [];
    cardData?.categories?.map((c: any) => {
      temp.push(c);
    });
    setCategories(temp);
    return (
      <>
        <View style={styles.imgView}>
          <ImageBackground
            style={styles.offerImage}
            source={{uri: cardData?.image_path}}
            imageStyle={styles.bR}>
            {cardData && (
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
                  source={{uri: cardData?.logo_path}}
                  resizeMode="cover"
                  style={styles.maskImg}
                />
                {cardData && (
                  <>
                    <View style={styles.outerInnerRec}>
                      <View style={styles.innerRecStyle}>
                        <CustomText size={25} color={primary} bold>
                          {cardData?.value}
                        </CustomText>
                        <CustomText size={RF(8)} bold color={primary}>
                          {cardData?.name}
                        </CustomText>
                      </View>
                    </View>

                    <CustomText color={white} semiBold size={13}>
                      Expiration Date:
                      {moment(cardData?.expiry_date).format('DD MMM YYYY')}
                    </CustomText>
                    <View style={styles.view}>
                      <View style={{flexDirection:'row', bottom: 5}}>
                        {cardData?.categories &&
                          cardData?.categories?.slice(0, 3).map((item: any) => {
                            return (
                              <View style={styles.categoryView}>
                                <CustomText color="#fff" size={10}>
                                  {item?.name}
                                </CustomText>
                              </View>
                            );
                          })}
                      </View>
                      <CustomText
                        color="#fff"
                        size={10}
                        style={{zindex: 1, bottom: 2}}>
                        {cardData?.website}
                      </CustomText>
                    </View>
                  </>
                )}
              </LinearGradient>
            )}
          </ImageBackground>
        </View>
      </>
    );
  };
  return (
    <View style={styles.mainView}>
      <Section title={'Offers'} />
      <SafeAreaView style={styles.mainContainer}>
        <Swiper
          ref={swiperRef}
          showSecondCard={true}
          animateCardOpacity
          outputCardOpacityRangeX={[0.1, 1, 1, 1, 0.1]}
          verticalSwipe={false}
          infinite={false}
          cardIndex={cardIndex}
          disableTopSwipe
          disableBottomSwipe
          horizontalSwipe={cardCount == 0 ? false : true}
          onSwipedLeft={card => onSwiped('left', card)}
          onSwipedRight={card => onSwiped('right', card)}
          cards={allCoupons}
          renderCard={(cardData, cardIndex) => renderCard(cardData, cardIndex)}
          onSwiped={handleOnSwipe}
          stackSize={2}
          cardStyle={{
            top: 20,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
          }}
          backgroundColor={dimGray}
          overlayLabels={{
            left: {
              element: (
                <FastImage
                  style={styles.iconLeft}
                  source={close}
                  resizeMode="contain"
                />
              ),
              style: {
                wrapper: styles.wrapperLeft,
              },
            },
            right: {
              element: (
                <FastImage
                  style={styles.iconRight}
                  source={heart}
                  resizeMode="contain"
                />
              ),
              style: {
                wrapper: styles.wrapperRight,
              },
            },
          }}></Swiper>
      </SafeAreaView>
      <View
        style={{position: 'absolute', bottom: Platform.OS == 'ios' ? 35 : 1}}>
        {cardCount !== 0 ? (
          <BottomSection
            stores={availableInStoresCount}
            onPress={availableDispDetails}
          />
        ) : (
          <View style={styles.sorryView}>
            <FastImage style={styles.sadImg} source={sadSmiley} />
            <CustomText bold size={14}>
              Sorry No More Coupons Available
            </CustomText>
          </View>
        )}
      </View>
      <CusActionSheet Actref={ref} data={availableInDispans} />
      <LoadingOverlay loading={loading} />
    </View>
  );
};

const Section = ({title}: {title: any}) => {
  return (
    <>
      <CustomText style={styles.heading} bold size={16}>
        {title}
      </CustomText>
      <CustomText style={styles.textTop} size={12} color={gray}>
        Swipe Coupon Right To Favourite Left To Decline
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

export default Offers;
