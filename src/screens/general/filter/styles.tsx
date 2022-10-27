import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {grey, white} = THEME.colors;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RF(15),
  },
  viewSection: {
    backgroundColor: grey,
    borderRadius: RF(20),
    width: RF(100),
    alignItems: 'center',
    marginRight: RF(6),
    marginVertical: RF(8),
    paddingVertical: RF(9),
  },
  miniView: {
    width: '100%',
    paddingBottom: RF(5),
  },
  brandsView: {
    backgroundColor: white,
    borderRadius: RF(5),
    alignItems: 'center',
    paddingHorizontal: RF(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RF(10),
    paddingVertical:RF(10),
  },
  dropdownPic: {
    width: RF(24),
    height: RF(24),
  },
  actionSheet: {
    backgroundColor: white,
    paddingHorizontal: RF(15),
  },
  actionSheetView: {
    marginVertical: RF(7),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:RF(15)
  },
});
