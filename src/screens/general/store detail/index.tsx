import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  FlatList,
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import CustomText from '../../../shared/components/customText';
import Wrapper from '../../../shared/components/wrapper';
import {
  addOrRemoveFavourites,
  GST,
  RF,
  showToast,
  THEME,
} from '../../../shared/exporter';
import Star from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import {flower1, featureFlower} from '../../../assets/images';
import DispensoriesSection from '../../../shared/components/customDispensorySection';
import {getDispensaryDetails} from '../../../shared/exporter';
import CustomOffers from '../../../shared/components/customOffersSection';
import Button from '../../../shared/components/button';
import * as Progress from 'react-native-progress';
import Back from 'react-native-vector-icons/Ionicons';
import {navigationRef} from '../../../shared/exporter';
import {Comment} from '../../../shared/components/productDetailComponent';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import EmptyList from '../../../shared/components/emptyList';
import {RewiewHanle} from '../../../shared/utils/contsants';
import moment from 'moment';
import {navigate} from '../../../shared/services/nav.service';

const {primary, white, gray, dimGray, black} = THEME.colors;
const StarsList = [
  {index: 5, length: 0},
  {index: 4, length: 0},
  {index: 3, length: 0},
  {index: 2, length: 0},
  {index: 1, length: 0},
];
const StoreDetails = ({navigation, route}: any) => {
  const item = route?.params?.item;
  const [detailData, setdetailData] = useState({});
  const [loading, setloading] = useState(false);
  const [likeButton, setLikeButton] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [name, setName] = useState('');
  const [nametag, setNametag] = useState('');
  const [isAll, setIsAll] = useState(true);
  const [RewiewData, setrewiew] = useState<any>([]);
  const [isAlltag, setIsAlltag] = useState(true);
  const [Rewiewtag] = useState([
    {name: 'With Image'},
    {name: '5 ★'},
    {name: '4 ★'},
    {name: '3 ★'},
    {name: '2 ★'},
    {name: '1 ★'},
  ]);
  const [allCategoryData, setallCategoryData] = useState([]);
  const [selected, setSelected] = useState(false);
  const [catagories, setCatagories] = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchDispancery();
    });
    return willFocusSubscription;
  }, []);
  useEffect(() => {}, [allCategoryData]);
  const onPressSeeAll = (type: any) => {
    if (type === 'featuredProducts') {
      navigation.navigate('SeeAllProducts', {
        title: 'Featured Products',
        data: detailData as any,
        dispensary_id: (detailData as any)?.id,
        category: (detailData as any).dispensary_featured_products,
        flag: 'featuredProducts',
        catagories: catagories,
        brands: brands,
      });
    } else if (type === 'offers') {
      navigation.navigate('AllCoupons', {
        title: 'All Coupons',
        dispensary_id: (detailData as any)?.id,
        category: (detailData as any)?.coupons,
        flag: 'offers',
        lat: (detailData as any)?.lat,
        lon: (detailData as any)?.lon,
      });
    } else if (type === 'flowers') {
      navigation.navigate('SeeAllProducts', {
        title: 'All Products',
        dispensary_id: (detailData as any)?.id,
        category: allCategoryData,
        flag: 'flowers',
        catagories: catagories,
        brands: brands,
      });
    } else if (type === 'organic') {
      navigation.navigate('SeeAllProducts', {
        title: 'Products',
        dispensary_id: (detailData as any)?.id,
        category: categoryData,
        flag: 'organic',
      });
    } else if (type === 'brand') {
      navigation.navigate('SeeAllProducts', {
        title: 'Brand',
        dispensary_id: (detailData as any)?.id,
        brand: (detailData as any).dispensary_brands,
        flag: 'brand',
      });
    } else {
      navigation.navigate('SeeAllReview', {
        title: 'All Reviews',
        data: (detailData as any)?.reviews,
        type: 'dispensary',
      });
    }
  };
  const getAllData = (data: any) => {
    let temp: any = [];
    data?.dispensary_categories?.map((item: any) => {
      item.category_products.map((p: any) => {
        temp.push(p);
      });
    });
    setallCategoryData(temp);
  };
  const fetchDispancery = async () => {
    let id = item?.id;
    setloading(true);
    await getDispensaryDetails(id)
      .then(res => {
        setLikeButton(res?.data?.data[0].is_favourite);
        setdetailData(res?.data?.data[0]);
        getAllData(res?.data?.data[0]);
        console.log('ALLLL', res.data.data[0]);

        setCatagories(res.data.data[0]?.dispensary_categories);
        RewiewHanle(setrewiew, res?.data?.data[0], 'All');
        setBrands(res.data.data[0]?.dispensary_brands);
        StarsList[0].length = res.data.data[0]?.five_star?.length ?? 0;
        StarsList[1].length = res.data.data[0]?.four_star?.length ?? 0;
        StarsList[2].length = res.data.data[0]?.three_star?.length ?? 0;
        StarsList[3].length = res.data.data[0]?.two_star?.length ?? 0;
        StarsList[4].length = res.data.data[0]?.one_star?.length ?? 0;
        // ProgresssBar(res?.data?.data);
        let temp: any = [];
        res.data.data[0]?.dispensary_categories.map((item: any) => {
          item.category_products.map((p: any) => {
            temp.push(p);
          });
        });
        setallCategoryData(temp);
      })
      .catch(err => {
        console.log('errr...', err);
      })
      .finally(() => setloading(false));
  };
  const listEmpty = () => {
    return (
      <View style={{marginLeft: RF(80)}}>
        <EmptyList
          title={'No Data found.'}
          description={'There is no data availabe yet.'}
        />
      </View>
    );
  };
  const onOpenMap = () => {
    navigation.navigate('Map', {params: detailData});
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Passport',
          message: 'Passport access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        onOpenMap();
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const onPressCategories = (item: any) => {
    setIsAll(false);
    setName(item?.name);
    setSelected(!selected);
    let temp = [];
    (detailData as any)?.dispensary_categories.map((c: any) => {
      if (item.name == c.name) {
        setCategoryData(c.category_products);
      }
    });
  };
  const onPressAll = async () => {
    setName('');
    setIsAll(true);
    setSelected(!selected);
    let temp: any = [];
    (detailData as any)?.dispensary_categories?.map((item: any) => {
      item.category_products.map((p: any) => {
        temp.push(p);
      });
    });
    setallCategoryData(temp);
  };
  const onOpenDetail = () => {
    navigation.navigate('ProductDetails', {detail: categoryData});
  };
  const onSubmitReview = () => {
    navigate('SupportForSubmitReviews', {
      id: (detailData as any)?.id,
      detailData: detailData,
      type: 'dispensary',
    });
  };
  const onOpenOffersList = (item: any) => {
    navigation.navigate('DetailSingleCoupon', {item: item});
  };
  return (
    <>
      <HeaderSection
        detail={detailData}
        onPressBack={() => navigationRef?.current?.goBack()}
        id={item?.id}
        setloading={setloading}
        setLikeButton={setLikeButton}
        likeButton={likeButton}
      />
      <Wrapper>
        <Options
          bool
          data={(detailData as any)?.dispensary_categories}
          onPressCategories={onPressCategories}
          onPressAll={onPressAll}
          isAll={isAll}
          name={name}
        />
        <LoadingOverlay loading={loading} />
        <ScrollView
          style={styles.detailView}
          showsVerticalScrollIndicator={false}>
          <DispensoriesSection
            data={(detailData as any).dispensary_featured_products}
            alldata={detailData as any}
            headingTitle={'Featured Products'}
            type={'categories'}
            navigation={navigation}
            img={flower1}
            resizeBool
            showSeeAll
            onSeeAll={() => onPressSeeAll('featuredProducts')}
          />
          <CustomOffers
            data={(detailData as any)?.coupons?.reverse()}
            onOpenList={onOpenOffersList}
            title={'Coupons'}
            onSeeAll={() => onPressSeeAll('offers')}
          />
          {isAll ? (
            <DispensoriesSection
              data={allCategoryData}
              headingTitle={'All Products'}
              onPress={onOpenDetail}
              navigation={navigation}
              type={'categories'}
              img={featureFlower}
              resizeBool
              showSeeAll
              onSeeAll={() => onPressSeeAll('flowers')}
            />
          ) : (
            <DispensoriesSection
              data={categoryData}
              headingTitle={name}
              navigation={navigation}
              type={'categories'}
              onPress={onOpenDetail}
              img={featureFlower}
              resizeBool
              showSeeAll
              onSeeAll={() => onPressSeeAll('organic')}
            />
          )}
          <Title headingTitle={'Brands'} />
          <FlatList
            data={(detailData as any)?.dispensary_brands}
            horizontal
            pagingEnabled
            keyExtractor={(_: any, index: any) => String(index)}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={listEmpty}
            renderItem={({item, index}: any) => {
              return (
                <View style={styles.brandImgView}>
                  <FastImage
                    source={{uri: item?.image_path}}
                    style={styles.brandImg}
                  />
                </View>
              );
            }}
          />
          <Title headingTitle={'Review'} showSeeAll onPress={onPressSeeAll} />
          <Reviews detaildata={detailData} ratings={item?.avg_reviews ?? 0} />
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
              <Comment
                name={r?.user_detail?.name}
                date={moment(r?.created_at).format('DD MMM YYYY')}
                comment={r?.review}
                ratings={r?.rating}
                source={{uri: r?.image_path}}
              />
            );
          })}

          <View style={styles.lastBtnView}>
            <Button text="Get Direction" onPress={requestLocationPermission} />
            <Button
              text="Post  Review"
              onPress={onSubmitReview}
              wrapStyle={{marginLeft: RF(15), paddingHorizontal: RF(5)}}
            />
          </View>
        </ScrollView>
        <LoadingOverlay loading={loading} />
      </Wrapper>
    </>
  );
};

export const Options = ({
  style,
  bool,
  data,
  onPressCategories,
  onPressAll,
  isAll,
  name,
  hideFirst,
}: {
  style?: any;
  bool?: boolean;
  data?: any;
  onPressCategories?: any;
  onPressAll?: () => void;
  isAll?: any;
  name?: any;
  hideFirst?: any;
}) => {
  return (
    <View style={GST.flexDir}>
      <Pressable
        style={[
          styles.btnView,
          style,
          {backgroundColor: isAll ? primary : white},
        ]}
        onPress={onPressAll}>
        <CustomText
          style={{paddingHorizontal: RF(2)}}
          color={isAll ? white : black}>
          All
        </CustomText>
      </Pressable>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        snapToAlignment={'center'}
        snapToInterval={Dimensions.get('window').width / 5}
        keyExtractor={(_: any, index: any) => String(index)}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}: any) => {
          return (
            <>
              <Pressable
                style={[
                  styles.btnView,
                  style,
                  {backgroundColor: name == item.name ? primary : white},
                ]}
                onPress={() => onPressCategories(item, index)}>
                <CustomText
                  numberOfLines={1}
                  style={{paddingHorizontal: RF(2)}}
                  color={name == item.name ? white : black}>
                  {item?.name}
                </CustomText>
              </Pressable>
            </>
          );
        }}
      />
    </View>
  );
};

const Reviews = ({ratings, detaildata}: any) => {
  return (
    <View style={styles.reviewView}>
      <View style={styles.innerReviewView}>
        {StarsList.map(item => (
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
            startingValue={ratings}
            imageSize={20}
            readonly
          />
        </View>
        <CustomText>5 ratings</CustomText>
      </View>
    </View>
  );
};

const HeaderSection = ({
  onPressBack,
  detail,
  id,
  setloading,
  setLikeButton,
  likeButton,
  ratings,
}: {
  onPressBack: () => void;
  detail?: any;
  id?: any;
  setloading?: any;
  setLikeButton?: any;
  likeButton?: any;
  ratings?: any;
}) => {
  const onPressLike = () => {
    setLikeButton(!likeButton);
    addFavorite();
  };
  const addFavorite = () => {
    let params = {
      type_id: id,
      type: 'product',
    };
    addOrRemoveFavourites(params)
      .then((res: any) => {})
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={{uri: detail?.image_path}} style={styles.img}>
          <Pressable
            style={styles.backNevigationPics}
            onPress={onPressBack}
            hitSlop={GST.hitSlop}>
            <Back name="arrow-back" size={RF(16)} color={'#000'} />
          </Pressable>
          {/* <Pressable
            style={styles.likeView}
            onPress={onPressLike}
            hitSlop={GST.hitSlop}>
            <Like
              name="heart"
              size={RF(16)}
              color={likeButton ? primary : gray}
            />
          </Pressable> */}
        </ImageBackground>
        <View style={GST.mLeft}>
          <CustomText color={primary}>{detail?.name}</CustomText>
          <CustomText bold size={16}>
            {detail?.name}
          </CustomText>
          <View style={GST.flexDir1}>
            <Star name="star" size={RF(14)} color={primary} />
            <CustomText style={{paddingHorizontal: RF(5)}} bold>
              {Number(detail?.avg_reviews).toFixed(1)}
            </CustomText>
            <CustomText color={gray}>
              ({detail?.total_reviews} Reviews)
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
};

const Title = ({
  headingTitle,
  onPress,
  showSeeAll,
}: {
  headingTitle?: any;
  onPress?: any;
  showSeeAll?: Boolean;
}) => {
  return (
    <View style={styles.textContainer}>
      <CustomText bold size={18}>
        {headingTitle}
      </CustomText>
      {showSeeAll && (
        <Pressable onPress={onPress}>
          <CustomText bold color={black} size={14}>
            See All
          </CustomText>
        </Pressable>
      )}
    </View>
  );
};

export default StoreDetails;
