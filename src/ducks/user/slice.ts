import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { firebaseCreateUser } from './operations';

export type UserState = {
  isLoggedIn: boolean;
  uid: string;
  name: string;
}

export const initialState: UserState = {
  isLoggedIn: false,
  uid: '',
  name: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state: UserState) => ({
      ...initialState
    })
  },
  // extraReducers: (builder) => 
});

export default userSlice;