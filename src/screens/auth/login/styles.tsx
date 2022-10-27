import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

const {white, black, dullGrey} = THEME.colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: RF(15),
    paddingTop: RF(40),
  },
  logoView: {
    marginTop: RF(40),
    width: RF(100),
    height: RF(100),
    alignSelf:'center',
  },
  imgView: {
    alignItems: 'center',
  },
  text: {
    marginTop: RF(20),
    alignSelf:'center',
  },
  innerText: {
    marginTop: RF(10),
    marginBottom: RF(10),
    alignSelf:'center',
  },
  innerView: {
    borderWidth: 2,
    flex: 1,
  },
  passwordText: {
    alignSelf: 'flex-end',
    marginTop: RF(20),
    marginBottom: RF(5),
  },
  OrText: {
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: white,
  },
  btnText: {
    color: black,
  },
  line: {
    width: '30%',
    borderWidth: 0.6,
    borderColor: dullGrey,
    backgroundColor: '#F7F7F7',
  },
  view: {
    marginTop: RF(40),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lineText: {
    paddingHorizontal: RF(10),
  },
  img: {
    width: RF(30),
    height: RF(30),
    borderRadius: 100,
  },
  imgInsta: {
    width: RF(30),
    height: RF(30),
    borderRadius: 100,
    marginHorizontal: RF(5),
  },
});
