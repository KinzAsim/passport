import axios, {AxiosInstance} from 'axios';
import {BASE_URL, IOS, setFCMToken, store} from '../exporter';
import messaging from '@react-native-firebase/messaging';

const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
const {user} = store.getState().root.user;

const initialConfig = () => {
  console.log(user?.authToken);
  HTTP_CLIENT.interceptors.request.use(
    config => {
      const {user} = store.getState().root;
      if (user && user?.authToken && config.headers) {
        config.headers.Authorization = `Bearer ${user?.authToken}`;
      }
      return config;
    },
    err => Promise.reject(err),
  );
};

const checkNotificationPermission = async () => {
  const hasPermission = await messaging().hasPermission();
  const enabled = IOS ? hasPermission > 0 : hasPermission;
  if (enabled) {
    getToken();
  } else {
    requestPermission();
  }
};

const getToken = async () => {
  let fcmToken = store.getState().root.main.fcmToken;
  if (!fcmToken) {
    const newToken = await messaging().getToken();
    if (newToken) {
      store.dispatch(setFCMToken(newToken));
    }
  }
};

const requestPermission = async () => {
  console.log('requesting permission');

  try {
    await messaging().requestPermission();
    // User has authorised
    getToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
};

export {HTTP_CLIENT, initialConfig, checkNotificationPermission};
