import React from 'react';
import {View, Pressable} from 'react-native';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import {FlatGrid} from 'react-native-super-grid';
import {images} from '../../../shared/components/customData';

const Reviews = ({navigation}: any) => {
  const onOpenList = () => {
    navigation.navigate('Tabs', {screen: 'Offers'});
  };
  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title={'Reviews'} />
      {/* <View style={styles.container}>
        <FlatGrid
          spacing={10}
          itemDimension={130}
          data={images}
          renderItem={({item}: any) => {
            return (
              <Pressable onPress={onOpenList}>
                <FastImage
                  source={item.img}
                  resizeMode="cover"
                  style={styles.bgImg}
                />
              </Pressable>
            );
          }}
        />
      </View> */}
    </>
  );
};

export default Reviews;
