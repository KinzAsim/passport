import {Platform, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {RF, THEME} from '../../../shared/exporter';

const {primaryLight, primary, lightGray, dimGray, white, primaryDark} =
  THEME.colors;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dimGray,
  },
  headerView: {
    backgroundColor: primary,
    width: '100%',
    height: RF(246),
  },
  profilePic: {
    width: RF(69),
    height: RF(69),
    alignSelf: 'center',
    marginTop: RF(38),
    borderRadius: 100,
    borderColor: white,
    borderWidth: 1,
  },
  name: {
    alignSelf: 'center',
    paddingTop: RF(15),
  },
  email: {
    alignSelf: 'center',
  },
  contentView: {
    backgroundColor: white,
    marginHorizontal: RF(20),
    height: RF(240),
    borderRadius: RF(15),
    padding: RF(20),
    bottom: RF(20),
  },
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: white,
    borderRadius: RF(15),
    width: RF(65),
    height: RF(25),
    bottom: RF(110),
    right: RF(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'android' ? RF(5) : RF(3),
  },
  btnText: {
    alignSelf: 'center',
    paddingTop: RF(3),
  },
  rewardImage: {
    width: RF(17.48),
    height: RF(17.48),
  },
  rewardView: {
    width: RF(100),
    height: RF(25),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: RF(15),
    backgroundColor: primaryDark,
    borderRadius: RF(10),
    justifyContent: 'center',
    borderColor: primaryLight,
  },
  rewradTxt: {
    paddingLeft: RF(4),
  },
  completeAccView: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: RF(20),
    left: 0,
    right: 0,
    height: RF(90),
    borderRadius: RF(15),
    // bottom: RF(38),
    top: RFPercentage(30),
    position: 'absolute',
    zIndex: 1,
  },
  compltAccpic: {
    width: RF(45.81),
    height: RF(48),
    marginLeft: RF(20),
  },
  miniView: {
    paddingLeft: RF(15),
    width: RF(230),
    height: RF(50),
  },
  lastBtn: {
    marginHorizontal: RF(20),
    height: RF(40),
    backgroundColor: white,
    borderRadius: RF(15),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: RF(20),
  },
  logoutPic: {
    width: RF(19.06),
    height: RF(19.06),
    marginRight: RF(10),
  },
  iconView: {
    width: RF(69),
    height: RF(69),
    alignSelf: 'center',
    marginTop: RF(38),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: dimGray,
  },
});
