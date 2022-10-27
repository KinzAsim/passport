import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';
import {GST, RF, THEME} from '../../exporter';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import Close from 'react-native-vector-icons/AntDesign';

const {lightGray, dimGray, gray,black} = THEME.colors;

const SearchBar = ({
  onPress,
  value,
  onChangeText,
  onRightPress,
  rightIcon,
  text,
  onPressIn,
  returnType = 'default'
}: {
  onPress?: () => void;
  value?: any;
  onChangeText?: any;
  onRightPress?: any;
  rightIcon?: any;
  text: any;
  onPressIn?: any;
  returnType?:any
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <SearchIcon name={'search1'} size={25} color={lightGray} />
      <TextInput
        onPressIn={onPressIn}
        placeholder={text}
        style={styles.input}
        underlineColor={dimGray}
        activeUnderlineColor={dimGray}
        value={value}
        placeholderTextColor={black}
        onChangeText={onChangeText}
        onEndEditing={onPress}
        onSubmitEditing={onPress}
        returnKeyType={returnType}
        selectionColor={black}
      />
      {!!rightIcon && (
        <Pressable onPress={onRightPress} hitSlop={GST.hitSlop}>
          <Close name="closecircleo" size={16} color={gray} />
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: dimGray,
    marginHorizontal: RF(15),
    borderRadius: 20,
    marginTop: RF(10),
    marginBottom: RF(20),
    paddingLeft: RF(12),
  },
  input: {
    backgroundColor: dimGray,
    width: '85%',
    fontSize: RF(12),
    borderEndWidth: 0,
    color:'red'
  },
  icon: {
    width: RF(18),
    height: RF(18),
  },
});

export default SearchBar;
