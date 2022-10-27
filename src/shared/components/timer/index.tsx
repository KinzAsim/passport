import {RF, THEME, sendCode, showToast} from '../../../shared/exporter';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomText from '../customText';

const {black, primary} = THEME.colors;

interface Props {
  emailOrPhone: any;
  type: any;
  reSendCode: () => void;
  screen: string;
}

const Timer = ({emailOrPhone, type, reSendCode, screen}: Props) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    startInterval();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  }, [minutes, seconds]);

  const startInterval = () => {
    setSeconds(seconds - 1);
  };
  const onPressResend = () => {
    console.log('pres.....');

    setSeconds(59);
    setMinutes(1);

    if (screen === 'multi') {
      reSendCode();
    } else {
      console.log('out...');

      sendCodeServ();
    }
  };
  const sendCodeServ = () => {
    let params = {};
    params = {emailOrPhone: emailOrPhone, type: type};
    sendCode(params)
      .then(res => {})
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => console.log('Done'));
  };

  return (
    <View>
      {minutes === 0 && seconds === 0 ? (
        <CustomText style={styles.innerText1}>
          Didn't recieve the OTP?{' '}
          <CustomText onPress={onPressResend} bold style={styles.contentTxt}>
            Resend
          </CustomText>
        </CustomText>
      ) : (
        <CustomText bold color={black} style={styles.innerText1}>
          Resend Code In{' '}
          <CustomText bold style={styles.contentTxt}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </CustomText>
        </CustomText>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  contentTxt: {
    color: primary,
    alignSelf: 'center',
  },
  innerText1: {
    marginTop: RF(15),
    alignSelf: 'center',
  },
});
export default Timer;
