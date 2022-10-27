import {StyleSheet,Platform} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {white, fieldBG} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: RF(15),
  },
  text: {
    alignSelf: 'flex-start',
    marginTop: RF(10),
  },
  textMini: {
    paddingVertical: RF(15),
  },
  mainContainer: {
    width: '100%',
    borderWidth: RF(2),
    marginTop: RF(10),
  },
  sectionContainer: {
    marginTop: RF(10),
  },
  sectionView: {
    flexDirection: 'row',
    marginTop: RF(3),
    alignItems: 'center',
  },
  innerText: {
    paddingHorizontal: RF(5),
  },
  contactsupp: {
    textDecorationLine: 'underline',
    marginTop: RF(3),
  },
  phoneInputContainer: {
    borderRadius: 10,
    width: '100%',
    height: RF(48),
    marginTop:Platform.OS === 'android'? RF(4):RF(4.58),
  },
  countryPickerBtn: {
    backgroundColor: fieldBG,
    borderTopLeftRadius: RF(15),
    borderBottomLeftRadius: RF(15),
  },
});

export default styles;
