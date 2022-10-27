const BASE_URL = 'http://178.128.29.7/passport-backend/api/';

const ENDPOINTS = {
  LOGIN: 'login',
  REGISTER: 'register',
  SEND_CODE: 'forgotPasswordRequest',
  VERIFICATION_EMAIL_PHONE: 'verifyEmailOrPhone',
  RESEST_PASSWORD: 'resetPassword',
  VERIFY_OTP: 'verifyOTP',
  FORGOT_PASSWORD: 'forgotPassword',
  REVIEW_POST: 'postReview',
  PRODUCT_DETAIL: 'productDetail',
  PRODUCT_LISTING: 'productListing',
  ADD_REMOVE_FAVOURITES: 'addRemoveFavourite',
  GET_FAVOURITE_COUPONS: 'getFavourites',
  GET_DISPENSARY_COUPONS: 'getDispensaryCoupons',
  PROFILE_UPDATE: 'updateProfile',
  REJECTED_OFFERS: 'rejected-offers',
  USER_NEARBY_DISPENSARIES: 'nearbyDispensaries',
  DISPENSARY_DETAIL: 'Dispensary',
  SCAN_DISPENSARY_QR: 'scanDispensaryQR',
  USER_CHECKIN_DISPENSARY: 'userCheckInDispensary',
  INTAKE_FORM: 'intakeForm',
  LISTING_COUPONS: 'couponListing',
  REDEEM_COUPENS: 'redeemCoupon',
  USER_HISTORY: 'userHistory',
  GET_CATEGORY_PRODUCTS: 'categories',
  GET_COUPON_DISPENSORY: 'coupon/get/available/dispensaries',
};

export {BASE_URL, ENDPOINTS};
