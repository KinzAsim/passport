import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {primary, white, dimGray} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: dimGray,
    // paddingTop: RF(20),
    alignItems:'center',justifyContent:'center',flex:1
  },
  innerView: {
    paddingLeft: RF(10),
    justifyContent: 'center',
  },
  mainView: {
    backgroundColor: white,
    padding: RF(20),
    flexDirection: 'row',
  },
  img: {width: RF(70), height: RF(70), borderRadius: 15},
  dividerView: {width: '100%', height: RF(2)},
  wrapperView: {paddingTop: 0, backgroundColor: dimGray},
});

export default styles;
