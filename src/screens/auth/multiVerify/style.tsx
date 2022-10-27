import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {primary, white, lightSilver, dullLightGrey} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightSilver,
    paddingHorizontal: RF(15),
    paddingBottom: RF(20),
    
  },
  sectionView:{
    flexDirection: 'row',
    marginTop: RF(3),
    alignItems: 'center',
    justifyContent:"center"
  },
  bgColor: {
    backgroundColor: lightSilver,
  },
  text: {
    alignSelf: 'center',
    marginTop: RF(18),
    
  },
  innerText: {
    marginTop: RF(10),
    marginBottom: RF(2),
  },
  innerText1: {
    marginTop: RF(15),
    alignSelf: 'center',
  },
  policiesView: {
    marginTop: RF(15),
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
  contentTxt: {
    color: primary,
    alignSelf: 'center',
  },
  codeFieldRoot: {
    paddingVertical: RF(15),
  },
  cell: {
    width: RF(39),
    height: RF(30),
    fontSize: RF(20),
    borderColor: '#00000030',
    textAlign: 'center',
    backgroundColor: '#E9E9E9',
    marginHorizontal: RF(30),
  },
  focusCell: {
    borderColor: '#000',
  },
  dividerView: {
    width: '75%',
    marginVertical: RF(20),
    borderWidth: 0.5,
    alignSelf: 'center',
    borderColor: dullLightGrey,
  },
});
