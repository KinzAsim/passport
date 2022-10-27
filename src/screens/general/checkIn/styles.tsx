import {RF, THEME} from '../../../shared/exporter';
import {StyleSheet} from 'react-native';
const {dimGray,white} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: dimGray,
    paddingTop: RF(10),
  },
  text: {
    paddingHorizontal: RF(25),
    marginTop: RF(15),
  },
  mainContainer: {
    marginBottom: RF(15),
    backgroundColor: dimGray,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RF(15),
    paddingHorizontal: RF(10),
  },
  imgMainView: {
    backgroundColor: white,
    width: RF(250),
    height: RF(220),
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: RF(15),
    marginHorizontal: RF(10),
  },
  sectionImg: {
    width: RF(220),
    height: RF(120),
    borderRadius: 15,
  },
  mainView:{
    width: RF(220),
    alignItems: 'center',
    paddingVertical: 3,
    marginTop: RF(1),
  }
});
