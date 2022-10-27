import {StyleSheet, Platform, Dimensions} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {primary, white, dimGray} = THEME.colors;

// const {height, width} = useWindowDimensions();
export const styles = StyleSheet.create({
  listView: {
    height: RF(250),
    width: RF(180),
    marginRight: RF(10),
    borderRadius: 20,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiper: {backgroundColor: dimGray, height: RF(230)},
  mainContainer: {
    backgroundColor: white,
  },
  img: {
    width: RF(20),
    height: RF(18),
  },
  bell: {
    width: RF(20),
    height: RF(23),
    marginHorizontal: RF(20),
  },
  bImg: {
    width: RF(110),
    height: RF(163),
    marginTop: RF(3),
  },
  imgContainer: {
    marginTop: RF(20),
    width:
      Platform.OS === 'android'
        ? Dimensions.get('window').width - RF(30)
        : Dimensions.get('window').width - RF(20),
    height: RF(180),
    backgroundColor: primary,
    borderRadius: RF(8),
    padding: RF(10),
    marginHorizontal: Platform.OS === 'android' ? RF(15) : RF(10),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btn: {
    marginTop: RF(10),
    width: RF(90),
    height: RF(30),
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  cardItemViewIn: {
    marginTop: RF(5),
    height: RF(8),
    paddingLeft: RF(25),
  },
  cardItemViewOut: {
    marginTop: RF(5),
    height: RF(8),
    width: RF(8),
  },
  cardView: {
    paddingTop: 0,
    backgroundColor: dimGray,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: RF(30),
    flex: 1,
  },
  customText: {
    width: RF(140),
    marginBottom: RF(10),
  },
  headerView: {backgroundColor: white, paddingTop: RF(20)},
  pagination: {
    alignSelf: 'flex-start',
    marginLeft: RF(22),
    bottom: RF(35),
  },
});
export default styles;
