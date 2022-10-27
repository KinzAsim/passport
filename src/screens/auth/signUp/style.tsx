import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {primary, white, fieldBG,primaryLight,dimGray} = THEME.colors;

export const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: white,
  },
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: RF(15),
    paddingBottom: RF(20),
  },
  text: {
    alignSelf: 'flex-start',
    marginTop: RF(15),
  },
  innerText: {
    marginTop: RF(10),
  },
  lastLineView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(15),
  },
  signUpTxt: {
    color: primary,
    paddingHorizontal: RF(10),
  },
  caption: {
    marginTop: RF(10),
    paddingVertical: RF(10),
  },
  phoneInputContainer: {
    borderRadius: 10,
    width: '100%',
    height: RF(48),
    backgroundColor:primaryLight,
  },
  countryPickerBtn: {
    backgroundColor: fieldBG,
    borderTopLeftRadius: RF(15),
    borderBottomLeftRadius: RF(15),
  },
  actionSheet: {
    backgroundColor: dimGray,
    paddingHorizontal: RF(15),
    marginTop: 0,
    paddingBottom:RF(30)
  },
});
