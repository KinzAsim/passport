import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {white, primary, black} = THEME.colors;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: RF(15),
  },
  scrollView: {
    backgroundColor: white,
  },
  text: {
    marginTop: RF(15),
    color: black,
  },
  innerText: {
    marginTop: RF(10),
  },
  caption: {
    color: primary,
    marginVertical: RF(8),
  },
  btn:{
    marginTop:RF(10)
  }
});
