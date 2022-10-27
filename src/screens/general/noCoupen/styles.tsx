import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {primary, white, dimGray} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: dimGray,
  },
  sadPic: {
    width: RF(52.92),
    height: RF(52.92),
  },
});
