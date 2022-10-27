import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Pressable, PermissionsAndroid} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {
  homeselected,
  homeunselected,
  offers,
  checkIn,
  profile,
  scan,
} from '../../assets/images/index';
import {RF, THEME} from '../../shared/exporter';
import CheckInStack from '../stacks/checkInStack';
import HomeStack from '../stacks/homeStack';
import OffersStack from '../stacks/offersStack';
import ProfileStack from '../stacks/profileStack';
import ScanStack from '../stacks/scanStack';

const {white, lightGray, primary} = THEME.colors;

const Tab = createBottomTabNavigator();

const CustomScanTabBarButton = ({onPress}: any) => {
  return (
    <Pressable
      onPress={()=>requestCameraPermission(onPress)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: RF(10),
      }}>
      <FastImage source={scan} style={styles.tabBarBtnMainContainer} />
    </Pressable>
  );
};
const requestCameraPermission = async (onPress:any) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Passport Camera Permission',
        message: 'Passport needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission given');
      onPress();
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
const CustomHomeTabBarButton = ({onPress, focused}: any) => {
  return focused ? (
    <FastImage style={styles.homeImage} source={homeselected} />
  ) : (
    <FastImage style={styles.homeImage} source={homeunselected} />
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route: {name}}) => ({
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: lightGray,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          marginBottom: RF(5),
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          width: RF(20),
          maxHeight: RF(30),
          marginTop: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, focused}) => (
            <CustomHomeTabBarButton focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersStack}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon source={offers} color={color} />,
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanStack}
        options={{
          tabBarButton: props => <CustomScanTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="CheckIn"
        component={CheckInStack}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon source={checkIn} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon source={profile} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarIcon = ({source, color}: {source: Source; color: string}) => (
  <FastImage
    source={source}
    style={{
      width: RF(20),
      height: RF(20),
    }}
    tintColor={color}
    resizeMode={'contain'}
  />
);

export default MyTabs;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: white,
    height: '10%',
    justifyContent: 'center',
    paddingBottom: RF(10),
  },
  tabBarBtnMainContainer: {
    width: RF(75),
    height: RF(75),
    marginTop: RF(13),
  },
  tabBarBtnMainContainerClose: {
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: RF(20),
    height: RF(20),
  },
  btnContainerClose: {
    width: RF(56),
    height: RF(56),
    borderRadius: RF(30),
    backgroundColor: 'red',
  },
  mt10: {
    marginTop: RF(10),
  },
  homeImage: {
    width: RF(24),
    height: RF(24),
  },
});
