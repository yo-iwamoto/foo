import * as ActionTypes from './actionTypes';
import { ActionResponse, UsersState } from '@/redux/types';

type UserActionResponse = ActionResponse<UsersState>;

export type LogInActionPayload = Omit<UsersState, 'isLoggedIn'>;

export const logInAction = (payload: LogInActionPayload): UserActionResponse => ({
  type: ActionTypes.LOG_IN,
  payload: {
    isLoggedIn: true,
    ...payload,
  },
});

export const logOutAction = (): UserActionResponse => ({
  type: ActionTypes.LOG_OUT,
  payload: {
    isLoggedIn: false,
    uid: '',
    name: '',
    isNewUser: false,
    authProvider: null,
  },
});

export const endNewUserAction = (): UserActionResponse => ({
  type: ActionTypes.END_NEW_USER,
  payload: {
    isNewUser: false,
  },
});

export const updateUserAction = (payload: Partial<UsersState>): UserActionResponse => ({
  type: ActionTypes.UPDATE_USER,
  payload: payload,
});
