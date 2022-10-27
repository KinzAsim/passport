import {StyleSheet, Dimensions, Platform} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {gray, primary, white, red, green, dimGray, dimGreen} = THEME.colors;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    top: RF(60),
    alignItems: 'center',
  },
  categoryView: {
    backgroundColor: '#000',
    marginHorizontal: RF(3),
    paddingHorizontal: RF(10),
    paddingVertical: RF(3),
    borderRadius: RF(10),
    marginBottom: RF(8),
    marginTop: RF(20),
  },
  container: {
    flex: 1,
  },
  heading: {
    alignSelf: 'center',
    paddingTop: RF(30),
    // paddingBottom: RF(10),
  },
  textTop: {
    alignSelf: 'center',
    paddingVertical: RF(10),
  },
  imgView: {
    height: RF(430),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RF(10),
  },
  offerImage: {
    width: '100%',
    height: Platform.OS == 'ios' ? windowHeight / 1.6 : windowHeight / 1.5,
    borderRadius: RF(10),
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal:RF(10),
  },
  text: {
    marginLeft: RF(15),
    top: RF(20),
  },
  iconLeft: {
    width: RF(67),
    height: RF(67),
  },
  iconRight: {
    width: RF(67),
    height: RF(67),
  },
  btnView: {
    width: RF(50),
    height: RF(50),
    borderRadius: 100,
    padding: RF(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: white,
    paddingVertical: 30,
    marginTop: RF(30),
  },
  wrapperLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    right: -10,
    bottom: RF(135),
  },
  wrapperRight: {
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // alignSelf: 'center',
    // top: RF(160),
    // left: -10,
  },
  mainView: {flex: 1, backgroundColor: dimGray, paddingHorizontal: RF(15)},
  bR: {
    borderRadius: 10,
  },
  outerInnerRec: {
    backgroundColor: dimGreen,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: RF(7),
    marginBottom: RF(20),
    width: '90%',
    // height:'13%',
  },
  innerRecStyle: {
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 2,
    backgroundColor: dimGreen,
    borderRadius: 10,
    paddingHorizontal: RF(10),
    paddingVertical: RF(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // height:'100%'
  },
  maskImg: {
    width: RF(45),
    height: RF(45),
    borderRadius: 10,
    marginBottom: RF(20),
  },
  sadImg: {
    width: RF(52),
    height: RF(52),
    marginBottom: RF(15),
    alignSelf: 'center',
  },
  sorryView: {
    zIndex: 1,
    left: RF(90),
    bottom: RF(270),
  }, 
  submitReviewPic: {
    width: RF(17.31),
    height: RF(17.31),
  },

});
