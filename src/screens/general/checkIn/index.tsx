import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Pressable, ScrollView, View} from 'react-native';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import CustomOffers from '../../../shared/components/customOffersSection';
import {styles} from './styles';
import {getUserHistory, GST, RF, THEME} from '../../../shared/exporter';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import CustomText from '../../../shared/components/customText';
import FastImage from 'react-native-fast-image';
import EmptyList from '../../../shared/components/emptyList';
import {Rating} from 'react-native-ratings';
import moment from 'moment';

const {dimGray, primary, black, gray, dullLightGrey, white} = THEME.colors;

const CheckIn = ({navigation}: any) => {
  const [loading, setloading] = useState(false);
  const [detaildata, setDetailData] = useState([]);
  const [redeemCoupons, setRedeemCoupons] = useState([]);
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchRecentCheckIn();
    });
    return willFocusSubscription;
  }, []);
  const fetchRecentCheckIn = () => {
    setloading(true);
    getUserHistory()
      .then(res => {
        console.log('ress...', res?.data?.data?.checkins);
        setDetailData(res?.data?.data?.checkins);
        setRedeemCoupons(res.data.data.redeemed_coupons);
      })
      .catch(err => {
        console.log('errr...', err);
      })
      .finally(() => setloading(false));
  };
  const listEmpty = () => {
    return (
      <View style={{marginLeft: RF(90)}}>
        <EmptyList
          title={'No Data found.'}
          description={'There is no check in dispensary yet.'}
        />
      </View>
    );
  };
  const onOpenItemDetail = (item: any) => {
    navigation.navigate('StoreDetails', {item: item?.dispensary});
  };
  const onOpenCoupons = () => {};
  return (
    <View style={{backgroundColor: dimGray, flex: 1}}>
      <HeaderWrapper showBtnLeft showTitle title={'Check-In'} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <CustomText style={{paddingRight: RF(20)}} bold size={18}>
              Recent check-in dispensary
            </CustomText>
          </View>
          <FlatList
            data={detaildata.reverse()}
            horizontal
            pagingEnabled
            snapToAlignment={'center'}
            snapToInterval={Dimensions.get('window').width / 5}
            keyExtractor={(_: any, index: any) => String(index)}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={listEmpty}
            renderItem={({item, index}: any) => {
              return (
                <Section
                  onPress={() => onOpenItemDetail(item)}
                  imgTitile={item?.dispensary?.name}
                  location={item?.dispensary?.address}
                  ratings={item?.dispensary?.avg_reviews}
                  reviews={item?.dispensary?.total_reviews}
                  img={item?.dispensary?.image_path}
                  datee={item?.created_at}
                />
              );
            }}
          />
        </View>
        <CustomOffers
          type={'checkIn'}
          title={'Recent Redeem Coupons'}
          data={redeemCoupons}
          onOpenList={onOpenCoupons}
          notShow={true}
        />
        <LoadingOverlay loading={loading} />
      </ScrollView>
    </View>
  );
};

const Section = ({
  imgTitile,
  location,
  ratings,
  reviews,
  datee,
  onPress,
  img,
  styleModify,
  isResizeMode,
}: {
  onPress?: () => void;
  imgTitile?: any;
  location?: any;
  ratings?: any;
  reviews?: any;
  img?: any;
  styleModify?: any;
  isResizeMode?: any;
  datee?: any;
}) => {
  let rate;
  if (ratings) {
    rate = Number(ratings).toFixed(1);
  }
  return (
    <Pressable style={styles.imgMainView} onPress={onPress}>
      <View style={styles.mainView}>
        <FastImage
          source={{uri: img}}
          style={[styles.sectionImg, styleModify]}
          resizeMode={isResizeMode && 'contain'}
        />
      </View>
      <View style={GST.mt1}>
        <View style={[GST.flexDir, {alignItems: 'center'}]}>
          <CustomText bold size={16} color={black}>
            {imgTitile}
          </CustomText>
        </View>

        <View style={GST.wd}>
          <CustomText semiBold size={14} color={gray} numberOfLines={1}>
            {location}
          </CustomText>
        </View>
        <View style={[GST.flexDir1, GST.AI, GST.mt1]}>
          <Rating
            type="custom"
            ratingColor={primary}
            tintColor={white}
            ratingCount={5}
            startingValue={ratings}
            imageSize={16}
            readonly
            ratingBackgroundColor={dullLightGrey}
          />
          <CustomText bold style={GST.mLeft5}>
            {rate}
          </CustomText>
          <CustomText semiBold style={GST.mLeft5}>
            ({reviews})
          </CustomText>
          <CustomText
            size={9}
            semiBold
            style={{marginLeft: RF(15)}}
            color={primary}>
            {moment(datee).format('MM-DD-YYYY hh:mm A')}
          </CustomText>
        </View>
      </View>
    </Pressable>
  );
};

export default CheckIn;
