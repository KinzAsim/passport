import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../exporter';

const {white, dimGray} = THEME.colors;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RF(15),
    backgroundColor: white,
  },
  inputtitle: {
    marginTop: RF(20),
  },
  attachmentView: {
    marginTop: RF(8),
    backgroundColor: dimGray,
    borderRadius: RF(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RF(20),
  },
  clipPic: {
    width: RF(12.99),
    height: RF(14.85),
  },
  actionSheet: {
    paddingVertical: RF(5),
  },
  actionSheetView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: RF(1),
    justifyContent: 'space-around',
    paddingHorizontal: RF(20),
    paddingTop: RF(10),
    paddingBottom: RF(20),
  },
  miniAccView: {
    alignItems: 'center',
  },
  view: {
    height: RF(2),
    backgroundColor: dimGray,
  },
  img: {
    width: RF(100),
    height: RF(100),
    marginTop: RF(20),
    borderRadius: RF(10),
  },
  close: {
    position: 'absolute',
    top: RF(15),
    left: RF(88),
    backgroundColor: THEME.colors.dullGrey,
    borderRadius: RF(10),
    zIndex: 1,
  },
  attPhoto: {
    flexDirection: 'row',
  },
  actionsheet: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
