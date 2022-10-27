import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Scan from '../../screens/general/scan';

const Stack = createStackNavigator();

const ScanStack = ({route}: any) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Scan" component={Scan} />
    </Stack.Navigator>
  );
};

export default ScanStack;
