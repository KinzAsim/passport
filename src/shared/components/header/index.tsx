import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {GST, navigationRef, RF, THEME} from '../../exporter';
import CustomText from '../customText';
import {back, dots} from '../../../assets/images';
import FastImage from 'react-native-fast-image';

const {white, grey, primary} = THEME.colors;
interface Props {
  title: any;
  showTitle: any;
  showBtnLeft: any;
  leftIcon: any;
  rightBtn: any;
  onPressRightBtn: any;
  showRightText: any;
  onPressRightText: any;
  navigationFalse: any;
  onPressFilter?: any;
  boolForRightText?: any;
}

const Header = ({
  title,
  showTitle,
  showBtnLeft,
  leftIcon = back,
  rightBtn = dots,
  onPressRightBtn,
  showRightText,
  onPressRightText,
  navigationFalse,
  onPressFilter,
  boolForRightText,
}: Props) => {
  const BackTwoScreen = () => {
    navigationRef.current.goBack();
    navigationRef.current.goBack();
  };
  return (
    <View style={styles.container}>
      {showBtnLeft ? (
        <Pressable
          style={styles.backNevigationPics}
          onPress={() =>
            navigationFalse ? navigationRef.current.goBack() : BackTwoScreen()
          }
          hitSlop={GST.hitSlop}>
          <FastImage source={leftIcon} style={styles.closeImg} />
        </Pressable>
      ) : (
        <View />
      )}

      {showTitle && (
        <CustomText bold size={16}>
          {title}
        </CustomText>
      )}
      <Pressable onPress={onPressRightBtn}>
        {showRightText ? (
          <Pressable onPress={onPressRightText}>
            {title === 'Submit Your Review' ? (
              <CustomText color={primary}>1/6</CustomText>
            ) : title === 'Filters' ? (
              <CustomText color={boolForRightText ? grey : primary}>
                Clear All
              </CustomText>
            ) : (
              // : title === 'Featured Products' || title === 'All Products' ? (
              //   <Pressable onPress={onPressFilter}>
              //     <FastImage source={rightBtn} style={styles.rBtn} />
              //   </Pressable>
              // )
              <View></View>
            )}
          </Pressable>
        ) : (
          <View></View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    paddingTop: RF(10),
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: RF(7),
  },
  backNevigationPics: {
    width: RF(20),
    height: RF(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImg: {
    width: RF(13),
    height: RF(13),
  },
  closeImg: {
    width: RF(11.9),
    height: RF(11.9),
  },
  rBtn: {
    width: RF(11.9),
    height: RF(11.9),
  },
});

export default Header;
