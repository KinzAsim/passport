import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {dimGray, white, fieldBG, primaryLight, black} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RF(15),
    paddingTop: RF(10),
    marginTop: RF(3),
    backgroundColor: white,
  },
  btnView: {
    paddingBottom: RF(60),
  },
  mainMiniView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  priText: {
    textDecorationLine: 'underline',
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  padView: {
    height: RF(200),
    paddingVertical: RF(20),
    backgroundColor: dimGray,
    borderRadius: RF(10),
    marginVertical: RF(10),
  },
  phoneInputContainer: {
    // paddingTop: RF(5),
    borderRadius: 10,
    width: '100%',
    height: RF(48),
    marginTop: -17,
  },
  countryPickerBtn: {
    backgroundColor: fieldBG,
    borderTopLeftRadius: RF(15),
    borderBottomLeftRadius: RF(15),
  },
  actionsheet: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
  actionMini: {
    paddingBottom: RF(20),
  },
  actionMiniView: {
    paddingVertical: RF(10),
  },
  tagInput: {
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  text: {
    width: '100%',
    backgroundColor: primaryLight,
    color: black,
    fontSize: RF(14),
    paddingVertical: RF(14),
    borderRadius: 15,
    paddingLeft: RF(15),
    marginTop: RF(5),
  },
  actionSheet: {
    paddingVertical: RF(5),
  },
  actionSheetView: {
    flexDirection: 'row',
    paddingVertical: RF(10),
    alignItems: 'center',
    borderBottomWidth: RF(1),
    justifyContent: 'space-around',
    paddingHorizontal: RF(20),
    paddingBottom: RF(20),
  },
  miniAccView: {
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: THEME.colors.primaryLight,
    height: RF(70),
    width: RF(70),
    borderRadius: RF(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadCont: {
    position: 'relative',
    height: RF(60),
    width: RF(60),
    margin: RF(10),
    borderStyle: 'dotted',
    borderWidth: RF(2),
    borderColor: THEME.colors.secondary,
    borderRadius: RF(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: RF(5),
  },
  uploadItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    right: RF(-5),
    top: RF(-10),
    backgroundColor: THEME.colors.red,
    borderRadius: RF(10),
    zIndex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
