import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GeneralState = {
  isLoading: boolean;
}

export const initialState: GeneralState = {
  isLoading: false
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    startLoading: (state: GeneralState) => ({ isLoading: true }),
    endLoading: (state: GeneralState) => ({ isLoading: false })
  },
});

export default generalSlice;