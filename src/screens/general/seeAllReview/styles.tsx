import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {dimGray} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: dimGray,
    paddingHorizontal:RF(15),
  },
})
export default styles;
