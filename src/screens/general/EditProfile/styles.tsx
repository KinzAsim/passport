import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {white, fieldBG,primaryLight} = THEME.colors;
export const styles = StyleSheet.create({
  container: {
    marginTop: RF(5),
    paddingHorizontal: RF(15),
    backgroundColor: white,
    flex:1
  },
  profilePicView: {
    marginTop: RF(10),
    paddingVertical: RF(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: RF(58),
    height: RF(58),
    borderRadius: RF(58 / 2),
  },
  profileTxt: {
    paddingLeft: RF(10),
  },
  inputBreakView: {
    flexDirection: 'row',
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
  btnView: {
    paddingBottom: RF(20),
    height:RF(150),
    justifyContent:'flex-end'
  },
  phoneInputContainer: {
    borderRadius: 10,
    width: '100%',
    height: RF(48),
    marginTop:RF(4),
    backgroundColor:primaryLight,
  },
  countryPickerBtn: {
    backgroundColor: fieldBG,
    borderTopLeftRadius: RF(15),
    borderBottomLeftRadius: RF(15),
    width: RF(42),
  },
  sec1View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
