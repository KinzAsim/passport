import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './style';
import CustomText from '../../../shared/components/customText';
import HeaderWrapper from '../../../shared/components/headerWrapper/index';
import Button from '../../../shared/components/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CodeInput from 'react-native-confirmation-code-input';
import {RouteProp} from '@react-navigation/native';
import {RF, showToast, THEME, verify} from '../../../shared/exporter';
import Timer from '../../../shared/components/timer';
import LoadingOverlay from '../../../shared/components/loadingOverlay';

const {primary, dullWhite, black} = THEME.colors;
interface Props {
  navigation: any;
  route: RouteProp<{
    params: {
      emailOrPhone: any;
      type: any;
    };
  }>;
}

const Verify = ({route, navigation}: Props) => {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  let params = {
    type: route?.params?.type,
    code: value,
    emailOrPhone: route?.params?.emailOrPhone,
  };
  const onVerify = () => {
    setSubmitting(true);
    verify(params)
      .then((res: any) => {
        if (res.data.status == true) {
          navigation.navigate('ResetPassword', {
            type: params?.type,
            code: params?.code,
            emailOrPhone: params?.emailOrPhone,
          });
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
    <>
      <HeaderWrapper showBtnLeft />
      <KeyboardAwareScrollView style={styles.bgColor}>
        <View style={styles.container}>
          {route?.params?.type === 'phone' ? (
            <>
              <CustomText bold size={20} style={styles.text}>
                Verify phone number
              </CustomText>
              <CustomText numberOfLines={4} style={styles.innerText}>
                We have just sent a 4-digit verification code to the phone
                number{' '}
                <CustomText style={styles.contentTxt}>
                  {route.params.emailOrPhone}{' '}
                </CustomText>
                Please enter the code in the box below to continue.
              </CustomText>
            </>
          ) : (
            <>
              <CustomText bold size={20} style={styles.text}>
                Verify Email Address
              </CustomText>
              <CustomText numberOfLines={4} style={styles.innerText}>
                We have just sent a 4-digit verification code to your email
                address{' '}
                <CustomText style={styles.contentTxt}>
                  {route.params.emailOrPhone}{' '}
                </CustomText>
                Please enter the code in the box below to continue.
              </CustomText>
            </>
          )}
          <CodeInput
            keyboardType="numeric"
            codeLength={4}
            inputPosition="center"
            secureTextEntry
            className={'border-b'}
            space={15}
            size={40}
            cellBorderWidth={1}
            inactiveColor={dullWhite}
            activeColor={primary}
            containerStyle={{paddingBottom: RF(5)}}
            codeInputStyle={{color: black}}
            onFulfill={(code: any) => setValue(code)}
          />
          <Timer
            emailOrPhone={route?.params?.emailOrPhone}
            type={route?.params?.type}
          />
          <Button
            text={'Verify'}
            onPress={onVerify}
            disabled={value.length < 4}
          />
        </View>
        <LoadingOverlay loading={submitting} />
      </KeyboardAwareScrollView>
    </>
  );
};
export default Verify;
