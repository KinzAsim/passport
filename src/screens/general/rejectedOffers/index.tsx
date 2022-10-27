import React, {useEffect, useState} from 'react';
import {View, Pressable, ImageBackground} from 'react-native';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {FlatGrid} from 'react-native-super-grid';
import {getRejectedOffers, THEME, GST, RF} from '../../../shared/exporter';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import EmptyList from '../../../shared/components/emptyList';
import CustomText from '../../../shared/components/customText';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const {gray, primary, white} = THEME.colors;
const RejectedOffers = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  // const onOpenList = () => {
  //   navigation.navigate('Tabs', {screen: 'Offers'});
  // };
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchRejectedData();
    });
    return willFocusSubscription;
  }, []);

  const fetchRejectedData = () => {
    setLoading(true);
    getRejectedOffers()
      .then(res => {
        console.log('maccccc', res?.data?.data);

        setOffers(res?.data?.data);
      })
      .catch(err => {
        console.log('errr...', err);
      })
      .finally(() => setLoading(false));
  };
  const listEmpty = (type: any) => {
    return (
      <View style={[GST.AIC, GST.flex]}>
        <EmptyList
          title={'No Offers yet.'}
          description={'There is no any rejected offer.'}
          titleStyles={{fontSize: RF(16), fontWeight: 'bold', color: gray}}
          desStyles={{
            color: gray,
            fontSize: RF(12),
          }}
        />
      </View>
    );
  };

  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title={'Rejected Offers'} />
      <View style={styles.container}>
        <FlatGrid
          spacing={10}
          itemDimension={130}
          data={offers}
          ListEmptyComponent={listEmpty}
          renderItem={({item}: any) => {
            const cat = item?.categories?.slice(0, 3);
            return (
              <ImageBackground
                source={{uri: item?.coupon?.image_path}}
                style={styles.bgImg}>
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                  ]}
                  style={GST.LG}></LinearGradient>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    padding: RF(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{height: '27%'}}></View>
                  <FastImage
                    source={{uri: item?.coupon?.logo_path}}
                    resizeMode="cover"
                    style={styles.maskImg}
                  />
                  <View style={styles.outerInnerRec}>
                    <View style={styles.innerRecStyle}>
                      <CustomText
                        size={15}
                        color={primary}
                        bold
                        numberOfLines={2}
                        style={{marginBottom: RF(1)}}>
                        {item?.coupon?.value} OFF
                      </CustomText>
                      <CustomText size={6} bold color={primary}>
                        Purple Goats: 30.61% THC
                      </CustomText>
                    </View>
                  </View>
                  <CustomText
                    color={white}
                    semiBold
                    size={9}
                    style={{marginBottom: RF(6)}}>
                      Expiration Date:{moment(item?.coupon?.expiry_date).format('DD MMM YYYY')}
                  </CustomText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {cat &&
                      cat.map((item: any, index: any) => {
                        return (
                          <View style={styles.nameView}>
                            <CustomText color="#fff" size={7}>
                              {item?.coupon?.name}
                            </CustomText>
                          </View>
                        );
                      })}
                  </View>

                  <CustomText color="#fff" size={7}>
                    {item?.coupon?.website}
                  </CustomText>
                </View>
              </ImageBackground>
            );
          }}
        />
      </View>
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default RejectedOffers;
