import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Platform
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {hideEye, showEye} from '../../../assets/images';
import {GST, RF, THEME} from '../../exporter';
import CustomText from '../customText';

const {lightGray, primaryLight, black, gray} = THEME.colors;

interface InputProp extends TextInputProps {
  title?: any;
  titleColor?: string;
  placeholder?: any;
  toggleShowPassword?: () => void;
  showPassword?: any;
  textContentType?: any;
  error?: any;
  multiline?: boolean;
  keyboardType?: any;
  textColor?: any;
  onChangeText?:any
  autoCapitalize?:any
}

const Input = (props: InputProp) => {
  const {
    title,
    placeholder,
    value,
    toggleShowPassword,
    showPassword,
    textContentType,
    multiline,
    error,
    keyboardType,
    titleColor = black,
    textColor = gray,
    onChangeText,
    autoCapitalize
  } = props;

  return (
    <>
      <CustomText style={{marginTop: RF(10)}} color={textColor}>
        {title}
      </CustomText>
      <View style={[styles.innerView, multiline && styles.flexStart]}>
        <TextInput
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          style={[
            (!multiline && styles.textInput) || (multiline && styles.multiline),
          ]}
          placeholder={placeholder}
          textAlign="left"
          textAlignVertical="top"
          placeholderTextColor={'grey'}
          onChangeText={onChangeText}
          {...props}></TextInput>

        {!!value && textContentType === 'password' ? (
          <Pressable onPress={toggleShowPassword} style={styles.iconView}>
            <FastImage
              source={showPassword ? showEye : hideEye}
              style={[styles.icon, multiline && GST.mt1]}
              resizeMode="contain"
              tintColor={lightGray}
            />
          </Pressable>
        ) : (
          <View />
        )}
      </View>
      {!!error && (
        <CustomText size={10} style={styles.errorStyle}>
          {error}
        </CustomText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  multiline: {
    height: RF(190),
    width: '100%',
    borderRadius: 10,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  iconView: {
    padding: 1,
  },
  innerView: {
    backgroundColor: primaryLight,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: RF(10),
    marginTop: RF(5),
    paddingTop: RF(5),
  },
  textInput: {
    backgroundColor: primaryLight,
    width: '90%',
    paddingLeft: RF(7),
    color: black,
    fontSize: RF(14),
    paddingVertical:Platform.OS === 'ios' ? RF(17): RF(7),
    paddingTop:Platform.OS === 'ios' ? RF(9): RF(9),
    borderRadius: 10,
  },
  icon: {
    width: RF(18),
    height: RF(18),
  },
  errorStyle: {
    color: 'red',
    paddingLeft: RF(8),
    paddingTop: RF(3),
  },
  flexStart: {
    alignItems: 'flex-start',
  },
});
export default Input;
