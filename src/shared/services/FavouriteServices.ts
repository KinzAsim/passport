import {ENDPOINTS, HTTP_CLIENT, store} from '../exporter';
let HEADERS: any = {
  'Accept': 'application/json',
};

// export const addOrRemoveFavourites = (params: any) => {
//   return HTTP_CLIENT.post(ENDPOINTS.ADD_REMOVE_FAVOURITES, params);
// };

export const getFavoriteCoupons = (params: any) => {
  HEADERS['Authorization'] = `Bearer ${store.getState().root.user.authToken}`;
  return HTTP_CLIENT.post(ENDPOINTS.GET_FAVOURITE_COUPONS, params);
};

export const addOrRemoveFavourites = (params: any) => {
  HEADERS['Authorization'] = `Bearer${store.getState().root.user.authToken}`;
  return HTTP_CLIENT.post(ENDPOINTS.ADD_REMOVE_FAVOURITES, params);
};

export const getDispensaryCoupons = (params: any) => {
  console.log('paramssss',params);
  
  HEADERS['Authorization'] = `Bearer ${store.getState().root.user.authToken}`;
  return HTTP_CLIENT.post(ENDPOINTS.GET_DISPENSARY_COUPONS, params);
};
