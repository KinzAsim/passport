import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './src/routes/routes';
import {store, persistor} from './src/shared/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {GOOGLE_MAPS_APIKEY} from './src/shared/utils/contsants';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import Geocoder from 'react-native-geocoding';
import {
  checkNotificationPermission,
  initialConfig,
  navigationRef,
  notificationOpenHandler,
} from './src/shared/exporter';

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage: any) =>
  notificationOpenHandler(remoteMessage.data),
);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  useEffect(() => {
    initialConfig();
    checkNotificationPermission();
    getInitialNotification();
    onNotificationOpenedApp();
    Geocoder.init(GOOGLE_MAPS_APIKEY);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('A new FCM message arrived!', remoteMessage);
    });
    return unsubscribe;
  }, []);

  const getInitialNotification = () => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          notificationOpenHandler(remoteMessage.data);
        }
      });
  };

  const onNotificationOpenedApp = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      notificationOpenHandler(remoteMessage.data);
    });
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <Routes />
            <Toast position="bottom" />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
