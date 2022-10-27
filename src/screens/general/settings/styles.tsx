import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {white} = THEME.colors;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImg: {
    marginTop: RF(40),
    width: RF(100),
    height: RF(100),
    alignSelf: 'center',
    marginBottom: RF(15),
  },
  logoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSheet: {
    backgroundColor: white,
  },
  actionSheetPhoto: {
    marginTop: RF(30),
    width: RF(112.33),
    height: RF(113.2),
    alignSelf: 'center',
  },
  AccTxt: {
    marginTop: RF(15),
    alignSelf: 'center',
  },
  AccTxtMini: {
    marginTop: RF(10),
    alignSelf: 'center',
  },
  AccTxtMini1: {
    alignSelf: 'center',
  },
  btnView: {
    paddingHorizontal: RF(15),
    paddingBottom: RF(20),
  },
});
