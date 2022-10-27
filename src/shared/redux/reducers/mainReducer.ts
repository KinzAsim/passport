import {createSlice} from '@reduxjs/toolkit';

interface State {
  token: any;
  fcmToken: any;
  rememberMe: any;
  coupons: any;
  nearbyDispensories: any;
  featuredDispensories: any;
  category: any;
  favouriteCoupons: any;
  favouriteProdcts: any;
  currentLocation: any;
  currentAddress: any;
}

const initialState: State = {
  token: null,
  fcmToken: null,
  rememberMe: null,
  coupons: [],
  nearbyDispensories: [],
  featuredDispensories: [],
  category: [],
  favouriteCoupons: [],
  favouriteProdcts: [],
  currentLocation: {},
  currentAddress: {},
};

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFCMToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },
    setNearbyDispensories: (state, action) => {
      state.nearbyDispensories = action.payload;
    },
    setFeaturedDispensories: (state, action) => {
      state.featuredDispensories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setFavouriteCoupons: (state, action) => {
      state.favouriteCoupons = action.payload;
    },
    setFavouriteProdcts: (state, action) => {
      state.favouriteProdcts = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
  },
});

export const {
  setToken,
  setFCMToken,
  setRememberMe,
  setCoupons,
  setFavouriteCoupons,
  setFavouriteProdcts,
  setNearbyDispensories,
  setFeaturedDispensories,
  setCategory,
  setCurrentLocation,
  setCurrentAddress,
} = mainReducer.actions;

export default mainReducer.reducer;
