import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../shared/components/customText';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import {styles} from './styles';
import {logo, actionSheetPhoto} from '../../../assets/images';
import CusViewForSettings from '../../../shared/components/cusViewForSettings';
import {navigate} from '../../../shared/services/nav.service';
import ActionSheet from 'react-native-actions-sheet';
import Button from '../../../shared/components/button';
import {RF, updateProfile} from '../../../shared/exporter';
import {format as prettyFormat} from 'pretty-format';
import {setUser} from '../../../shared/redux/reducers/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import LoadingOverlay from '../../../shared/components/loadingOverlay';

const Settings = ({navigation}: any) => {
  const {user} = useSelector((state: any) => state.root.user);
  console.log('uu....', user);
  const toggleState = user?.is_notifiable == 1 ? true : false;
  console.log('togglee...state', toggleState);

  const [toggle, setToggle] = useState(toggleState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // console.log(user?.data?.is_notifiable);
  const ref = useRef<any>();
  const onPressNotification = () => {
    setToggle(!toggle);
    // setLoading(true);

    // const params = new FormData()
    // params.append('is_notifiable' ,'toggle' )
    // console.log('Paramss...',params);

    // updateProfile(params)
    //   .then(response => response.json())
    //   .then(RetrivedData => {
    //     console.log('ddd......', RetrivedData);

    //     dispatch(setUser(RetrivedData?.data));
    //   })
    //   .catch(err => {
    //     // console.log(prettyFormat(err));
    //   })
    //   .catch(err => {
    //     // console.log(prettyFormat(err));
    //   })
    //   .finally(() => setLoading(false));
  };

  const prevState = useRef({toggle}).current;
  useEffect(() => {
    if (prevState.toggle !== toggle) {
      // process here
      updateProfileServe();
    }

    return () => {
      prevState.toggle = toggle;
    };
  }, [toggle]);

  const updateProfileServe = () => {
    console.log('toggle...', toggle);

    const params: any = [{name: 'is_notifiable', data: toggle ? '1' : '0'}];

    setLoading(true);
    updateProfile(params)
      .then(response => response.json())
      .then(RetrivedData => {
        console.log('ddd......', RetrivedData);

        dispatch(setUser(RetrivedData?.data));
      })
      .catch(err => {
        // console.log(prettyFormat(err));
      })
      .catch(err => {
        // console.log(prettyFormat(err));
      })
      .finally(() => setLoading(false));
  };

  const onPressLetsTalk = () => {
    navigate('SupportForSettings', {navigation: navigation});
    ref.current?.hide();
  };
  const onPressPrivacyPolicy = () => {
    navigate('PrivacyPolicy');
  };
  const onPressTermsAndConditions = () => {
    navigate('TermsAndConditions');
  };
  const onPressAboutUs = () => {
    navigate('AboutUs');
  };
  return (
    <>
      <HeaderWrapper showBtnLeft showTitle title={'Settings'} />
      <View style={styles.container}>
        <CusViewForSettings
          toggleValueChange={onPressNotification}
          title={'Notification'}
          toggleValue={toggle}
        />
        <CusViewForSettings
          onPress={onPressPrivacyPolicy}
          title={'Privacy Policy'}
        />
        <CusViewForSettings
          onPress={onPressTermsAndConditions}
          title={'Terms & Conditions'}
        />
        <CusViewForSettings onPress={onPressAboutUs} title={'About Us'} />
        <CusViewForSettings
          onPress={() => ref.current?.show()}
          title={'Support'}
        />
        <View style={styles.logoView}>
          <FastImage
            source={logo}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <CustomText>Version 1.15.0</CustomText>
        </View>
        {ref && (
          <ActionSheet
            headerAlwaysVisible
            closeOnPressBack
            closeOnTouchBackdrop
            ref={ref}
            containerStyle={styles.actionSheet}>
            <FastImage
              style={styles.actionSheetPhoto}
              source={actionSheetPhoto}
            />
            <CustomText style={styles.AccTxt} bold size={14}>
              Get Support
            </CustomText>
            <CustomText style={styles.AccTxtMini}>
              For any support requests, please feel
            </CustomText>
            <CustomText style={styles.AccTxtMini1}>
              free to email us below
            </CustomText>
            <View style={styles.btnView}>
              <Button text={"Let's Talk"} onPress={onPressLetsTalk} />
            </View>
          </ActionSheet>
        )}
        <LoadingOverlay loading={loading} />
      </View>
    </>
  );
};

export default Settings;
