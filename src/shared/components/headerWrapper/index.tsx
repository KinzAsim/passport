import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Wrap} from '../../models/interfaces';
import Header from '../header';
import {RF, THEME} from '../../exporter';

interface Props extends Wrap {
  title: string;
  children: any;
  onPress: () => void;
  showBtnLeft: boolean;
  showBtnRight: boolean;
  showTitle: boolean;
  leftIcon: any;
  rightBtn: any;
  onPressRightBtn: any;
  showRightText: boolean;
  onPressRightText: () => void;
  navigationFalse: boolean;
  onPressFilter?:any;
  boolForRightText?:any;
}

const HeaderWrapper = ({
  children,
  title,
  showBtnLeft,
  showTitle,
  leftIcon,
  rightBtn,
  onPressRightBtn,
  showRightText,
  navigationFalse=true,
  onPressRightText,
  onPressFilter,
  boolForRightText
}: Partial<Props>) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={[styles.container]}>
        <Header
          leftIcon={leftIcon}
          title={title}
          navigationFalse={navigationFalse}
          showBtnLeft={showBtnLeft}
          showTitle={showTitle}
          rightBtn={rightBtn}
          onPressRightBtn={onPressRightBtn}
          showRightText={showRightText}
          onPressRightText={onPressRightText}
          onPressFilter={onPressFilter}
          boolForRightText={boolForRightText}
        />
      </View>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.white,
    paddingHorizontal: RF(15),
    paddingTop: RF(30),
    paddingBottom: RF(10),
  },
});

export default HeaderWrapper;
