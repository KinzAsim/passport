import React, {useState, useRef} from 'react';
import {
  Pressable,
  View,
  TouchableOpacity,
  Platform,
  Text,
  PermissionsAndroid,
} from 'react-native';
import {styles} from './styles';
import CustomText from '../customText';
import HeaderWrapper from '../headerWrapper';
import Input from '../input';
import Button from '../button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import {supportScheme} from '../../utils/validations';
import {GST, postReview, RF, showToast, THEME} from '../../exporter';
import FastImage from 'react-native-fast-image';
import {clip} from '../../../assets/images';
import ActionSheet from 'react-native-actions-sheet';
import {CAMERAOPTIONS} from '../../../shared/cameraOptions/index';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import SubmitStars from '../ratings';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import Camera from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';

const initialValues = {
  // subjectLine: '',
  content: '',
};
const {primary, gray} = THEME.colors;

const CusSupport = ({
  navigation,
  showRating,
  subject,
  body,
  attachFile,
  title,
  leftIcon,
  buttonTitle,
  btnStyle,
  showRightText,
  type,
  type_id,
  detailData,
  RewiewData,
  showSubjectLine,
}: any) => {
  const [loading, setloading] = useState(false);
  const [defaultRating, setdefaultRating] = useState<Number>(0);
  const [attachment, setAttachment] = useState<any>({});
  const [Subject, setSubject] = useState<any>('');
  const [showCross, setShowCross] = useState<any>(false);
  const [imageState, setImageState] = useState(false);

  const ref = useRef<any>(null);
  const submitHandler = (values: any) => {
    if (defaultRating <= 0 && type !== 'support') {
      showToast('Request Failed', 'Rating is required!', false);
    } else {
      setloading(true);
      const uriwrap = (uri: any) => {
        return Platform.OS === 'ios' ? uri?.replace('file://', '') : uri;
      };
      const {content} = values;

      const params: any = [
        {
          name: 'type',
          data:
            type == 'dispensary'
              ? 'dispensary'
              : type == 'product'
              ? 'product'
              : 'support',
        },
        {
          name: 'type_id',
          data: type === 'support' ? null : String(detailData?.id),
        },
        {name: 'review', data: content},
      ];

      !!defaultRating &&
        params.push({
          name: 'rating',
          data: type == 'support' ? 1 : String(defaultRating),
        });

      if (imageState) {
        params.push({
          name: 'img',
          type: 'image/png',
          filename: 'userPhoto',
          data: RNFetchBlob.wrap(
            uriwrap(
              Platform.OS === 'android'
                ? attachment.uri
                : decodeURIComponent(attachment.uri),
            ),
          ),
        });
      }

      const param2 = {
        rating: type == 'support' ? 1 : String(defaultRating),
        type:
          type == 'dispensary'
            ? 'dispensary'
            : type == 'product'
            ? 'product'
            : 'support',
        type_id: type === 'support' ? null : String(detailData?.id),
        review: content,
      };

      let paramToSend = null;

      if (imageState) {
        paramToSend = params;
      } else {
        paramToSend = param2;
      }

      postReview(paramToSend, imageState)
        .then((res: any) => {
          if (imageState) {
            let resp = JSON.parse(res.data);

            if (resp.status && type === 'dispensary') {
              setTimeout(() => {
                navigation.goBack();
              }, 500);
              showToast('Success!', 'Submitted successfuly', true);
            } else if (resp.status && type === 'product') {
              const temp = [...RewiewData];
              temp.push(resp?.data);
              setTimeout(() => {
                navigation.navigate('SuccessForProductReview', {
                  data: temp,
                });
              }, 500);
              showToast('Success!', 'Submitted successfuly', true);
              // showToast('Failed!!', resp?.message, false);
            } else {
              showToast('Failed!!', res?.data?.message, false);
            }
            setImageState(false);
          } else {
            if (res.data.status && type === 'dispensary') {
              setTimeout(() => {
                navigation.goBack();
              }, 500);
              showToast('Success!', 'Submitted successfuly', true);
            } else if (res.data.status && type === 'product') {
              const temp = [...RewiewData];
              temp.push(res?.data?.data);
              setTimeout(() => {
                navigation.navigate('SuccessForProductReview', {
                  data: temp,
                });
              }, 500);
              showToast('Success!', 'Submitted successfuly', true);
            } else if (res.data.status && type === 'support') {
              showToast('Success!', 'Submitted successfuly', true);
              setTimeout(() => {
                navigation.navigate('Home');
              }, 1000);
            } else {
              showToast('Failed!!', res?.data?.message, false);
            }
          }
        })
        .catch((err: any) => {
          console.log('error', err?.response);

          showToast(
            'Request Failed',
            err?.response?.data.message || 'Server Error',
            false,
          );
        })
        .finally(() => setloading(false));
    }
  };
  const galleryImageHandler = () => {
    launchImageLibrary(CAMERAOPTIONS, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        setAttachment(res?.assets[0]);
        setShowCross(true);
        setImageState(true);
      }
      ref.current?.hide();
    });
  };

  const cameraImageHandler = () => {
    launchCamera(CAMERAOPTIONS, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        setAttachment(res?.assets[0]);
        setShowCross(true);
        setImageState(true);
      }
      ref?.current?.hide();
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Passport Camera Permission',
          message: 'Passport needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        cameraImageHandler();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Passport Storage Permission',
          message: 'Passport needs access to your Storage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Gallery permission given');
        galleryImageHandler();
      } else {
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const onOpenCamera = () => {
    ref.current?.show();
  };

  const setRating = (item: any) => {
    setdefaultRating(item);
  };
  const delPhoto = () => {
    setAttachment({});
    setShowCross(false);
  };
  return (
    <>
      <HeaderWrapper
        showTitle
        title={title}
        showRightText={showRightText}
        showBtnLeft
        leftIcon={leftIcon}
      />
      <View style={styles.view}></View>
      <View style={styles.container}>
        <KeyboardAwareScrollView style={GST.bgW}>
          <Formik
            initialValues={initialValues}
            validationSchema={supportScheme}
            onSubmit={submitHandler}>
            {({values, touched, handleChange, handleSubmit, errors}) => (
              <>
                {showSubjectLine && (
                  <Input
                    title={subject}
                    value={Subject}
                    onChangeText={(e: any) => setSubject(e)}
                  />
                )}
                {showRating && (
                  <>
                    <CustomText style={{paddingVertical: RF(10)}} color={gray}>
                      Your Rating
                    </CustomText>
                    <View style={{flexDirection: 'row'}}>
                      <SubmitStars
                        defaultRating={defaultRating}
                        setDefaultRating={setRating}
                      />
                    </View>
                  </>
                )}
                <Input
                  title={body}
                  value={values.content}
                  multiline={true}
                  onChangeText={handleChange('content')}
                  error={
                    touched.content && errors.content ? errors.content : ''
                  }
                />
                {attachFile && (
                  <>
                    <CustomText
                      size={12}
                      color="#8F92A1"
                      style={styles.inputtitle}>
                      Attach a file
                    </CustomText>
                    <View style={styles.attachmentView}>
                      <CustomText style={GST.pV15} color={gray}>
                        Attachment
                      </CustomText>
                      <Pressable onPress={onOpenCamera} hitSlop={10}>
                        <FastImage style={styles.clipPic} source={clip} />
                      </Pressable>
                    </View>
                    <View style={{backgroundColor: 'red'}}></View>
                    {/* {ref && (
                      <ActionSheet
                        headerAlwaysVisible
                        closeOnPressBack
                        closeOnTouchBackdrop
                        ref={ref}
                        containerStyle={styles.actionSheet}>
                        <Pressable
                          onPress={() => ref.current?.hide()}
                          style={styles.actionSheetView}>
                          <Pressable
                            onPress={galleryImageHandler}
                            style={styles.miniAccView}>
                            <Icon name="images" size={20} color={primary} />
                            <CustomText color={gray} size={14}>
                              Open Gallery
                            </CustomText>
                          </Pressable>
                        </Pressable>
                      </ActionSheet>
                    )} */}
                    {ref && (
                      <ActionSheet
                        headerAlwaysVisible
                        closeOnPressBack
                        closeOnTouchBackdrop
                        ref={ref}
                        containerStyle={styles.actionsheet}>
                        <Pressable
                          onPress={() => ref.current?.hide()}
                          style={styles.actionSheetView}>
                          <Pressable
                            onPress={requestCameraPermission}
                            style={styles.miniAccView}>
                            <Camera
                              name="camera"
                              size={20}
                              color={THEME.colors.primary}
                            />
                            <Text
                              style={{
                                fontSize: RF(14),
                                color: THEME.colors.gray,
                              }}>
                              Open Camera
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={requestGalleryPermission}
                            style={styles.miniAccView}>
                            <Icon
                              name="images"
                              size={20}
                              color={THEME.colors.primary}
                            />
                            <Text
                              style={{
                                fontSize: RF(14),
                                color: THEME.colors.gray,
                              }}>
                              Open Gallery
                            </Text>
                          </Pressable>
                        </Pressable>
                      </ActionSheet>
                    )}
                  </>
                )}
                <View style={styles.attPhoto}>
                  <FastImage
                    source={{uri: attachment?.uri}}
                    style={styles.img}
                  />
                  {showCross && (
                    <TouchableOpacity
                      style={styles.close}
                      onPress={() => delPhoto()}>
                      <Camera name="close" color="black" size={20} />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={btnStyle}>
                  <Button text={buttonTitle} onPress={handleSubmit} />
                </View>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
        <LoadingOverlay loading={loading} />
      </View>
    </>
  );
};

export default CusSupport;
