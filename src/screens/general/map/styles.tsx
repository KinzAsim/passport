import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {primary, white, dimGray, primaryLight} = THEME.colors;

export const styles = StyleSheet.create({
  headerView: {backgroundColor: white, paddingTop: RF(20)},
  btn: {
    width: RF(100),
    height: RF(35),
    marginHorizontal: RF(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RF(8),
    bottom: 0,
    zIndex: 100,
    elevation: RF(5),
    shadowColor: '#000',
    shadowOffset: {width: 0.1, height: 0.1},
    shadowOpacity: 0.1,
  },
  listView: {
    position: 'absolute',
    paddingTop: RF(20),
  },
  Mycircle: {
    width: RF(70),
    height: RF(70),
    backgroundColor: 'rgba(231, 244, 191, 1)',
    borderRadius: RF(35),
    borderWidth: 1,
    borderColor: primary,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: RF(50),
    height: RF(50),
    backgroundColor: 'rgba(231, 244, 191, 1)',
    borderRadius: RF(35),
    borderWidth: 1,
    borderColor: primary,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  marker: {
    width: RF(200),
    alignItems: 'center',
    height: RF(50),
    alignSelf: 'center',
  },
  pointerImg: {
    width: RF(100),
    height: RF(40),
    alignItems: 'center',
    paddingVertical: RF(10),
  },
  dot: {
    width: RF(10),
    height: RF(10),
    backgroundColor: primary,
    borderRadius: 100,
    position: 'absolute',
    marginTop: 135,
    zIndex: 9999,
    marginLeft: 135,
  },
  oval: {
    width: RF(30),
    height: RF(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  locInd: {
    width: RF(10),
    height: RF(10),
  },
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom:10,
    zIndex:1,
  },
  innerView: {
    padding: RF(10),
    justifyContent: 'center',
  },
  mainView: {
    backgroundColor: white,
    padding: RF(10),
    width:RF(300),
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: RF(5),
    marginHorizontal: RF(10),
  },
  img: {width: RF(70), height: RF(70), borderRadius: 15,marginTop:RF(5)},
  dividerView: {width: '100%', height: RF(2), padding: RF(20)},
  wrapperView: {paddingTop: 0, backgroundColor: dimGray},
  addres:{paddingVertical: 3,width:'90%'}
});
export default styles;
