import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {primary, white, dimGray} = THEME.colors;

export const styles = StyleSheet.create({
  container: {backgroundColor: dimGray},
  img: {
    width: '100%',
    height: RF(200),
    marginBottom: RF(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  optBtn: {
    borderRadius: 20,
    backgroundColor: primary,
    height: RF(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RF(5),
    marginTop: RF(10),
  },
  btnView: {
    backgroundColor: white,
    width: RF(60),
    height: RF(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RF(5),
    elevation: 5,
    borderRadius: 10,
    marginVertical: RF(5),
    marginTop: RF(10),
  },
  detailView: {
    marginTop: RF(20),
    backgroundColor: dimGray,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RF(15),
    marginHorizontal: RF(15),
  },
  brandImg: {
    width: RF(100),
    height: RF(50),
  },
  brandImgView: {
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    width: RF(130),
    height: RF(100),
    borderRadius: 20,
    marginTop: RF(5),
    marginLeft: RF(15),
    marginBottom: RF(10),
  },

  backNevigationPics: {
    width: RF(40),
    height: RF(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(40),
    backgroundColor: white,
    marginLeft: RF(15),
  },
  likeView: {
    width: RF(40),
    height: RF(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(40),
    backgroundColor: white,
    marginRight: RF(15),
  },
  closeImg: {
    width: RF(11.9),
    height: RF(11.9),
  },
  submitReviewPic: {
    width: RF(17.31),
    height: RF(17.31),
  },
  submitRView: {
    flexDirection: 'row',
    paddingRight: RF(5),
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 50,
  },
});
export default styles;
