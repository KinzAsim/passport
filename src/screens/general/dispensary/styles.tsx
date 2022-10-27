import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {dimGray, white} = THEME.colors;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dimGray,
    paddingTop: RF(20),
    alignItems: 'center',
  },
  mainContainer: {
    marginBottom: RF(15),
    backgroundColor: dimGray,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RF(15),
    paddingHorizontal: RF(10),
  },
  imgMainView: {
    backgroundColor: white,
    borderRadius: 15,
    padding:RF(15),
    marginBottom:RF(15)
  
  },
  sectionImg: {
    width: '100%',
    height: RF(100),
    borderRadius:RF(15)
  },
  btnView: {
    flex:1,
    paddingBottom: RF(20),
    marginHorizontal:RF(15),
    justifyContent:'flex-end'
  },
});
