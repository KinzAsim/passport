import {StyleSheet} from 'react-native';
import {RFValue as RF} from 'react-native-responsive-fontsize';
import {THEME} from './colors';
const {dimGray,white} = THEME.colors;

const GST = StyleSheet.create({
  flex: {flex: 1},
  flexDir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexDir1: {
    flexDirection: 'row',
  },
  heartImg: {
    width: RF(22.5),
    height: RF(20),
  },
  AIC: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mLeft: {
    marginLeft: RF(10),
  },
  mLeft5: {
    marginLeft: RF(5),
  },
  mt1: {
    marginTop: RF(4),
  },
  mt10:{marginTop: RF(10)},
  mt15: {
    marginTop: RF(15),
  },
  mt20: {
    marginTop: RF(20),
  },
  AI: {
    alignItems: 'center',
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  PH: {paddingHorizontal: 0},
  BC: {backgroundColor: dimGray},
  PH15: {paddingHorizontal: RF(15)},
  mb1: {
    marginBottom: RF(5),
  },
  pb2:{paddingBottom: RF(2)},
  mb10:{ marginBottom: RF(5) },
  mV1: {
    marginVertical: RF(5),
  },
  mb25:{ marginBottom: RF(25) },
  pb: {paddingBottom: RF(20)},
  pb35:{paddingBottom: RF(35)},
  pt: {paddingTop: RF(20)},
  mH: {marginHorizontal: RF(15)},
  mR: {marginRight: RF(15)},
  mh5: {marginHorizontal: RF(5)},
  ml80:{marginLeft: RF(80)},
  ph5:{paddingHorizontal:RF(5)},
  bgW:{backgroundColor:white},
  pV15:{paddingVertical: RF(15)},
  mt5:{marginTop:RF(5)},
  LG:{position:'absolute',borderRadius:RF(10),height: RF(200),
  width: RF(150),
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: RF(10)},
  pl15:{paddingLeft: RF(15)},
  flexJus:{flexDirection:'row',justifyContent:'space-evenly'},
  height:{ height: "27%" },
  bR:{borderRadius:RF(10)},
  wd:{width: '95%'}
});

export {GST, RF};
