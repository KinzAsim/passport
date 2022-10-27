import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import CustomText from '../../../shared/components/customText';
import Input from '../../../shared/components/input';
import HeaderWrapper from '../../../shared/components/headerWrapper/index';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from '../../../shared/components/button';
import {
  ForgotPasswordEmailSchema,
  ForgotPasswordPhoneSchema,
} from '../../../shared/utils/validations';
import {RF, sendCode, showToast, THEME} from '../../../shared/exporter';
import RadioBtn from '../../../shared/components/radioButton';
import CustomPhoneInput from '../../../shared/components/customPhoneInput/customPhoneInput';
import LoadingOverlay from '../../../shared/components/loadingOverlay';

const {primary} = THEME.colors;
const initialValues = {
  phoneNumber: '',
  email: '',
};

const ForgotPassword = ({navigation}: any) => {
  const [mode, setMode] = useState('phone');
  const ref = useRef();
  const [loading, setloading] = useState(false);

  const submitHandler = (values: any, {setSubmitting}: any) => {
    const {phoneNumber, email} = values;
    let params = {};
    if (mode === 'phone') {
      params = {emailOrPhone: phoneNumber, type: 'phone_number'};
      fetchApi(params, setSubmitting);
    } else if (mode === 'email') {
      params = {emailOrPhone: email, type: 'email'};
      fetchApi(params, setSubmitting);
    }
  };

  const fetchApi = (params: any, {setSubmitting}: any) => {
    setloading(true);
    sendCode(params)
      .then(res => {
        navigation.navigate('Verify', {
          emailOrPhone: params?.emailOrPhone,
          type: params?.type,
        });
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };

  const onContactSupport = () => {
    navigation.navigate('SupportForgotPass');
  };

  return (
    <>
      <HeaderWrapper showBtnLeft />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <HeadingSection />
        <View style={styles.sectionView}>
          <RadioBtn
            containerStyle={{marginRight: RF(15)}}
            isChecked={mode === 'phone'}
            onClick={() => setMode('phone')}
            title={'Via phone number'}
          />
          <RadioBtn
            isChecked={mode === 'email'}
            onClick={() => setMode('email')}
            title={'Via email'}
          />
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={
            mode === 'phone'
              ? ForgotPasswordPhoneSchema
              : ForgotPasswordEmailSchema
          }
          onSubmit={submitHandler}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              {mode === 'phone' ? (
                <CustomPhoneInput
                  defaultCode={'US'}
                  value={values.phoneNumber}
                  placeholder={'Phone No.'}
                  countryPickerBtn={styles.countryPickerBtn}
                  phoneInputContainer={styles.phoneInputContainer}
                  onChangeText={handleChange('phoneNumber')}
                  error={
                    touched.phoneNumber || errors.phoneNumber
                      ? errors.phoneNumber
                      : ''
                  }
                />
              ) : (
                <Input
                  keyboardType={'email-address'}
                  textContentType={'emailAddress'}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder={'Email'}
                  error={touched.email || errors.email ? errors.email : ''}
                  autoCapitalize={'none'}
                />
              )}
              <View style={{marginVertical: RF(10)}}>
                <Button text={'Send Code'} onPress={handleSubmit} />
              </View>
              <Section onPress={onContactSupport} />
            </>
          )}
        </Formik>
        <LoadingOverlay loading={loading} />
      </KeyboardAwareScrollView>
    </>
  );
};

const HeadingSection = () => {
  return (
    <>
      <CustomText bold size={20} style={styles.text}>
        Forgot Password
      </CustomText>
      <CustomText numberOfLines={2} size={12} style={styles.textMini}>
        Please enter your phone number. You will receive a 4-digit code to
        create a new password via SMS
      </CustomText>
    </>
  );
};

const RadioButton = () => {
  const [mode, setMode] = useState('phone');
  return (
    <View style={styles.sectionView}>
      <RadioBtn
        containerStyle={{marginRight: RF(15)}}
        isChecked={mode === 'phone'}
        onClick={() => setMode('phone')}
        title={'Via phone number'}
      />
      <RadioBtn
        isChecked={mode === 'email'}
        onClick={() => setMode('email')}
        title={'Via email'}
      />
    </View>
  );
};

const Section = ({onPress}: {onPress: () => void}) => {
  return (
    <View style={styles.sectionContainer}>
      <CustomText>Can't reset password?</CustomText>
      {/* <Pressable onPress={onPress}>
        <CustomText color={primary} style={styles.contactsupp}>
          Contact Support
        </CustomText>
      </Pressable> */}
    </View>
  );
};

export default ForgotPassword;
