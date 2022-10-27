import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {RF, THEME} from '../../exporter';
import CustomText from '../customText';
const {black, fieldBG, lightGray, primary, gray} = THEME.colors;

interface Props {
  required?: boolean;
  disabled?: boolean;
  defaultCode?: any;
  value?: string;
  title?: string;
  onChangeText: (txt: string) => void;
  onChangeCountry: (value: any) => void;
  placeholder?: string;
  error?: any;
  phoneInputContainer?: any;
  countryPickerBtn?: any;
}

const CustomPhoneInput = ({
  required,
  value,
  title,
  disabled,
  defaultCode,
  onChangeText,
  onChangeCountry,
  placeholder,
  error,
  phoneInputContainer,
  countryPickerBtn,
}: Props) => {
  const [keypress, setKeyPress] = useState('');
  const onChangeNumber = (text: string) => {
    let formattedNumber = text;
    if (keypress !== 'Backspace') {
      if (text.length === 3 || text.length === 7) {
        formattedNumber += '-';
      } else if (text.length === 4 && text[3] !== '-') {
        formattedNumber = text.slice(0, 3) + '-' + text.slice(3);
      } else if (text.length === 8 && text[7] !== '-') {
        formattedNumber = text.slice(0, 7) + '-' + text.slice(7);
      }
    }
    onChangeText(formattedNumber);
  };
  return (
    <>
      <View style={{marginRight: RF(1)}}>
        <CustomText style={{marginTop: RF(10),paddingBottom:RF(5)}} semiBold color={gray}>
          {title}
          <CustomText color={primary}>{required ? '*' : ''}</CustomText>
        </CustomText>
        <PhoneInput
          disabled={disabled}
          textInputProps={{
            value,
            onKeyPress: e => setKeyPress(e.nativeEvent.key),
            placeholderTextColor: lightGray,
            maxLength: 12,
          }}
          codeTextStyle={styles.codeColor}
          placeholder={placeholder}
          textInputStyle={styles.txtInput}
          textContainerStyle={styles.txtContainer}
          containerStyle={phoneInputContainer}
          countryPickerButtonStyle={countryPickerBtn}
          defaultCode={defaultCode}
          layout="second"
          onChangeText={onChangeNumber}
          onChangeCountry={onChangeCountry}
          withDarkTheme={false}
          renderDropdownImage={
            <View
              style={{
                width: RF(1),
                height: RF(15),
                backgroundColor: lightGray,
              }}></View>
          }
        />
        {!!error && (
          <CustomText color="red" size={10} style={styles.err}>
            {error}
          </CustomText>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  txtInput: {
    color: black,
    fontSize: RF(14),
  },
  txtContainer: {
    backgroundColor: fieldBG,
    paddingVertical: RF(1),
    borderTopRightRadius: RF(15),
    paddingLeft: 0,
    borderBottomRightRadius: RF(15),
  },
  errorContainer: {
    borderColor: fieldBG,
  },
  err: {
    paddingLeft: RF(5),
    paddingTop: RF(5),
  },
  codeColor: {
    color: lightGray,
  },
});

export default CustomPhoneInput;
