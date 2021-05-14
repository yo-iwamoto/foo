import * as ActionTypes from './actionTypes';
import { ActionResponse, UserState } from '../types';

type UserActionResponse = ActionResponse<UserState>;

export type LogInActionPayload = Omit<UserState, 'isLoggedIn'>;

export const logInAction = (payload: LogInActionPayload): UserActionResponse => ({
  type: ActionTypes.LOG_IN,
  payload: {
    isLoggedIn: true,
    ...payload
  }
});

export const logOutAction = (): UserActionResponse => ({
  type: ActionTypes.LOG_OUT,
  payload: {
    isLoggedIn: false,
    uid: '',
    name: '',
    authProvider: ''
  }
});