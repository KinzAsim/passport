import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {primary, white, dimGray, dimGreen} = THEME.colors;

export const styles = StyleSheet.create({
  categoryView: {
    backgroundColor: '#000',
    marginHorizontal: RF(3),
    paddingHorizontal: RF(10),
    paddingVertical: RF(3),
    borderRadius: RF(10),
    marginBottom: RF(8),
  },
  container: {
    flex: 1,
    backgroundColor: dimGray,
    paddingTop: RF(20),
    paddingLeft: RF(8),
    // paddingBottom:RF(70),flex:1
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  innerView: {
    paddingLeft: RF(10),
    justifyContent: 'center',
    // backgroundColor:'red',
    width: '80%',
  },
  mainView: {
    backgroundColor: white,
    padding: RF(20),
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: RF(5),
    marginHorizontal: RF(10),
  },
  img: {width: RF(70), height: RF(70), borderRadius: 15},
  dividerView: {width: '100%', height: RF(2)},
  wrapperView: {paddingTop: 0, backgroundColor: dimGray},

  divider: {
    width: '100%',
    height: RF(2),
    backgroundColor: primary,
    marginTop: RF(5),
    marginLeft: RF(25),
  },
  divider1: {
    width: '100%',
    height: RF(2),
    backgroundColor: primary,
    marginTop: RF(5),
    marginRight: RF(25),
  },
  tabBtnContainer: {
    borderBottomWidth: 2,
    borderColor: white,
    paddingBottom: RF(2),
  },
  selectedContainer: {
    backgroundColor: primary,
  },
  mainContainer: {
    alignItems: 'center',
    marginTop: RF(10),
  },
  headerView: {
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: '100%',
    marginTop: RF(20),
  },
  textView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerInnerRec: {
    backgroundColor: dimGreen,
    borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    padding: RF(3),
    marginBottom: RF(7),
    width: '95%',
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
  },
  bgImg: {
    height: RF(200),
    width: RF(150),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RF(10),
    overflow: 'hidden',
    marginBottom: RF(10),
  },
  nameView: {
    backgroundColor: '#000',
    paddingHorizontal: RF(8),
    paddingVertical: RF(2),
    borderRadius: RF(10),
    marginBottom: RF(7),
    marginHorizontal: RF(1),
  },
});

export default styles;
