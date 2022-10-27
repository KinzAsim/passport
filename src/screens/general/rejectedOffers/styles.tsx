import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {dimGray, dimGreen} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: dimGray,
    paddingTop: RF(20),
    paddingLeft: RF(10),
    flex: 1,
  },
  bgImg: {
    height: RF(200),
    width: RF(150),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RF(10),
    overflow: 'hidden',
    marginBottom: RF(10),
  },
  outerInnerRec: {
    backgroundColor: dimGreen,
    borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    padding: RF(3),
    marginBottom: RF(7),
    width: '95%',
  },
  innerRecStyle: {
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 2,
    backgroundColor: dimGreen,
    borderRadius: 10,
    paddingHorizontal: RF(10),
    paddingVertical: RF(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskImg: {
    width: RF(35),
    height: RF(35),
    borderRadius: 10,
    marginBottom: RF(5),
  },
  bR: {
    borderRadius: 10,
  },
  nameView: {
    backgroundColor: '#000',
    paddingHorizontal: RF(8),
    paddingVertical: RF(2),
    borderRadius: RF(10),
    marginBottom: RF(7),
    marginHorizontal: RF(1),
  },
});
