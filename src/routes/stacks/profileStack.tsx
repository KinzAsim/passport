import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Profile from '../../screens/general/profile';
import EditProfile from '../../screens/general/EditProfile';

const Stack = createStackNavigator();

const ProfileStack = ({route}: any) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
