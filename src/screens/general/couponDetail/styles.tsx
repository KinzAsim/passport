import {StyleSheet, Dimensions, Platform} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {gray, primary, white, red, green,dimGray,dimGreen} = THEME.colors;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    alignSelf: 'center',
    paddingTop: RF(30),
    paddingBottom: RF(10),
  },
  textTop: {
    alignSelf: 'center',
    paddingBottom: RF(20),
  },
  imgView: {
    height: RF(430),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:RF(10),
    marginTop:RF(40)
  },
  offerImage: {
    width: '100%',
    height: Platform.OS == 'ios' ? windowHeight / 1.6 : windowHeight / 1.5,
    borderRadius: RF(10),
    alignItems:'center',
    justifyContent:'center',
  },
  text: {
    marginLeft: RF(15),
    top: RF(30),
  },
  iconLeft: {
    width: RF(67),
    height: RF(67),
  },
  iconRight: {
    width: RF(67),
    height: RF(67),
  },
  btnView: {
    width: RF(50),
    height: RF(50),
    borderRadius: 100,
    padding: RF(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: dimGray,
    paddingVertical: 30,
  },
  wrapperLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    right: -10,
    bottom: RF(135),
  },
  wrapperRight: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    top: RF(160),
    left: -10,
  },
  mainView:{flex: 1, backgroundColor: dimGray},
  bR: {
    borderRadius: 10,
  },
  outerInnerRec: {
    backgroundColor: dimGreen,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: RF(7),
    marginBottom: RF(20),
    width:'90%',
  },
  innerRecStyle: {
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 2,
    backgroundColor: dimGreen,
    borderRadius: 10,
    paddingHorizontal: RF(10),
    paddingVertical: RF(10),
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
  },
  maskImg: {
    width: RF(45),
     height: RF(45), 
     borderRadius: 10,
     marginBottom:RF(20)
    },
  btnView:{
    flex:1,
    justifyContent:'flex-end',
    paddingBottom:RF(30),
    marginHorizontal:RF(15)}
});
