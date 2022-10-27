import {ENDPOINTS, HTTP_CLIENT} from '../exporter';

export const getNearbyDispensaries = (params: any) => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.USER_NEARBY_DISPENSARIES}?per_page=${params.perPage}&page=${params.page}&search=${params.search}`,
    params,
  );
};
export const getSingleNearbyDispensaries = (params: any) => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.USER_NEARBY_DISPENSARIES}`,
    params,
  );
};
// export const getCouponsListing = (params: any) => {
//   return HTTP_CLIENT.post(
//     `${ENDPOINTS.LISTING_COUPONS}?per_page=${params.perPage}&page=${params.page}`,
//     params,
//   );
// };
export const getCouponsListing = (params: any) => {
    return HTTP_CLIENT.post(ENDPOINTS.LISTING_COUPONS,params);
};

export const getRedeemCoupens = (params: any) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.REDEEM_COUPENS}`, params);
};

export const getUserHistory = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.USER_HISTORY}`);
};

export const getCoupons_Dispensory = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.GET_COUPON_DISPENSORY,params);
};

