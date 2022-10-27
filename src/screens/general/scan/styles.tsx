import {Dimensions, StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {gray, primary, white, red, green} = THEME.colors;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '',
  },
  scanImg: {
    width: RF(300),
    height: RF(330),
    // position: 'absolute',
    marginVertical: RF(10),
  },
  textView: {alignItems: 'center', justifyContent: 'center', top: '12%'},
  imgBG: {
    width: width,
    height: height,
  },
  cameraView: {
    width: width,
    height: height,
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  },
});
