import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import Wrapper from '../../../shared/components/wrapper';
import {GST, THEME} from '../../../shared/exporter';
import {flower1, featureFlower, floweFlower} from '../../../assets/images';
import styles from './styles';
const {gray} = THEME.colors;

const Notification = () => {
  const [data, setData] = useState([
    {
      title: ' Super Lemon Haze Buds',
      description: ' This product is trending in your area',
      img: flower1,
    },
    {
      title: ' Super Lemon Haze Buds',
      description: ' This product is trending in your area',
      img: featureFlower,
    },
    {
      title: ' Super Lemon Haze Buds',
      description: ' This product is trending in your area',
      img: floweFlower,
    },
    {
      title: ' Super Lemon Haze Buds',
      description: ' This product is trending in your area',
      img: flower1,
    },
  ]);
  return (
    <>
      <HeaderWrapper title="Notifications" showTitle showBtnLeft />
      <Wrapper style={[GST.PH, styles.wrapperView]}>
        <View style={styles.container}>
          <CustomText bold >No Notification yet</CustomText>
          {/* <FlatList
            data={data}
            pagingEnabled
            keyExtractor={(_: any, index) => String(index)}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}: any) => {
              return (
                <>
                  <View style={styles.mainView}>
                    <FastImage source={item.img} style={styles.img} />
                    <View style={styles.innerView}>
                      <CustomText bold size={14}>
                        {item.title}
                      </CustomText>
                      <CustomText size={12} color={gray}>
                        {item.description}
                      </CustomText>
                    </View>
                  </View>
                  <View style={styles.dividerView} />
                </>
              );
            }}
          /> */}
        </View>
      </Wrapper>
    </>
  );
};

export default Notification;
