import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  FlatList,
  ImageBackground,
  Alert,
  TouchableOpacity,
  Dimensions,
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
import {navigate} from '../../../shared/services/nav.service';
import Back from 'react-native-vector-icons/Ionicons';
import Like from 'react-native-vector-icons/AntDesign';
import {navigationRef, getProductDetails} from '../../../shared/exporter';
import ProductDetailComponent from '../../../shared/components/productDetailComponent';
import FastImage from 'react-native-fast-image';
import {submitReview} from '../../../assets/images';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import {RewiewHanle} from '../../../shared/utils/contsants';
import {Tooltip} from 'react-native-elements';

const {primary, gray, white} = THEME.colors;

const ProductDetails = ({navigation, route}: any) => {
  let datalitem = route?.params?.detail;
  let data = route?.params?.data;

  const [loading, setloading] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [likeButton, setLikeButton] = useState(data?.is_favourite);
  const [weights, setWeights] = useState<any>([]);
  const [RewiewData, setrewiew] = React.useState<any>([]);
  const [nametag, setNametag] = useState('');
  const [isAlltag, setIsAlltag] = useState(true);
  const [toolinde,settoolindex] = useState(0)
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchProductDetails();
    });
    return willFocusSubscription;
  }, []);

  const fetchProductDetails = async () => {
    let id = datalitem?.id;
    setloading(true);
    await getProductDetails(id)
      .then(res => {
        setLikeButton(res?.data?.data?.is_favourite);
        setIsAlltag(true);
        setDetailData(res?.data?.data);
        RewiewHanle(setrewiew, res?.data?.data, 'All');
        let weight = JSON?.parse((res?.data?.data as any)?.available_weights);
        let temp: {w8: any; pr: any}[] = [];
        weight.map((w: any) => {
          const resp = w.split('-');
          console.log(resp[0]);
          console.log(resp[1]);
          temp.push({
            w8: resp[0],
            pr: resp[1],
          });
        });
        setWeights(temp);
      })
      .catch(err => {
        console.log('errrr....', err);
      })
      .finally(() => setloading(false));
  };

  return (
    <>
      <HeaderSection
        id={datalitem?.id}
        detailData={detailData}
        onPressBack={() => navigationRef.current.goBack()}
        setloading={setloading}
        setLikeButton={setLikeButton}
        likeButton={likeButton}
      />
      <Wrapper>
        <Options data={weights} settoolindex={settoolindex} toolinde={toolinde}/>
        <ScrollView
          style={styles.detailView}
          showsVerticalScrollIndicator={false}>
          <ProductDetailComponent
            setIsAlltag={setIsAlltag}
            isAlltag={isAlltag}
            setNametag={setNametag}
            nametag={nametag}
            IsMapActvie={true}
            setrewiew={setrewiew}
            RewiewData={RewiewData}
            onPressBtn={() => {
              navigate('SupportForSubmitReviews', {
                id: datalitem?.id,
                detailData: detailData,
                data: detailData,
                RewiewData: RewiewData,
              });
            }}
            data={data}
            detailData={detailData}
            navigation={navigation}
          />
        </ScrollView>
        <LoadingOverlay loading={loading} />
      </Wrapper>
    </>
  );
};

const HeaderSection = ({
  onPressBack,
  detailData,
  id,
  setloading,
  setLikeButton,
  likeButton,
}: {
  onPressBack: () => void;
  detailData: any;
  id: any;
  setloading: any;
  setLikeButton: any;
  likeButton: any;
}) => {
  const onPressSubmitReviews = () => {
    navigate('SupportForSubmitReviews', {id: id, detailData: detailData});
  };

  const onPressLike = () => {
    setLikeButton(!likeButton);
    addFavorite();
  };
  const addFavorite = () => {
    let params = {
      type_id: id,
      type: 'product',
    };
    console.log('pp...', params);

    addOrRemoveFavourites(params)
      .then((res: any) => {
        console.log('LOGGG', res.data);
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  return (
    <>
      <View style={styles.container}>
        <Header
          img={detailData?.image_path}
          likeButton={likeButton}
          onPressBack={onPressBack}
          onPressLike={onPressLike}
        />
        <View style={[GST.mLeft, GST.mV1]}>
          <CustomText color={primary}>
            by {detailData?.created_by_type}
          </CustomText>
          <CustomText bold size={18} style={GST.mV1}>
            {detailData?.name}
          </CustomText>
          <View style={GST.flexDir}>
            <View style={{flexDirection: 'row'}}>
              <Star name="star" size={RF(14)} color={primary} />
              <CustomText bold size={13} style={GST.mh5}>
                {Number(detailData?.avg_reviews).toFixed(1)}
              </CustomText>
              <CustomText color={gray} size={13}>
                ({detailData?.total_reviews} Reviews)
              </CustomText>
            </View>
            <Pressable
              style={styles.submitRView}
              onPress={onPressSubmitReviews}>
              <FastImage source={submitReview} style={styles.submitReviewPic} />
              <CustomText style={GST.ph5} bold color={primary} size={13}>
                Submit Your Reviews
              </CustomText>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

const Header = ({
  img,
  onPressBack,
  onPressLike,
  likeButton,
}: {
  img: any;
  onPressBack: () => void;
  onPressLike: () => void;
  likeButton: any;
}) => {
  return (
    <ImageBackground source={{uri: img}} style={styles.img}>
      <Pressable
        style={styles.backNevigationPics}
        onPress={onPressBack}
        hitSlop={GST.hitSlop}>
        <Back name="arrow-back" size={RF(16)} color={'#000'} />
      </Pressable>
      <Pressable
        style={styles.likeView}
        onPress={onPressLike}
        hitSlop={GST.hitSlop}>
        <Like name="heart" size={RF(16)} color={likeButton ? primary : gray} />
      </Pressable>
    </ImageBackground>
  );
};

const Options = ({style, data}: {style?: any; data: any}) => {
  const [toggle, setToggle] = useState<any>(false);
  const [toolinde,settoolindex] = useState(0)

  return (
    <>
      <CustomText size={14} bold style={GST.mLeft}>
        Available weights
      </CustomText>
      <View style={GST.flexDir}>
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
              <View
                style={[
                  styles.btnView,
                  style,
                  {borderWidth: toolinde ===index ? 1 : 0},

                ]}>
                <Tooltip
                  onOpen={() => settoolindex(index) }
                  // onClose={()=>settoolindex(0)}
                  withOverlay={false}
                  width={70}
                  backgroundColor={primary}
                  popover={<CustomText>${item?.pr ? item?.pr : 0}</CustomText>}>
                  <CustomText>{item?.w8}</CustomText>
                </Tooltip>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default ProductDetails;
