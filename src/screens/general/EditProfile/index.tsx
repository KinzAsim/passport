import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  View,
  Platform,
  ScrollView,
  Alert,
  Text,
  PermissionsAndroid,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {styles} from './styles';
import CustomText from '../../../shared/components/customText';
import {
  RF,
  showToast,
  THEME,
  GST,
  navigationRef,
  sendCode,
} from '../../../shared/exporter';
import Input from '../../../shared/components/input';
import Button from '../../../shared/components/button';
import {TextInput} from 'react-native-gesture-handler';
import CusAddress from '../../../shared/components/CusAddress';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CAMERAOPTIONS} from '../../../shared/cameraOptions/index';
import {useDispatch, useSelector} from 'react-redux';
import CustomPhoneInput from '../../../shared/components/customPhoneInput/customPhoneInput';
import DatePicker from 'react-native-date-picker';
import {Formik} from 'formik';
import {editProfileSchema} from '../../../shared/utils/validations';
import {formateaddress} from '../../../shared/utils/contsants';
import moment from 'moment';
import {updateProfile} from '../../../shared/exporter';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import RNFetchBlob from 'rn-fetch-blob';
import {setUser} from '../../../shared/redux/reducers/userReducer';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Entypo';
import Camera from 'react-native-vector-icons/AntDesign';
import DropDownRow from '../../../shared/components/DropDownRow/view';
import DropDown  from "../../../shared/components/DropDown";

const {primaryDark, gray, primaryLight, black, primary} = THEME.colors;

const EditProfile = ({navigation}: any) => {
  const {user,authToken} = useSelector((state: any) => state.root.user);

  const [updateLoading, setupdateLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [Address, setAddress] = useState(user?.address ? user?.address : '');
  const [city, setCity] = useState(user?.city);
  const [zip_code, setZip_code] = useState(user?.zip_code);
  const [input, setInput] = useState(user?.date_of_birth);
  const [lat, setLat] = useState(user?.lat);
  const [lon, setLon] = useState(user?.lon);
  const [country, setCountry] = useState(user?.country);
  const [state, setState] = useState(user?.state);
  const [gender, setGender] = useState(user?.gender);
  const ref = useRef<any>();
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState<any>({
    uri: user?.image_path,
  });
  

  const AddressRef = React.useRef<any>(null);
  const ActRef = React.useRef<any>(null);

  React.useEffect(() => {
    console.log("authToken ====>>>>",authToken);
    AddressRef?.current?.setAddressText(user?.address ? user?.address : '');
    // formatPhoneNumber("+12345678900");
  }, []);
  const [profilestate, setstte] = React.useState(false);
  const initialValues = {
    fullName: user?.name,
    phoneNumber: user?.phone_number,
    middleName: user?.middle_name,
    lastName: user?.last_name,
    email: user?.email,
  };
  
  const galleryImageHandler = () => {
    launchImageLibrary(CAMERAOPTIONS, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        setProfilePicture(res?.assets[0]);
        setstte(true);
      }
      ActRef?.current?.hide();
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
    if(Platform.OS === "ios"){
      galleryImageHandler();
    }else{
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
    }
    
  };
  const cameraImageHandler = () => {
    launchCamera(CAMERAOPTIONS, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        console.log('ress...', res);
        setProfilePicture(res?.assets[0]);
        setstte(true);
      }
      ActRef?.current?.hide();
    });
  };

  const formatPhoneNumber = (phone:any) =>{
      let lastTen = phone.substr(phone.length - 10);
      return lastTen.match(/\d{3}(?=\d{2,3})|\d+/g).join("-");
  }

  const handleAddress = (value: any, data: any) => {
    const formateaddre = formateaddress(value);
    setCountry(formateaddre?.country);
    setCity(formateaddre?.city);
    setZip_code(formateaddre?.zipcode);
    setState(formateaddre?.state);
    setLat(value?.geometry?.location?.lat);
    setLon(value?.geometry?.location?.lng);
    setAddress(data?.description);
  };
  const uriwrap = (uri: any) => {
    return Platform.OS === 'ios' ? uri?.replace('file://', '') : uri;
  };
  const submitHandler = (values: any) => {
      // Alert.alert("Ok")
    const {fullName, phoneNumber, middleName, lastName} = values;
    // setupdateLoading(true);

    let params: any = [
      {name: 'is_notifiable', data: '1'},
      {name: 'name', data: fullName},
      {name: 'middle_name', data: middleName},
      {name: 'last_name', data: lastName},
      {name: 'phone_number', data: phoneNumber},
      {name: 'lat', data: String(lat)},
      {name: 'address', data: Address},
      {name: 'city', data: city},
      {name: 'state', data: state},
      {name: 'country', data: country},
      {name: 'gender', data: gender},
    ];
    zip_code && params.push({name: 'zip_code', data: zip_code});
    input && params.push({name: 'date_of_birth', data: input});


    if (profilestate) {
      params.push({
        name: 'img',
        type: 'image/png',
        filename: 'userPhoto',
        data: RNFetchBlob.wrap(
          uriwrap(
            Platform.OS === 'android'
              ? profilePicture.uri
              : decodeURIComponent(profilePicture.uri),
          ),
        ),
      });
    }
    console.log('params', params);

    updateProfile(params)
      .then(response => response.json())
      .then(RetrivedData => {

        if (RetrivedData?.status && RetrivedData?.data?.is_phone_verified) {

          console.log('RetrivedData', RetrivedData);
      
          dispatch(setUser(RetrivedData?.data));
          showToast('Success!', 'Profile has been updated', true);
          setTimeout(()=>{
            navigation.goBack();
          },500)
        }else if(RetrivedData?.status && !RetrivedData?.data.is_phone_verified ){
          console.log('RetrivedData', RetrivedData);

          let data = {emailOrPhone: phoneNumber, type: 'phone_number'};

          sendCode(data)
          .then(res => {
            setTimeout(()=>{
              navigation.navigate('VerifyPhoneNumber',{phone:phoneNumber});
            },500);
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      }
      })
      .catch(err => {
        showToast('Failed!', 'Profile has not updated', false);
      })
      .catch(err => {
        showToast('Failed!', 'Profile has not updated', false);
      })
      .finally(() => setupdateLoading(false));
    // navigation.goBack();
  };
  const onClick = () => {
    setOpen(true);
  };

  const renderDropDownRow = (rowData:any,highlighted:any) => {
    return (
        <DropDownRow
            highlighted={highlighted}
            text={rowData}
        />
    );
};
const onDropSelect =(value:any)=> {
  // console.log("on value select ===>>>",value);
  setGender(value);
}
const genderData =["Male","Female"]
  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title={'Edit Profile'} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}>
        <View style={styles.profilePicView}>
          <FastImage
            style={styles.profilePic}
            source={{uri: profilePicture?.uri}}
          />
          <Pressable onPress={() => ActRef?.current?.show()}>
            <CustomText
              size={12}
              style={styles.profileTxt}
              bold
              color={primaryDark}>
              Change Profile
            </CustomText>
          </Pressable>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={editProfileSchema}
          onSubmit={submitHandler}>
          {({values, errors, touched, handleChange, handleSubmit}) => (
            <>
              <Input
                value={values.fullName}
                title={'Full Name'}
                placeholder={'First name'}
                onChangeText={handleChange('fullName')}
                error={
                  touched.fullName && errors.fullName ? errors.fullName : ''
                }
              />
              <Input
                value={values.middleName}
                title={'Middle Name'}
                placeholder={'Middle name'}
                onChangeText={handleChange('middleName')}
                error={
                  touched.middleName && errors.middleName
                    ? errors.middleName
                    : ''
                }
              />
              <Input
                value={values.lastName}
                title={'Last Name'}
                placeholder={'Last name'}
                onChangeText={handleChange('lastName')}
                error={
                  touched.lastName && errors.lastName ? errors.lastName : ''
                }
              />
              <Input
                value={values.email}
                title={'Email'}
                placeholder={'Email'}
                onChangeText={handleChange('email')}
                error={touched.email && errors.email ? errors.email : ''}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                editable={false}
              />
                {/* <Pressable
                  // hitSlop={{top:20, bottom:20, left:20, right:20}}
                  onPress={onClick}> */}
                <Input
                  title={'Date Of Birth'}
                  editable={false}
                  placeholder={'Select date'}
                  value={moment(input).format('DD MMM YYYY')}
                  onPressIn={() => setOpen(true)}
                  showSoftInputOnFocus={false}
                  caretHidden={true}
                />
                {/* </Pressable> */}

                <CustomText
                color='gray'
                style={{paddingTop:RF(5)}}
                >
                    {"Gender"}
                </CustomText>

                {
                  <View style={{height:RF(40)}}>
                    <DropDown
                    onSelect={(index:any, value:any) => {onDropSelect(value);}}
                    defaultIndex={0}
                    // ref={(ref) => {this.state.modalRef = ref}}
                    defaultValue={gender}
                    renderButtonText={(rowDta:any) => {return (rowDta)}}
                    options={genderData}
                    renderRow={(data:any,index:any,highlighted:any) => renderDropDownRow(data,highlighted)}
                     />
                  </View>
                }
                <CustomPhoneInput
                disabled={true}
                  defaultCode={'US'}
                  title="Phone Number"
                  phoneInputContainer={styles.phoneInputContainer}
                  countryPickerBtn={styles.countryPickerBtn}
                  value={values.phoneNumber.length > 9 && formatPhoneNumber(values.phoneNumber)}
                  placeholder={'Phone no.'}
                  onChangeText={handleChange('phoneNumber')}
                  error={
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
                      : ''
                  }
                />

              <CusAddress
                addressRef={AddressRef}
                showTitle
                handleAddress={handleAddress}
              />
              <View style={styles.sec1View}>
                <Section
                  editable={false}
                  value={city}
                  title={'City'}
                  placeholder={'City'}
                  showSoftInputOnFocus={true}
                  caretHidden={false}
                />
                <Section
                  title={'Zip Code'}
                  placeholder={'Zip Code'}
                  value={zip_code}
                  keyboardType={'numeric'}
                  onChangeText={(v: any) => setZip_code(v)}
                  showSoftInputOnFocus={true}
                  caretHidden={false}
                />
              </View>
              <View style={styles.btnView}>
                <Button text={'Save Changes'} onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
        <LoadingOverlay loading={updateLoading} />

        {ActRef && (
          <ActionSheet
            headerAlwaysVisible
            closeOnPressBack
            closeOnTouchBackdrop
            ref={ActRef}
            containerStyle={styles.actionsheet}>
            <Pressable
              onPress={() => ActRef.current?.hide()}
              style={styles.actionSheetView}>
              <Pressable
                onPress={requestCameraPermission}
                style={styles.miniAccView}>
                <Camera name="camera" size={20} color={THEME.colors.primary} />
                <Text style={{fontSize: RF(14), color: THEME.colors.gray}}>
                  Open Camera
                </Text>
              </Pressable>
              <Pressable
                onPress={requestGalleryPermission}
                style={styles.miniAccView}>
                <Icon name="images" size={20} color={THEME.colors.primary} />
                <Text style={{fontSize: RF(14), color: THEME.colors.gray}}>
                  Open Gallery
                </Text>
              </Pressable>
            </Pressable>
          </ActionSheet>
        )}
        {open && (
          <DateOfBirth
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setInput(moment(date).format('YYYY-MM-DD'));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        )}
      </KeyboardAwareScrollView>
    </>
  );
};

export const Section = ({
  title,
  placeholder,
  value,
  keyboardType,
  onPressIn,
  onChangeText,
  editable,
  showSoftInputOnFocus,
  caretHidden,
}: any) => {
  return (
    <View>
      <CustomText style={{marginTop: RF(10)}} color={gray}>
        {title}
      </CustomText>
      <TextInput
        onPressIn={onPressIn}
        editable={editable}
        placeholderTextColor={gray}
        showSoftInputOnFocus={showSoftInputOnFocus}
        caretHidden={caretHidden}
        style={{
          width: RF(147),
          backgroundColor: primaryLight,
          color: black,
          fontSize: RF(14),
          paddingVertical: Platform.OS === 'ios' ? RF(14) : RF(12),
          borderRadius: 15,
          paddingLeft: RF(15),
          marginTop: RF(5),
        }}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const DateOfBirth = ({
  open,
  date,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  date: any;
  onCancel: () => any;
  onConfirm: (data: any) => any;
}) => {
  return (
    <DatePicker
      modal
      mode="date"
      open={open}
      date={date}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default EditProfile;
