import RNFetchBlob from 'rn-fetch-blob';
import {ENDPOINTS, BASE_URL, store, HTTP_CLIENT} from '../exporter';

let HEADERS: any = {
  'Content-Type': 'multipart/form-data,octet-stream',
  Accept: 'application/json',
};
export const postReview = async (params: any, imageState: any) => {
  HEADERS['Authorization'] = `Bearer ${store.getState().root.user.authToken}`;

  if (imageState) {
    console.log('first hittt...', params);

    return RNFetchBlob.fetch(
      'POST',
      BASE_URL + ENDPOINTS.REVIEW_POST,
      HEADERS,
      params,
    );
  } else {
    return HTTP_CLIENT.post(ENDPOINTS.REVIEW_POST, params);
  }
};
