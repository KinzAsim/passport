import {Alert, Dimensions} from 'react-native';
import Toast from 'react-native-toast-message';

export const showToast = (text1: string, text2: string, type: boolean) => {
  Toast.show({text1, text2, type: type ? 'success' : 'error',visibilityTime:2000});
};