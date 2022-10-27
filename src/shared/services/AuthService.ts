import {ENDPOINTS, HTTP_CLIENT, BASE_URL} from '../exporter';
import axios, {AxiosInstance} from 'axios';
import {showToast} from '../../shared/exporter';

let HEADERS: any = {
  'Content-Type': 'application/json',
};

export const login = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.LOGIN, params);
};

export const register = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.REGISTER, params);
};

export const sendCode = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SEND_CODE, params);
};

export const verify = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.VERIFY_OTP, params);
};

export const forgotPassword = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.FORGOT_PASSWORD, params);
};

export const verifyEmailORPhone = async (params: any, token: any) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${ENDPOINTS.VERIFICATION_EMAIL_PHONE}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.log('ERROR', error.response);
    // showToast('Request Failed', error?.response.data?.message, false);
  }
};
