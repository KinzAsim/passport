import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {styles} from './style';
import CustomText from '../../../shared/components/customText';
import HeaderWrapper from '../../../shared/components/headerWrapper/index';
import Button from '../../../shared/components/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CodeInput from 'react-native-confirmation-code-input';
import {RouteProp} from '@react-navigation/native';
import {RF, showToast, THEME, verify, verifyEmailORPhone} from '../../../shared/exporter';
import Timer from '../../../shared/components/timer';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../shared/redux/reducers/userReducer';

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

const VerifyPhoneNumber = ({route, navigation}: Props) => {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {user,authToken} = useSelector((state: any) => state.root.user);
  const dispatch = useDispatch();

  let params = {
    type: "phone_number",
    code: value,
    // emailOrPhone: route?.params?.phone,
  };
  const onVerify = () => {
    
    setSubmitting(true);
    verifyEmailORPhone(params,authToken)
      .then((res: any) => {
        if (res.data.status == true) {
            
          navigation.goBack();
  
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
      <HeaderWrapper  />
      <KeyboardAwareScrollView style={styles.bgColor}>
        <View style={styles.container}>
         
              <CustomText bold size={20} style={styles.text}>
                Verify phone number
              </CustomText>
              <CustomText numberOfLines={4} style={styles.innerText}>
                We have just sent a 4-digit verification code to the phone
                number{' '}
                <CustomText style={styles.contentTxt}>
                  {route.params.phone}{' '}
                </CustomText>
                Please enter the code in the box below to continue.
              </CustomText>
          
    
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
            onPress={()=>{onVerify()}}
            disabled={value.length < 4}
          />
        </View>
        <LoadingOverlay loading={submitting} />
      </KeyboardAwareScrollView>
    </>
  );
};
export default VerifyPhoneNumber;
