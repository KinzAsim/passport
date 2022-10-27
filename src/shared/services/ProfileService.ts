import {BASE_URL, ENDPOINTS, HTTP_CLIENT} from '../exporter';
import RNFetchBlob from 'rn-fetch-blob';
import {store} from '../exporter';

let HEADERS: any = {
  'Content-Type': 'multipart/form-data,octet-stream',
};

export const updateProfile = (params: any) => {  
  HEADERS['Authorization'] = `Bearer ${store.getState().root.user.authToken}`;
  return RNFetchBlob.fetch(
    'POST',
    BASE_URL + ENDPOINTS.PROFILE_UPDATE,
    HEADERS,
    params,
  );
};

export const getRejectedOffers = ()=>{
  return HTTP_CLIENT.get(
    `${ENDPOINTS.REJECTED_OFFERS}`,
  );
}

