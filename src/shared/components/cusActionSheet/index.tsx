import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Pressable, ScrollView} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText';
import {GST, THEME, RF} from '../../../shared/exporter';
import Icon from 'react-native-vector-icons/Entypo';
import {Rating} from 'react-native-ratings';

const {gray, primary, white, dimGray, black, grey, dullLightGrey} =
  THEME.colors;
const CusActionSheet = ({Actref, data}: any) => {
  const [disName, setDisName] = useState('');
  return (
    <View style={styles.mainCont}>
      {Actref && (
        <ActionSheet
          animated
          headerAlwaysVisible
          closeOnPressBack
          closeOnTouchBackdrop
          ref={Actref}
          containerStyle={styles.actionSheet}
          // bounceOnOpen
          // ExtraOverlayComponent
          // gestureEnabled
          // elevation={10}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText style={{paddingVertical: RF(15)}} bold size={14}>
              Available on following Dispensary
            </CustomText>
            <Pressable onPress={() => Actref.current?.hide()}>
              <Icon name="cross" size={20} color={black} />
            </Pressable>
          </View>
          <CustomText>{disName}</CustomText>
          <View
            style={{
              height: RF(1),
              backgroundColor: grey,
              marginVertical: RF(10),
            }}
          />
          <ScrollView
            contentContainerStyle={{paddingBottom: RF(20)}}
            showsVerticalScrollIndicator={false}>
            {data.map((item: any) => {
              return (
                <>
                  <View style={styles.mainView}>
                    <FastImage
                      source={{uri: item.image_path}}
                      style={styles.img}
                    />
                    <View style={styles.innerView}>
                      <CustomText style={{paddingBottom: RF(2)}} bold size={14}>
                        {item?.name}
                      </CustomText>
                      <CustomText
                        size={12}
                        color={gray}
                        numberOfLines={2}
                        style={{width: '60%'}}>
                        {item.address}
                      </CustomText>
                      <View style={[GST.mt1, GST.flexDir]}>
                        <View style={[GST.flexDir]}>
                          <Rating
                            type="custom"
                            ratingColor={primary}
                            tintColor={white}
                            ratingCount={5}
                            startingValue={Number(item?.avg_reviews).toFixed(1)}
                            imageSize={16}
                            readonly
                            ratingBackgroundColor={dullLightGrey}
                          />
                          <CustomText bold style={GST.mLeft5}>
                            {Number(item?.avg_reviews).toFixed(1)}
                          </CustomText>
                          <CustomText semiBold style={GST.mLeft5}>
                            ({item.total_reviews})
                          </CustomText>
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              );
            })}
          </ScrollView>
        </ActionSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    marginBottom: RF(20),
  },
  container: {
    flex: 1,
  },
  actionSheet: {
    backgroundColor: dimGray,
    paddingHorizontal: RF(15),
    marginTop: 0,
    paddingBottom: RF(30),
  },
  innerView: {
    paddingHorizontal: RF(10),
  },
  mainView: {
    backgroundColor: white,
    padding: RF(20),
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: RF(5),
  },
  img: {width: RF(70), height: RF(70), borderRadius: 15},
});

export default CusActionSheet;
