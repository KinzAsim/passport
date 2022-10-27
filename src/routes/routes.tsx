import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AuthStack from './stacks/authStack';
import MainStack from './stacks/mainStack';

const Routes = () => {
  const {user} = useSelector((state: any) => state.root.user);

  return (
    <SafeAreaProvider>{user ? <MainStack /> : <AuthStack />}</SafeAreaProvider>
  );
};

export default Routes;
