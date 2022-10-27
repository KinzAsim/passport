import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';
import {close, heart, offerImage1} from '../../../assets/images';
import {
  GST,
  THEME,
  RF,
  getCouponsListing,
  showToast,
  addOrRemoveFavourites,
  getCoupons_Dispensory,
} from '../../../shared/exporter';
import {View, SafeAreaView, Pressable, Platform, ImageBackground} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import CusActionSheet from '../../../shared/components/cusActionSheet';
import {setCoupons} from '../../../shared/redux/reducers/mainReducer';
import {useDispatch, useSelector} from 'react-redux';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import {styles} from './styles'
import moment from 'moment';

const {gray, primary, dimGray,dimGreen,white} = THEME.colors;

const OfferDetail = ({route}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch<any>();
  const [swipedAllCards, setswipedAllCards] = useState(false);
  const [loading, setloading] = useState(false);

  const {coupons, currentLocation} = useSelector(
    (state: any) => state.root.main,
  );
  const [availableInStoresCount, setAvailableInStoresCount] = useState();
  const [availableInDispans, setavailableInDispans] = useState([]);
  const [id, setId] = useState();
  const [allCoupons, setAllCoupons] = useState([route.params.coupons]);

  const left = () => {};
  const onSwiped = (type: any) => {
    let params = {
      // coupon_id: id,
      type_id: id,
      type: 'coupon',
    };
    if (type === 'right') {
      addOrRemoveFavourites(params)
        .then((res: any) => {
          let data = res.data.data;
          // dispatch(setCategory(data));
        })
        .catch((err: any) => {
          showToast(
            'Request Failed',
            err?.response.data?.message,
            false,
          );
        })
        .finally(() => setloading(false));
    }
  };
  const onSwipedAllCards = () => {
    // setswipedAllCards(true);
  };

  const ref = useRef<any>();

  const fetchOffers = () => {
    setloading(true);
    const params = {
      radius: 10000,
      lat: currentLocation.lat,
      lon: currentLocation.lon,
      is_paginate_able: 0,
      per_page: 10,
      page: 0,
    };
    getCouponsListing(params)
      .then((res: any) => {
        // dispatch(setCoupons(res.data.data));
        setAllCoupons(res.data.data);
      })
      .catch((err: any) => {
        showToast(
          'Request Failed',
          err?.response.data?.message,
          false,
        );
      })
      .finally(() => setloading(false));
  };

  useEffect(() => {
    // fetchOffers();
    fetchAvailableDisp();
  }, []);

  const fetchAvailableDisp = () => {
    const params = {
      coupon_id: id,
    };
    getCoupons_Dispensory(params)
      .then((res: any) => {
        setavailableInDispans(res.data.data);
      })
      .catch((err: any) => {
        showToast(
          'Request Failed',
          err?.response.data?.message,
          false,
        );
      })
      .finally(() => setloading(false));
  };

  const onOpenList = () => {
    console.log('open');
  };

  const renderCard = (cardData: any, cardIndex: any) => {
    setAvailableInStoresCount(cardData?.available_in_dispensaries);
    setId(cardData?.id);
    return (
      <>
        <View style={styles.imgView}>
              <ImageBackground
                style={styles.offerImage}
                source={{uri:cardData?.image_path}}
                imageStyle={styles.bR}>
                <FastImage
                  source={{uri:cardData?.logo_path}}
                  resizeMode="cover"
                  style={styles.maskImg}
                />
                {cardData && <><View style={styles.outerInnerRec}>
                  <View style={styles.innerRecStyle}>
                    <CustomText size={RF(20)} color={primary} bold>
                      {/* {off}% */}
                      % OFF
                    </CustomText>
                    <CustomText size={RF(8)} bold color={primary}>
                      {cardData?.name}
                    </CustomText>
                  </View>
                </View>

                <CustomText color={white} semiBold size={RF(14)} >
                Expiration Date:{moment(cardData?.expiry_date).format('DD MMM YYYY')}
                </CustomText>

                <View style={GST.flexDir}>
                  {/* <OfferBtn name={'Flower'} onPress={() => onClick('flower')} />
                  <OfferBtn name={'Hybrid'} onPress={() => onClick('hybrid')} />
                  <OfferBtn
                    name={'Recreational'}
                    onPress={() => onClick('recreate')}
                  /> */}
                </View></>}
              </ImageBackground>
          {/* <FastImage
            style={styles.offerImage}
            source={{uri: cardData?.image_path}}
            // source={offerImage1}
            // resizeMode="contain"
          /> */}
        </View>
      </>
    );
  };

  return (
    <View style={styles.mainView}>
      <Section title={'Offers'} />
      <SafeAreaView style={styles.mainContainer}>
        <Swiper
          disableBottomSwipe
          onSwipedLeft={() => onSwiped('left')}
          onSwipedRight={() => onSwiped('right')}
          onTapCard={left}
          cards={allCoupons}
          renderCard={(cardData, cardIndex) => renderCard(cardData, cardIndex)}
          onSwipedAll={onSwipedAllCards}
          stackSize={3}
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
          }}
          // animateOverlayLabelsOpacity
          // animateCardOpacity
          swipeBackCard></Swiper>
      </SafeAreaView>
      <View
        style={{position: 'absolute', bottom: Platform.OS == 'ios' ? 35 : 1}}>
        <BottomSection
          stores={availableInStoresCount}
          onPress={() => ref?.current?.show()}
        />
      </View>
      <CusActionSheet
        Actref={ref}
        data={availableInDispans}
      />
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
        <CustomText style={{paddingBottom: RF(2)}} bold size={14}>
          Available in:{'  '}
          <CustomText bold size={14} color={primary}>
            {stores} {stores > 1 ? 'Stores' : 'Store'}
          </CustomText>
        </CustomText>
        <Pressable style={GST.mt1} onPress={onPress}>
          <CustomText style={{paddingBottom: RF(35)}} color={gray}>
            Click to view stores location
          </CustomText>
        </Pressable>
      </View>
    </>
  );
};

export default OfferDetail;
