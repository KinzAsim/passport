import React, {useRef, useState} from 'react';
import {View, ScrollView, LogBox, Platform} from 'react-native';
import {styles} from './style';
import CustomText from '../../../shared/components/customText';
import HeaderWrapper from '../../../shared/components/headerWrapper/index';
import Input from '../../../shared/components/input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from '../../../shared/components/button';
import {Formik} from 'formik';
import {SignUpSchema} from '../../../shared/utils/validations';
import CustomPhoneInput from '../../../shared/components/customPhoneInput/customPhoneInput';
import TermsOfServices from '../../../shared/components/termsOfServices';
import {cross} from '../../../assets/images';
import DatePicker from 'react-native-date-picker';
import {
  register,
  RF,
  showToast,
  THEME,
  sendCode,
} from '../../../shared/exporter';
import {
  formateaddress,
  GOOGLE_MAPS_APIKEY,
} from '../../../shared/utils/contsants';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ActionSheet from 'react-native-actions-sheet';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import {
  setAuthToken,
  setUser,
} from '../../../shared/redux/reducers/userReducer';
import {useDispatch} from 'react-redux';
import moment from 'moment';

const {dimGray, black, lightGray, primaryLight} = THEME.colors;

const signUp = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [Address, setAddress] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [zip_code, setZip_code] = useState();
  const [userToken, setuserToken] = useState(null);
  const [phoneCountryObj, setphoneCountryObj] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const placesRef = useRef(null);
  const dispatch = useDispatch();

  const [openDatePicker, setopenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  LogBox.ignoreAllLogs();
  const initialValues = {
    fullName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  };
  const alreadyAnAccount = () => {
    navigation.navigate('Login');
  };
  const handleAddress = (value: any, data: any) => {
    const formateaddre = formateaddress(value);
    setCountry(formateaddre.country);
    setCity(formateaddre.city);
    setZip_code(formateaddre.zipcode);
    setState(formateaddre.state);
    setLat(value.geometry.location.lat);
    setLon(value.geometry.location.lng);
    setAddress(data.description);
  };
  const navigate = () => {
    navigation.navigate('SignupVerification', {
      email: 'email@yopmail.com',
      phone: 'phoneNumber',
      country: phoneCountryObj,
      token: 'res?.data?.data?._token',
    });
  };

  const submitHandler = (values: any) => {
    if (!checkBox) {
      showPolicyToast();
    } else {
      setLoading(true);
      const {
        fullName,
        email,
        password,
        confirmPassword,
        phoneNumber,
        middleName,
        lastName,
        dateOfBirth,
      } = values;

      const params = {
        name: fullName,
        middle_name: middleName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        password: password,
        password_confirmation: confirmPassword,
        address: Address,
        lat: lat,
        lon: lon,
        city: city,
        state: state,
        country: country,
        zip_code: zip_code,
        date_of_birth: moment(dateOfBirth).format('YYYY-MM-DD'),
      };
      console.log('params', params);

      register(params)
        .then((res: any) => {
          console.log('signup ress...', res.data.data);
          if (res.data.status === false) {
            showToast('Request Failed!', res.data.message, false);
          } else {
            showToast('Success!', 'You have been registered', true);
            // navigation.navigate('SignupVerification', {
            //   email: email,
            //   phone: phoneNumber,
            //   country: phoneCountryObj,
            //   token: res?.data?.data?._token,
            // });
            navigation.navigate('MultiVerify', {
              email: email,
              phone: phoneNumber,
              type:"phone",
              token: res?.data?.data?._token,
            });
          }
        })
        .catch((err: any) => {
          showToast('Request Failed', err?.response.data?.message, false);
        })
        .finally(() => setLoading(false));
    }
  };

  // const verifyEmailPhone = (params: any) => {
  //   sendCode(params)
  //     .then(res => {
  //       console.log('ress....', res?.data);
  //     })
  //     .catch(err => console.log('err....', err));
  // };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowPassword1(!showPassword1);
  };
  const showPolicyToast = () => {
    showToast('Failed!', 'You need to accept policy first.', false);
  };
  const handleCountryChange = (value: any) => {
    setphoneCountryObj(value);
  };

  return (
    <>
      <HeaderWrapper showBtnLeft leftIcon={cross} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        style={styles.bgColor}>
        <View style={styles.container}>
          <CustomText bold size={18} style={styles.text}>
            Create an account
          </CustomText>
          <CustomText size={13} style={styles.innerText}>
            Great, it’s a pleasure to have you here.
          </CustomText>
          <CustomText size={13}>Let’s get you setup.</CustomText>
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={submitHandler}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <>
                <Input
                  value={values.fullName}
                  placeholder={'First name'}
                  onChangeText={handleChange('fullName')}
                  error={
                    touched.fullName && errors.fullName ? errors.fullName : ''
                  }
                />
                <Input
                  value={values.middleName}
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
                  placeholder={'Last name'}
                  onChangeText={handleChange('lastName')}
                  error={
                    touched.lastName && errors.lastName ? errors.lastName : ''
                  }
                />
                <Input
                  value={values.dateOfBirth}
                  placeholder={'Date of Birth'}
                  showSoftInputOnFocus={false}
                  caretHidden={true}
                  onPressIn={() => setopenDatePicker(true)}
                  onChangeText={handleChange('dateOfBirth')}
                  error={
                    touched.dateOfBirth && errors.dateOfBirth
                      ? errors.dateOfBirth
                      : ''
                  }
                />
                {openDatePicker && (
                  <DatePicker
                    modal
                    mode="date"
                    open={openDatePicker}
                    date={date}
                    onConfirm={date => {
                      setopenDatePicker(false);
                      setDate(date);
                      setFieldValue(
                        'dateOfBirth',
                        moment(date).format('DD MMM YYYY'),
                      );
                    }}
                    onCancel={() => {
                      setopenDatePicker(false);
                    }}
                  />
                )}
                <Input
                  value={values.email}
                  placeholder={'Email'}
                  onChangeText={handleChange('email')}
                  error={touched.email && errors.email ? errors.email : ''}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                />
                <CustomPhoneInput
                  defaultCode={'US'}
                  countryPickerBtn={styles.countryPickerBtn}
                  phoneInputContainer={styles.phoneInputContainer}
                  value={values.phoneNumber}
                  placeholder={'Phone No.'}
                  onChangeText={handleChange('phoneNumber')}
                  onChangeCountry={handleCountryChange}
                  error={
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
                      : ''
                  }
                />
                <View style={{flex: 1, paddingTop: 30}}>
                  <ScrollView
                    keyboardShouldPersistTaps="always"
                    horizontal
                    scrollEnabled={false}>
                    <GooglePlacesAutocomplete
                      keyboardShouldPersistTaps="handled"
                      disableScroll={true}
                      fetchDetails
                      filterReverseGeocodingByTypes={[
                        'locality',
                        'administrative_area_level_3',
                      ]}
                      placeholder="Address"
                      query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                      }}
                      listViewDisplayed
                      renderDescription={row => row.description}
                      enableHighAccuracyLocation
                      onPress={(data, details) => handleAddress(details, data)}
                      enablePoweredByContainer={false}
                      textInputProps={{
                        backgroundColor: primaryLight,
                        borderRadius: RF(10),
                        paddingLeft: RF(15),
                        placeholderTextColor: 'grey',
                        clearButtonMode: 'never',
                      }}
                      styles={{
                        textInput: {
                          color: black,
                          width: Platform.OS === 'ios' ? RF(313) : RF(335),
                          height: Platform.OS === 'ios' ? RF(50) : RF(50),
                        },
                        listView: {
                          color: 'black',
                          zIndex: 1000,
                        },
                      }}
                    />
                  </ScrollView>
                </View>
                <Input
                  textContentType={'password'}
                  value={values.password}
                  placeholder={'Password'}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                  onChangeText={handleChange('password')}
                  error={
                    touched.password && errors.password ? errors.password : ''
                  }
                  autoCapitalize={'none'}
                  secureTextEntry={!showPassword}
                />
                <Input
                  textContentType={'password'}
                  value={values.confirmPassword}
                  placeholder={'Confirm Password'}
                  toggleShowPassword={toggleShowConfirmPassword}
                  showPassword={showPassword1}
                  onChangeText={handleChange('confirmPassword')}
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ''
                  }
                  autoCapitalize={'none'}
                  secureTextEntry={!showPassword1}
                />
                <TermsOfServices
                  value={checkBox}
                  onClick={() => setCheckBox(pre => !pre)}
                />
                {placesRef && (
                  <ActionSheet
                    ref={placesRef}
                    containerStyle={styles.actionSheet}
                    bounceOnOpen>
                    <CustomText>haloooooo</CustomText>
                  </ActionSheet>
                )}
                <Button text={'Sign Up'} onPress={handleSubmit} />
                <View style={styles.lastLineView}>
                  <CustomText size={14}>Alreday have an account?</CustomText>
                  <CustomText
                    onPress={alreadyAnAccount}
                    bold
                    size={14}
                    style={styles.signUpTxt}>
                    Sign In
                  </CustomText>
                </View>
                <LoadingOverlay loading={loading} />
              </>
            )}
          </Formik>
          {/* <Button text={'Navigate'} onPress={navigate} /> */}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
export default signUp;

const DateOfBirth = ({
  open,
  date,
  onCancel,
  onConfirm,
}: {
  open?: boolean;
  date?: any;
  onCancel?: () => any;
  onConfirm?: (data: any) => any;
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
