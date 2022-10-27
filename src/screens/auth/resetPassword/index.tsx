import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import CustomText from '../../../shared/components/customText';
import Input from '../../../shared/components/input';
import Button from '../../../shared/components/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import {resetPasswordSchema} from '../../../shared/utils/validations';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {forgotPassword, showToast} from '../../../shared/exporter';
import {RouteProp} from '@react-navigation/native';
import LoadingOverlay from '../../../shared/components/loadingOverlay';

interface Props {
  navigation: any;
  route: RouteProp<{
    params: {
      emailOrPhone: any;
      type: any;
      code: any;
    };
  }>;
}
const initialValues = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = ({route, navigation}: Props) => {
  const {emailOrPhone, type, code} = route.params;
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = (values: any) => {
    setSubmitting(true);
    const {password, confirmPassword} = values;
    const params = {
      password,
      password_confirmation: confirmPassword,
      type: type,
      emailOrPhone: emailOrPhone,
      code: code,
    };
    forgotPassword(params)
      .then((res: any) => {
        navigation.navigate('SuccessPassChange', {data: params});
      })
      .catch((err: any) => {
        showToast(
          'Request Failed',
          err?.response.data?.message,
          false,
        );
      })
      .finally(() => setSubmitting(false));
  };
  return (
    <>
      <HeaderWrapper navigationFalse={false} showBtnLeft />
      <KeyboardAwareScrollView style={styles.scrollView}>
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
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
              <View style={styles.container}>
                <CustomText bold size={20} style={styles.text}>
                  Reset Your Password
                </CustomText>
                <CustomText style={styles.innerText}>
                  Your new password should be different from previously used
                  passwords.
                </CustomText>
                <CustomText style={styles.caption}>
                  The password must contain at least eight character categories
                  among the following: Uppercase characters (A-Z) Lowercase
                  characters (a-z) Digits (0-9) & special characters.
                </CustomText>
                <Input
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={
                    touched.password || errors.password ? errors.password : ''
                  }
                  textContentType={'password'}
                  autoCapitalize={'none'}
                  placeholder={'Password'}
                />
                <Input
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  error={
                    touched.confirmPassword || errors.confirmPassword
                      ? errors.confirmPassword
                      : ''
                  }
                  autoCapitalize={'none'}
                  textContentType={'password'}
                  placeholder={'Confirm Password'}
                />
                <View style={styles.btn}>
                <Button text="Reset Password" onPress={handleSubmit} />
                </View>
              </View>
            </>
          )}
        </Formik>
        <LoadingOverlay loading={submitting} />
      </KeyboardAwareScrollView>
    </>
  );
};

export default ResetPassword;
