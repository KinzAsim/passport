import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../../screens/general/home';
import Notification from '../../screens/general/notification';
import Map from '../../screens/general/map';

const Stack = createStackNavigator();

const HomeStack = ({route}: any) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default HomeStack;
