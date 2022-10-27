import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {primary, white, dimGray} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: dimGray,
  },
  innerView: {
    paddingLeft: RF(10),
    justifyContent: 'center',
    // backgroundColor:'red',
    width:'80%'
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
  dividerView: {width: '100%', height: RF(2), padding: RF(20)},
  wrapperView: {paddingTop: 0, backgroundColor: dimGray},
  addres:{paddingVertical: 3,width:'90%'}
});

export default styles;
