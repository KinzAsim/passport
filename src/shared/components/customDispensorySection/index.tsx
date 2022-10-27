import React from 'react';
import {View, StyleSheet, Pressable, FlatList, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GST, RF, THEME} from '../../exporter';
import CustomText from '../customText';
import Star from 'react-native-vector-icons/AntDesign';
import EmptyList from '../emptyList';
import {Rating} from 'react-native-ratings';
import {format as prettyFormat} from 'pretty-format';

const {white, primary, black, gray, dimGray, dullLightGrey} = THEME.colors;
const Stars = [1, 2, 3, 4, 5];

const DispensoriesSection = ({
  data,
  headingTitle,
  onPress,
  alldata,
  img,
  showSeeAll,
  onSeeAll,
  styleMod,
  resizeBool,
  type,
  navigation,
}: {
  data?: any;
  headingTitle?: any;
  onPress?: () => void;
  img?: any;
  showSeeAll?: Boolean;
  onSeeAll?: any;
  styleMod?: any;
  resizeBool?: boolean;
  type?: any;
  navigation?: any;
  alldata?: any;
}) => {
  const listEmpty = () => {
    return (
      <View style={{marginLeft: RF(50)}}>
        <EmptyList
          title={'No Data found.'}
          description={'There is no Featured Dispensaries availabe yet.'}
        />
      </View>
    );
  };
  const onOpenItemDetail = (type: any, item: any) => {
    if (type === 'nearby') {
      navigation.navigate('StoreDetails', {item: item});
    } else if (type === 'featured') {
      navigation.navigate('StoreDetails', {item: item});
    } else if (type === 'categories') {
      navigation.navigate('ProductDetails', {detail: item, data: alldata});
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <CustomText style={{paddingRight: RF(10)}} bold size={18}>
          {headingTitle}
        </CustomText>
        {data?.length > 0 ? (
          <>
            <Pressable onPress={onSeeAll}>
              <CustomText color={primary} size={14}>
                See All
              </CustomText>
            </Pressable>
          </>
        ) : null}
      </View>
      <FlatList
        data={data}
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
              imgTitile={item?.name}
              location={item?.address}
              ratings={item?.ratings}
              avg_reviews={item?.avg_reviews}
              reviews={item?.total_reviews}
              onPress={() => onOpenItemDetail(type, item)}
              img={item?.image_path}
              styleModify={styleMod}
              isResizeMode={resizeBool}
              description={item?.description}
            />
          );
        }}
      />
    </View>
  );
};

const Section = ({
  imgTitile,
  location,
  ratings,
  reviews,
  onPress,
  img,
  styleModify,
  isResizeMode,
  avg_reviews,
  description,
}: {
  onPress: () => void;
  imgTitile: any;
  location: any;
  ratings: any;
  reviews: any;
  img: any;
  styleModify: any;
  isResizeMode: any;
  avg_reviews: any;
  description: any;
}) => {
  return (
    <Pressable style={styles.imgMainView} onPress={onPress}>
      <View style={styles.mainView}>
        <FastImage
          source={{uri: img}}
          style={[styles.sectionImg, styleModify]}
          resizeMode={isResizeMode && 'cover'}
        />
      </View>
      <View style={GST.mt1}>
        <CustomText
          style={{paddingBottom: RF(15)}}
          bold
          size={16}
          color={black}>
          {imgTitile}
        </CustomText>
        <View style={{width: '95%'}}>
          {location && (
            <CustomText semiBold size={14} color={gray} numberOfLines={1}>
              {location}
            </CustomText>
          )}
          {description && (
            <CustomText semiBold size={14} color={gray} numberOfLines={1}>
              {description}
            </CustomText>
          )}
        </View>
        <View style={[GST.flexDir1, GST.AI, GST.mt1]}>
          <Rating
            type="custom"
            ratingColor={primary}
            tintColor={white}
            ratingCount={5}
            startingValue={avg_reviews}
            imageSize={RF(15)}
            readonly
            ratingBackgroundColor={dullLightGrey}
          />
          <CustomText bold style={GST.mLeft5}>
            {Number(avg_reviews).toFixed(1)}
          </CustomText>
          <CustomText semiBold style={GST.mLeft5}>
            ({reviews})
          </CustomText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: RF(220),
    alignItems: 'center',
    paddingVertical: 3,
    marginTop: RF(1),
  },
  mainContainer: {
    marginBottom: RF(15),
    backgroundColor: dimGray,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RF(15),
    paddingHorizontal: RF(10),
  },
  imgMainView: {
    backgroundColor: white,
    width: RF(250),
    height: RF(220),
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: RF(15),
    marginHorizontal: RF(10),
  },
  sectionImg: {
    width: RF(220),
    height: RF(120),
    borderRadius: 15,
  },
});

export default DispensoriesSection;
