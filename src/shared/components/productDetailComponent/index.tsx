import React, {useEffect, useState} from 'react';
import {View, Pressable, StyleSheet, FlatList} from 'react-native';
import CustomText from '../../../shared/components/customText';
import {GST, RF, THEME} from '../../../shared/exporter';
import * as Progress from 'react-native-progress';
import {Rating} from 'react-native-ratings';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Button from '../button';
import moment from 'moment';
import {Options} from '../../../screens/general/store detail';
import {RewiewHanle} from '../../utils/contsants';
import {format as prettyFormat} from 'pretty-format';
import FastImage from 'react-native-fast-image';

const {primary, white, gray, dimGray, dullLightGrey, black} = THEME.colors;

const ProductDetailComponent = ({
  detailData,
  navigation,
  data,
  onPressBtn,
  RewiewData,
  setrewiew,
  nametag,
  setNametag,
  isAlltag,
  setIsAlltag,
  IsMapActvie = false,
}: any) => {
  const mapref = React.useRef<any>(null);
  const [Rewiewtag] = React.useState([
    {name: 'With Image'},
    {name: '5 ★'},
    {name: '4 ★'},
    {name: '3 ★'},
    {name: '2 ★'},
    {name: '1 ★'},
  ]);
  const StarsList = [
    {index: 5, length: detailData?.five_star?.length ?? 0},
    {index: 4, length: detailData?.four_star?.length ?? 0},
    {index: 3, length: detailData?.three_star?.length ?? 0},
    {index: 2, length: detailData?.two_star?.length ?? 0},
    {index: 1, length: detailData?.one_star?.length ?? 0},
  ];
  const onOpen = () => {
    navigation.navigate('SeeAllReview', {
      title: 'All Reviews',
      data: (detailData as any)?.reviews,
      type: 'product',
    });
  };
  useEffect(() => {
    mapref?.current?.animateCamera(
      {
        center: {
          latitude: Number(data?.lat),
          longitude: Number(data?.lon),
        },
        pitch: 2,
        heading: 20,
        altitude: 200,
        zoom: 40,
      },
      {duration: 1000},
    );
  }, []);

  return (
    <View style={styles.container}>
      {data && <Map data={data} mapref={mapref} />}
      <Description description={detailData?.description} />
      <Title headingTitle={'Review'} onPress={onOpen} />
      {detailData?.avg_reviews !== undefined && (
        <Reviews
          starsList={StarsList}
          ratings={Number(detailData?.avg_reviews)}
        />
      )}
      <OptionsItem />
      <View style={[GST.mLeft5, GST.mt5]}>
        <Options
          onPressAll={() => {
            setNametag('');
            setIsAlltag(true);
            RewiewHanle(setrewiew, detailData, 'All');
          }}
          isAll={isAlltag}
          data={Rewiewtag}
          style={styles.optBtn}
          name={nametag}
          onPressCategories={(e: any, index: any) => {
            setIsAlltag(false);
            setNametag(e?.name);
            RewiewHanle(setrewiew, detailData, index);
          }}
        />
      </View>
      {RewiewData?.map((r: any) => {
        return (
          <View style={GST.pl15}>
            <Comment
              name={r?.user_detail?.name}
              date={moment(r?.created_at).format('DD MMM YYYY')}
              comment={r?.review}
              ratings={r?.rating}
              source={{uri: r?.image_path}}
            />
          </View>
        );
      })}
      <View style={styles.postBtnView}>
        <Button text="Post Review" onPress={onPressBtn} />
      </View>
    </View>
  );
};

const OptionsItem = ({style, data}: {style?: any; data?: any}) => {
  return (
    <>
      <View style={GST.flexDir}>
        <FlatList
          data={data}
          horizontal
          pagingEnabled
          keyExtractor={(_: any, index: any) => String(index)}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}: any) => {
            return (
              <View style={styles.btnView}>
                <CustomText color={gray}>{item}onPressSeeAllFlower</CustomText>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

const Map = ({data, mapref}: any) => {
  return (
    <View style={[styles.map, GST.mH, GST.mt15]}>
      <MapView
        ref={mapref}
        style={GST.flex}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: parseFloat(data?.lat),
          longitude: parseFloat(data?.lon),
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        scrollEnabled={false}>
        <Marker
          coordinate={{
            latitude: parseFloat(data?.lat),
            longitude: parseFloat(data?.lon),
          }}>
          <View style={styles.circle}>
            <View style={styles.dot} />
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

const Description = ({description}: any) => {
  return (
    <View style={styles.des}>
      <CustomText bold size={18}>
        Description
      </CustomText>
      <CustomText style={styles.text}>{description}</CustomText>
    </View>
  );
};

const Reviews = ({ratings, starsList}: any) => {
  return (
    <View style={styles.reviewView}>
      <View style={styles.innerReviewView}>
        {starsList.map((item: any) => (
          <View style={GST.flexJus}>
            <View style={{flexDirection: 'row'}}>
              <CustomText size={10}>{item.index}</CustomText>
              <CustomText size={10} style={GST.mLeft5}>
                stars
              </CustomText>
            </View>
            <Progress.Bar
              progress={item.length / 5}
              width={100}
              color={primary}
              style={styles.progressBar}
              unfilledColor="#B4E581"
              borderWidth={0}
            />
          </View>
        ))}
      </View>
      <View style={styles.ratingView}>
        <CustomText bold size={25}>
          {Number(ratings).toFixed(1)}
        </CustomText>
        <View style={[GST.flexDir, GST.mt1, GST.mb1]}>
          <Rating
            type="custom"
            ratingColor={primary}
            tintColor={dimGray}
            ratingCount={5}
            startingValue={Number(ratings)}
            imageSize={20}
            readonly
            ratingBackgroundColor={dullLightGrey}
          />
        </View>
        <CustomText>5 ratings</CustomText>
      </View>
    </View>
  );
};

export const Comment = ({name, date, comment, ratings, source}: any) => {
  const check =
    source?.uri ===
    'https://cpdev.codingpixel.com/passport-backend/public/assets/no_image.png'
      ? false
      : true;
  return (
    <View style={styles.commentMainView}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: RF(5),
        }}>
        <Rating
          type="custom"
          ratingColor={primary}
          tintColor={dimGray}
          ratingCount={5}
          startingValue={Number(ratings)}
          imageSize={20}
          readonly
          ratingBackgroundColor={dullLightGrey}
        />
        <CustomText style={GST.mLeft5}>{ratings}</CustomText>
        <CustomText color={gray} style={{marginLeft: RF(137)}}>
          {date}
        </CustomText>
      </View>
      <View style={styles.commentView}>
        <CustomText size={14} semiBold>
          {name}
        </CustomText>
      </View>
      <View style={styles.comment}>
        <CustomText>{comment}</CustomText>
      </View>
      {check && <FastImage source={source} style={styles.attchImg} />}
    </View>
  );
};

const Title = ({
  headingTitle,
  onPress,
}: {
  headingTitle: any;
  onPress?: () => void;
}) => {
  return (
    <View style={styles.textContainer}>
      <CustomText bold size={18}>
        {headingTitle}
      </CustomText>
      <Pressable onPress={onPress}>
        <CustomText bold color={black} size={14}>
          See All
        </CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  optBtn: {
    borderRadius: 20,
    backgroundColor: primary,
    height: RF(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RF(5),
    marginTop: RF(10),
  },
  postBtnView: {paddingHorizontal: RF(15), paddingBottom: RF(40)},
  commentMainView: {
    backgroundColor: dimGray,
    marginTop: RF(30),
    paddingHorizontal: RF(7),
  },
  container: {backgroundColor: dimGray},
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RF(15),
    marginHorizontal: RF(15),
  },
  reviewView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
  },
  ratingView: {flex: 0.5, alignItems: 'center', justifyContent: 'center'},
  innerReviewView: {
    flex: 0.5,
    justifyContent: 'center',
    paddingLeft: RF(15),
  },
  circle: {
    width: RF(50),
    height: RF(50),
    backgroundColor: 'rgba(231, 244, 191, 1)',
    borderRadius: RF(35),
    borderWidth: 1,
    borderColor: primary,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  pointerImg: {
    width: RF(100),
    height: RF(40),
    alignItems: 'center',
    paddingVertical: RF(10),
  },
  dot: {
    width: RF(10),
    height: RF(10),
    backgroundColor: primary,
    borderRadius: 100,
    position: 'absolute',
    marginTop: 135,
    zIndex: 9999,
    marginLeft: 135,
  },
  progressBar: {
    height: RF(5),
    marginLeft: RF(10),
    alignSelf: 'center',
  },
  map: {width: '92%', height: RF(160)},
  des: {
    marginHorizontal: RF(15),
    marginTop: RF(20),
  },
  text: {
    marginVertical: RF(10),
  },
  btn: {
    width: RF(60),
    height: RF(30),
    borderRadius: RF(20),
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(10),
  },
  commentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RF(5),
    alignSelf: 'flex-start',
    paddingLeft: RF(8),
  },
  comment: {
    width: '92%',
    marginLeft: RF(8),
    marginTop: RF(10),
  },
  backNevigationPics: {
    width: RF(40),
    height: RF(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(40),
    backgroundColor: white,
    marginLeft: RF(15),
  },
  likeView: {
    width: RF(40),
    height: RF(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(40),
    backgroundColor: white,
    marginRight: RF(15),
  },
  img: {
    width: '100%',
    height: RF(200),
    marginBottom: RF(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnView: {
    backgroundColor: 'red',
    width: RF(60),
    height: RF(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RF(5),
    elevation: 5,
    borderRadius: 10,
    marginVertical: RF(5),
    marginTop: RF(10),
  },
  attchImg: {
    marginTop: RF(10),
    width: RF(57),
    height: RF(57),
    borderRadius: RF(10),
    marginLeft: RF(10),
  },
});

export default ProductDetailComponent;
