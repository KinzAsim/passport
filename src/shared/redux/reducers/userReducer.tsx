import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  user: null,
  isLoggedIn: true,
  authToken: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: state => {
      state.user = null;
      state.authToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const {setUser, signOut, setAuthToken} = userReducer.actions;

export default userReducer.reducer;
