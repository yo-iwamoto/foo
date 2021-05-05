import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice, { initialState as userState } from './user/slice';
import generalSlice, { initialState as generalState } from './general/slice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  general: generalSlice.reducer
});

const preloadedState = () => {
  return {
    user: userState,
    general: generalState
  };
};

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStore = Store<StoreState>;

const createStore = () => {
  const middlewareList = [...getDefaultMiddleware(), logger];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState()
  })
}

export default createStore;