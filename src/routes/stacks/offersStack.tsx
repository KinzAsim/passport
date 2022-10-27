import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Offers from '../../screens/general/offers';

const Stack = createStackNavigator();

const OffersStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Offers" component={Offers} />
    </Stack.Navigator>
  );
};

export default OffersStack;
