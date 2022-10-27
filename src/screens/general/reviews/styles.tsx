import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {dimGray} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: dimGray,
    paddingTop: RF(20),
    flex: 1,
  },
  bgImg: {
    height: RF(200),
    width: RF(160),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: RF(10),
  },
});
