import React, {Component, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GST, RF, THEME} from '../../exporter';
import {GOOGLE_MAPS_APIKEY} from '../../utils/contsants';
import CustomText from '../customText';
import Close from 'react-native-vector-icons/AntDesign';

const {white, dimGray, gray, black, primaryLight} = THEME.colors;
const CusAddress = ({showTitle, handleAddress, addressRef}: any) => {
  const [showCir, setShowCir] = useState<any>(false);
  const pressInFun=()=>{
    setShowCir(true);
  }
  return (
    <View style={styles.container}>
      {showTitle ? (
        <CustomText style={{marginTop: RF(10)}} color={gray}>
          Address
        </CustomText>
      ) : (
        <CustomText style={{marginTop: RF(10)}} />
      )}
      <View style={{flex: 1, paddingTop: 7}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          horizontal
          scrollEnabled={false}>
          <GooglePlacesAutocomplete
            ref={addressRef}
            keyboardShouldPersistTaps="handled"
            disableScroll={true}
            fetchDetails
            filterReverseGeocodingByTypes={[
              'locality',
              'administrative_area_level_3',
            ]}
            placeholder="Address"
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            numberOfLines={2}
            listViewDisplayed
            renderDescription={row => row.description}
            enableHighAccuracyLocation
            onPress={(data, details) => handleAddress(details, data)}
            enablePoweredByContainer={false}
            renderRightButton={() =>
              showCir && (
                <Pressable
                  onPress={() => addressRef?.current?.clear()}
                  style={{zIndex: 1, right: RF(25), top: RF(19)}}
                  hitSlop={GST.hitSlop}>
                  <Close name="closecircleo" size={14} color={gray} />
                </Pressable>
              )
            }
            textInputProps={{
              multiline:true,
              numberOfLines: 2,
              onFocus:()=>setShowCir(true),
              onBlur:()=>setShowCir(false),
            }}
            styles={{
              textInput: {
                backgroundColor: primaryLight,
                borderRadius: RF(10),
                paddingLeft: RF(15),
                paddingRight: RF(30),
                placeholderTextColor: 'grey',
                color: black,
                width: Platform.OS === 'ios' ? RF(313) : RF(335),
                height: Platform.OS === 'ios' ? RF(50) : RF(50),
              },
              listView: {
                color: 'black',
                zIndex: 1000,
              },
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: white,
  },
  lstView: {
    marginTop: 50, // This right here - remove the margin top and click on the first result, that will work.
    elevation: 1,
    backgroundColor: 'white',
    position: 'absolute', // and the absolute position.
    zIndex: 500,
  },
  mapInputStyles: {
    borderBottomWidth: 1,
    color: 'black',
    borderColor: 'rgba(0,0,0,0.3)',
  },
  validInputStyles: {
    color: 'black',
    borderBottomWidth: 1,
    borderColor: THEME.colors.red,
  },
});

export default CusAddress;
