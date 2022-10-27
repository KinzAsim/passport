import React, {useState, useRef} from 'react';
import {View, Pressable, FlatList} from 'react-native';
import CustomText from '../../../shared/components/customText';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {styles} from './styles';
import {RF, THEME} from '../../../shared/exporter';
import {TextInput} from 'react-native-gesture-handler';
import {dropdown} from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import {Slider} from 'react-native-elements';
import Button from '../../../shared/components/button';
import ActionSheet from 'react-native-actions-sheet';

const {white, grey, primary} = THEME.colors;

const Filters = ({route}: any) => {
  const ref = useRef<any>();
  let catagories = route?.params?.catagoryList;
  let brands = route?.params?.allBrands;

  const [data, setdata] = React.useState<any>(catagories);
  const [brand, setBrand] = useState<any>(brands);
  const [value, setValue] = useState(200);
  const [clearAllToggle, setClearAllToggle] = useState<any>(true);
  const onPressAccSheetText = (title: any) => {
    setBrand(title);
    ref.current?.hide();
  };
  const onPressTypes = (id: any) => {
    setdata(
      data.map((elem: any) => {
        if (elem.id === id) {
          return {
            ...elem,
            selection: !elem.selection,
          };
        }
        return elem;
      }),
    );
    setClearAllToggle(false);
  };
  const onPressRightText = () => {
    setdata(
      data.map((elem: any) => {
        return {
          ...elem,
          selection: false,
        };
      }),
    );
    setBrand([]);
    setClearAllToggle(true);
    setValue(200);
  };
  return (
    <>
      <HeaderWrapper
        showBtnLeft
        showTitle
        title={'Filters'}
        showRightText
        onPressRightText={onPressRightText}
        boolForRightText={clearAllToggle}
      />
      <View style={styles.container}>
        <CustomText style={{marginVertical: RF(15)}} bold size={14}>
          Type
        </CustomText>
        <View>
          <FlatList
            data={data}
            numColumns={3}
            renderItem={({item}) => (
              <Pressable
                key={item?.id}
                onPress={() => onPressTypes(item?.id)}
                style={[
                  styles.viewSection,
                  {backgroundColor: item.selection ? primary : grey},
                ]}>
                <CustomText color={white}>{item?.name}</CustomText>
              </Pressable>
            )}
          />
        </View>
        <View
          style={{
            height: RF(1),
            backgroundColor: grey,
            marginVertical: RF(10),
          }}></View>
        <CustomText style={{marginVertical: RF(10)}} bold size={14}>
          Brands
        </CustomText>
        <View style={styles.brandsView}>
          <TextInput
            value={brand}
            placeholder="Brands"
            placeholderTextColor={'grey'}
            style={{color: '#000', width: RF(230), paddingLeft: RF(10)}}
          />
          <Pressable onPress={() => ref.current?.show()}>
            <FastImage style={styles.dropdownPic} source={dropdown} />
          </Pressable>
        </View>
        <View
          style={{
            height: RF(1),
            backgroundColor: grey,
            marginVertical: RF(10),
          }}></View>
        <CustomText style={{marginVertical: RF(15)}} bold size={14}>
          Price
        </CustomText>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText color={grey}>$10</CustomText>
            <CustomText color={grey}>$5000</CustomText>
          </View>
          <Slider
            value={value}
            onValueChange={value => setValue(value)}
            minimumValue={10}
            maximumValue={5000}
            thumbStyle={{
              width: RF(10),
              height: RF(10),
              backgroundColor: primary,
              borderWidth: RF(1),
              borderColor: white,
            }}
            thumbTintColor={white}
            maximumTrackTintColor={grey}
            minimumTrackTintColor={primary}
            allowTouchTrack
            thumbTouchSize={{width: RF(25), height: RF(25)}}
            animateTransitions
            onSlidingStart={() => setClearAllToggle(false)}
          />
        </View>
        <View
          style={{paddingBottom: RF(20), flex: 1, justifyContent: 'flex-end'}}>
          <Button text={'Find Product'} />
        </View>
        {ref && (
          <ActionSheet
            headerAlwaysVisible
            closeOnPressBack
            closeOnTouchBackdrop
            ref={ref}
            containerStyle={styles.actionSheet}>
            {brands.map(item => (
              <Pressable
                key={item?.id}
                onPress={() => onPressAccSheetText(item?.name)}
                style={styles.actionSheetView}>
                <CustomText size={16} color={primary}>
                  {item?.name}
                </CustomText>
              </Pressable>
            ))}
          </ActionSheet>
        )}
      </View>
    </>
  );
};

export default Filters;
