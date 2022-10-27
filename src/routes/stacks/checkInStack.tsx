import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CheckIn from '../../screens/general/checkIn';

const Stack = createStackNavigator();

const CheckInStack = ({route}: any) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={CheckIn} />
    </Stack.Navigator>
  );
};

export default CheckInStack;
