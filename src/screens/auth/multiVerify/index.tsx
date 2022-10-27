import React, {useState, useRef, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {styles} from './style';
import CustomText from '../../../shared/components/customText';
import HeaderWrapper from '../../../shared/components/headerWrapper/index';
import Button from '../../../shared/components/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CodeInput from 'react-native-confirmation-code-input';
import {RouteProp} from '@react-navigation/native';
import RadioBtn from '../../../shared/components/radioButton';
import {
  RF,
  showToast,
  THEME,
  verify,
  verifyEmailORPhone,
  sendCode,
} from '../../../shared/exporter';
import Timer from '../../../shared/components/timer';
import LoadingOverlay from '../../../shared/components/loadingOverlay';

const {primary, dullWhite, black} = THEME.colors;
interface Props {
  navigation: any;
  route: RouteProp<{
    params: {
      token: any;
      emailOrPhone: any;
      type: any;
    };
  }>;
}

const MultiVerify = ({route, navigation}: Props) => {
  const [code, setCode] = useState('');
  const [phoneCode, setphoneCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {emailOrPhone, type, token} = route?.params;
  const [mode, setMode] = useState(type);
  const [EmailCheck, setEmailcheck] = React.useState(false);
  const [PhoneCheck, setPhonecheck] = React.useState(false);

  // let params = {
  //   type: 'email',
  //   code: value,
  //   emailOrPhone: route?.params?.email,
  // };
  const onVerify = async () => {
    console.log('verify.......');

    // if (EmailCheck && PhoneCheck) {
    //   showToast('Success', 'Verified successfully', true);
    //   navigation.navigate('Login');
    // } else {
    //   // Alert.alert('wrong');
    //   if (EmailCheck) {
    //     showToast('Failed', 'Invalid phone number code', false);
    //   } else if (PhoneCheck) {
    //     showToast('Failed', 'Invalid email code', false);
    //   } else {
    //     showToast('Failed', 'Invalid verification code', false);
    //   }
    // }
  };

  // const prevCheck = useRef({EmailCheck, PhoneCheck}).current;
  // useEffect(() => {
  //   if (
  //     prevCheck.EmailCheck !== EmailCheck ||
  //     prevCheck.PhoneCheck !== PhoneCheck
  //   ) {
  //     // process here
  //     // navigation.navigate();
  //     if (EmailCheck && PhoneCheck) {
  //       Alert.alert('true.....');
  //     } else {
  //       Alert.alert('false.....');
  //     }
  //   }

  //   return () => {
  //     prevCheck.EmailCheck = EmailCheck;
  //     prevCheck.PhoneCheck = PhoneCheck;
  //   };
  // }, [EmailCheck, PhoneCheck]);

  const showUserToast = () => {
    showToast('Success', 'Verified successfully', true);
  };
  const verifyCodeServe = () => {
    const params = {
      type: mode == 'phone' ? 'phone_number' : mode,
      code: code,
      // token,
    };
    setSubmitting(true);

    verifyEmailORPhone(params, token)
      .then((res: any) => {
        console.log('resss', res.data);

        if (res.data.status == true) {
          console.log();

          showToast('Success', res?.data?.message, true);

          navigation.navigate('Login');
        } else {
          // `${res?.data?.data?.code} is ` +
          showToast('Failed', res?.data?.message, false);
        }
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
        return err;
      })
      .finally(() => setSubmitting(false));
  };
  const reSendCode = async () => {
    console.log('Resend hitttttt....');
    sendCodeFromServ(type, emailOrPhone);
  };
  const sendCodeFromServ = (type: any, value: any) => {
    const params = {
      type: type,
      emailOrPhone: value,
    };
    // setSubmitting(true);
    sendCode(params)
      .then((res: any) => {
        // console.log('resss', res.data);
        if (res.data.status == true) {
          console.log('true case....', res.data);
        } else {
          showToast('Failed', res?.data?.message, false);
        }
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <View style={{flex: 1, paddingBottom: RF(20)}}>
      <HeaderWrapper showBtnLeft />
      <KeyboardAwareScrollView style={styles.bgColor}>
        <View style={styles.container}>
          <CustomText bold size={20} style={styles.text}>
            {mode == 'email'
              ? 'Verify your email address'
              : 'Verify your phone'}
          </CustomText>
          <View style={styles.sectionView}>
            <RadioBtn
              containerStyle={{marginRight: RF(15)}}
              isChecked={mode == 'email' ? 'email' : ''}
              onClick={() => setMode('email')}
              title={'Via email'}
            />
            <RadioBtn
              isChecked={mode == 'phone' ? 'phone' : ''}
              onClick={() => setMode('phone')}
              title={'Via phone number'}
            />
          </View>
          {/* <CustomText bold size={20}>
            Phone number
          </CustomText> */}
          <View
            style={{
              backgroundColor: THEME.colors.white,
              marginTop: RF(20),
              paddingVertical: RF(20),
              borderRadius: 10,
            }}>
            <CustomText style={{alignSelf: 'center'}} size={13}>
              {mode == 'email'
                ? 'Enter 4-digit code sent on Email Address'
                : 'Enter 4-digit code sent on phone number'}
            </CustomText>
            <CodeInput
              editable={!EmailCheck}
              keyboardType="numeric"
              codeLength={4}
              inputPosition="center"
              // secureTextEntry
              // className={'border-b'}
              space={15}
              size={47}
              cellBorderWidth={1}
              inactiveColor={dullWhite}
              activeColor={primary}
              containerStyle={{paddingBottom: RF(5)}}
              codeInputStyle={{color: black}}
              onFulfill={(code: any) => {
                // verifyCodeServe(code);
                setCode(code);
              }}
            />
          </View>
          <Timer
            emailOrPhone={emailOrPhone}
            type={''}
            reSendCode={reSendCode}
            screen={'multi'}
          />
        </View>
        <LoadingOverlay loading={submitting} />
      </KeyboardAwareScrollView>
      <View
        style={{
          backgroundColor: THEME.colors.lightSilver,
          marginHorizontal: RF(20),
        }}>
        <Button
          text={'Verify'}
          onPress={verifyCodeServe}
          disabled={code.length < 4}
        />
      </View>
    </View>
  );
};
export default MultiVerify;
