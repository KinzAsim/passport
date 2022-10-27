import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ForgotPassword from '../../screens/auth/forgot';
import Login from '../../screens/auth/login';
import ResetPassword from '../../screens/auth/resetPassword';
import signUp from '../../screens/auth/signUp';
import GooglePlaces from '../../screens/auth/signUp/GooglePlaces';
import SuccessFormSubmit from '../../screens/auth/successFormSubmit';
import SuccessPassChange from '../../screens/auth/successPassChange';
import SupportForgotPass from '../../screens/auth/SupportForgotPass';
import Verify from '../../screens/auth/verify';
import MultiVerify from '../../screens/auth/multiVerify';
import SuccessForEandP from '../../screens/auth/successForE&P';
import SignupVerification from '../../screens/auth/signupVerification';

const Stack = createStackNavigator();

const AuthStack = ({route}: any) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SignUp" component={signUp} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="MultiVerify" component={MultiVerify} />
      <Stack.Screen name="SignupVerification" component={SignupVerification} />
      <Stack.Screen name="SupportForgotPass" component={SupportForgotPass} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SuccessPassChange" component={SuccessPassChange} />
      <Stack.Screen name="SuccessFormSubmit" component={SuccessFormSubmit} />
      <Stack.Screen name="GooglePlaces" component={GooglePlaces} />
      <Stack.Screen name="SuccessForEandP" component={SuccessForEandP} />
    </Stack.Navigator>
  );
};

export default AuthStack;
