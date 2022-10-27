import React, { useState, useEffect } from "react";
import { View, ImageBackground, StatusBar, Pressable } from "react-native";
import FastImage from "react-native-fast-image";
import { splashScreen, logo } from "../../../assets/images";
import CustomText from "../../../shared/components/customText";
import { styles } from "./styles";
import { login, showToast, THEME } from "../../../shared/exporter";
import Input from "../../../shared/components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Formik } from "formik";
import Button from "../../../shared/components/button/index";
import { LoginSchema } from "../../../shared/utils/validations";
import { navigate } from "../../../shared/services/nav.service";
import { useDispatch } from "react-redux";
import {
  setAuthToken,
  setUser,
} from "../../../shared/redux/reducers/userReducer";
import LoadingOverlay from "../../../shared/components/loadingOverlay";
import { getUniqueId, getManufacturer } from "react-native-device-info";

const { primary } = THEME.colors;

const initialValues = {
  email: "",
  password: "",
};

const Login = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deviceId, setdevId] = useState("");

  useEffect(() => {
    let deviceid = getUniqueId();
    if (deviceid) {
      setdevId(deviceid);
    }
  });

  const submitHandler = (values: any) => {
    setSubmitting(true);
    const { email, password } = values;
    const params = {
      email,
      password,
      device_id: deviceId,
      device_token: deviceId,
    };
    login(params)
      .then((res: any) => {
        console.log("ress...", res.data);

        if (res.data.status === false) {
          showToast("Request Failed!", res.data.message, false);
        } else {
          console.log("res", res);

          if (
            res.data.data.user.is_email_verified == 1 ||
            res.data.data.user.is_phone_verified == 1
          ) {
            dispatch(setUser(res.data.data.user));
            dispatch(setAuthToken(res.data.data._token));
          } else {
            navigation.navigate("MultiVerify", {
              email: res.data.data.user.email,
              phone: res.data.data.user.phone_number,
              token: res.data.data._token,
            });
          }
        }
      })
      .catch((err: any) => {
        console.log("error...", err.response);
      })
      .finally(() => setSubmitting(false));
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onPressForgotPass = () => {
    navigate("ForgotPassword");
  };
  const onSignUpWithPhone = () => {
    navigate("SignUp");

    // navigate('MultiVerify', {
    //   email: 'email',
    //   phone: 'phoneNumber',
    //   token: 'res?.data?.data?._token',
    // });
  };

  return (
    <>
      <StatusBar translucent barStyle={"dark-content"} />
      <ImageBackground style={styles.container} source={splashScreen}>
        <FastImage source={logo} style={styles.logoView} resizeMode="contain" />
        <CustomText bold size={18} style={styles.text}>
          Welcome back!
        </CustomText>
        <CustomText size={12} style={styles.innerText}>
          It’s good to see you again!
        </CustomText>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={submitHandler}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Input
                  textContentType={"emailAddress"}
                  placeholder={"Email or Phone Number"}
                  value={values.email}
                  keyboardType="email-address"
                  error={touched.email && errors.email ? errors.email : ""}
                  onChangeText={handleChange("email")}
                  autoCapitalize={"none"}
                />
                <Input
                  placeholder={"Password"}
                  value={values.password}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                  secureTextEntry={!showPassword}
                  textContentType={"password"}
                  autoCapitalize={"none"}
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                  onChangeText={handleChange("password")}
                />

                <CustomText
                  bold
                  color={primary}
                  style={styles.passwordText}
                  onPress={onPressForgotPass}
                >
                  Forgot Password?
                </CustomText>

                <Button text={"Sign In"} onPress={handleSubmit} />

                <View style={styles.view}>
                  <CustomText> Don't have an account? </CustomText>
                  <Pressable onPress={onSignUpWithPhone}>
                    <CustomText color={primary} bold style={styles.OrText}>
                      Sign up
                    </CustomText>
                  </Pressable>
                </View>
              </KeyboardAwareScrollView>
            </>
          )}
        </Formik>
        <LoadingOverlay loading={submitting} />
      </ImageBackground>
    </>
  );
};

export default Login;
