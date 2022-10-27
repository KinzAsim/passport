import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GST, RF, THEME} from '../../exporter';
import CustomText from '../customText';
const {white, primary, dimGray, dimGreen} = THEME.colors;
import EmptyList from '../emptyList';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const CustomOffers = ({
  data,
  onOpenList,
  title,
  onSeeAll,
  notShow,
  type,
  onLoadMore,
}: {
  data?: any;
  off?: any;
  onOpenList?: any;
  title?: any;
  index?: any;
  onSeeAll?: () => void;
  notShow?: any;
  type?: any;
  onLoadMore?:any;
}) => {
  const listEmpty = () => {
    return (
      <View style={{marginLeft: type === 'checkIn' ? RF(100) : RF(80)}}>
        <EmptyList
          title={'No offer yet.'}
          description={'There is no offer availabe.'}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <CustomText bold size={18}>
          {title}
        </CustomText>
        {notShow
          ? null
          : data?.length > 0 && (
              <>
                <Pressable onPress={onSeeAll} style={GST.mR}>
                  <CustomText color={primary} size={14}>
                    See All
                  </CustomText>
                </Pressable>
              </>
            )}
      </View>
      <FlatList
        nestedScrollEnabled
        data={data?.filter((item: any, index: any) => index <= 9)}
        horizontal
        initialNumToRender={10}
        snapToAlignment={'center'}
        snapToInterval={Dimensions.get('window').width / 5}
        keyExtractor={(_: any, index) => String(index)}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={listEmpty}
        onEndReached={onLoadMore}
        renderItem={({item, index}: any) => {
          let cat = [];
          if (type == 'home') {
            cat = item?.categories?.slice(0, 5);
          }
          return (
            <>
              <Pressable onPress={() => onOpenList(item)}>
                <ImageBackground
                  style={styles.bgImg}
                  source={{uri: item?.image_path}}
                  imageStyle={styles.bR}>
                  {data && (
                    <LinearGradient
                      colors={[
                        'rgba(0, 0, 0, 0.4)',
                        'rgba(0, 0, 0, 0.4)',
                        'rgba(0, 0, 0, 0.4)',
                        'rgba(0, 0, 0, 0.4)',
                        'rgba(0, 0, 0, 0.4)',
                      ]}
                      style={[styles.bgImg, {position: 'absolute'}]}>
                      <View style={styles.linerMainView}>
                        <View style={[GST.height, GST.bR]}></View>
                        <FastImage
                          source={{uri: item.logo_path}}
                          resizeMode="cover"
                          style={styles.maskImg}
                        />
                        <View style={styles.outerInnerRec}>
                          <View style={styles.innerRecStyle}>
                            <CustomText
                              numberOfLines={2}
                              size={17}
                              color={primary}
                              bold
                              style={{marginBottom: RF(5)}}>
                              {item?.value}
                            </CustomText>
                            <CustomText size={7} bold color={primary}>
                              {item?.name}
                            </CustomText>
                          </View>
                        </View>
                        <CustomText
                          color={white}
                          semiBold
                          size={9}
                          style={{zindex:1,bottom:RF(20)}}>
                          Expiration Date:
                          {moment(item?.expiry_date).format('DD MMM YYYY')}
                        </CustomText>
                        <View style={styles.cView}>
                          {cat &&
                            cat.map((item: any) => {
                              return (
                                <View style={styles.categoriesView}>
                                  <CustomText color="#fff" size={6}>
                                    {item?.name}
                                  </CustomText>
                                </View>
                              );
                            })}
                        </View>
                        <CustomText
                          style={{zindex:1,bottom:RF(5)}}
                          color="#fff"
                          size={7}>
                          {item?.website}
                        </CustomText>
                      </View>
                    </LinearGradient>
                  )}
                </ImageBackground>
              </Pressable>
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesView: {
    backgroundColor: '#000',
    marginHorizontal: RF(3),
    paddingHorizontal: RF(10),
    paddingVertical: RF(3),
    borderRadius: RF(10),
    marginBottom: RF(3),
    alignSelf: 'center',
  },
  linerMainView: {
    flex: 1,
    width: '100%',
    padding: RF(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: RF(10),
    backgroundColor: dimGray,
    paddingLeft: RF(10),
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RF(15),
  },
  btnContainer: {
    width: RF(50),
    height: RF(20),
    backgroundColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(20),
    marginHorizontal: RF(2),
  },
  bgImg: {
    height: RF(250),
    width: RF(190),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
    marginBottom: RF(10),
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
    marginBottom: RF(10),
  },
  outerInnerRec: {
    backgroundColor: dimGreen,
    borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    padding: RF(3),
    marginBottom: RF(15),
    width: '95%',
    zindex:1,bottom:RF(10)
  },
  innerRecStyle: {
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 2,
    backgroundColor: dimGreen,
    borderRadius: 10,
    paddingHorizontal: RF(10),
    paddingVertical: RF(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskImg: {
    width: RF(35),
    height: RF(35),
    borderRadius: 10,
    marginBottom: RF(5),
    zindex:1,bottom:RF(15)
  },
  bR: {
    borderRadius: 10,
  },
  nameView: {
    backgroundColor: '#000',
    paddingHorizontal: RF(8),
    paddingVertical: RF(2),
    borderRadius: RF(10),
    marginBottom: RF(7),
    marginHorizontal: RF(1),
  },
  cView: {
    flexDirection: 'row',
    width: RF(170),
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: RF(10),
    zindex:1,bottom:RF(5)
  },
});

export default CustomOffers;
