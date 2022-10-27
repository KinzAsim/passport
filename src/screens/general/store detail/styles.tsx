import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
const {primary, white, dimGray} = THEME.colors;

export const styles = StyleSheet.create({
  container: {backgroundColor: 'transparent', paddingBottom: RF(10)},
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
    backgroundColor: primary,
    width: RF(70),
    height: RF(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RF(10),
    borderRadius: RF(5),
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
    marginHorizontal: RF(10),
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
  reviewView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
  },
  ratingView: {flex: 0.5, alignItems: 'center', justifyContent: 'center'},
  innerReviewView: {
    flex: 0.5,
    // justifyContent: 'center',
    // paddingLeft: RF(15),
  },
  progressBar: {
    height: RF(5),
    alignSelf: 'center',
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
  lastBtnView:{paddingHorizontal: RF(15), paddingBottom: RF(30),flexDirection:'row'}
});
export default styles;
