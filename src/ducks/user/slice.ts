import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseUid } from '../../types';

export type UserState = {
  isLoggedIn: boolean;
  uid: string;
}

export const initialState: UserState = {
  isLoggedIn: false,
  uid: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state: UserState, action: PayloadAction<FirebaseUid>) => ({
      ...state,
      isLoggedIn: true,
      uid: action.payload
    }),
    logOut: (state: UserState) => ({
      ...initialState
    })
  }
});

export default userSlice;