import * as ActionTypes from './actionTypes';
import { ActionResponse, UsersState } from '@/redux/types';
import { initialState } from '@/redux/store/initialState';

export const UsersReducer = (
  state: UsersState = initialState.users,
  action: ActionResponse<UsersState>,
): UsersState => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.LOG_OUT:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.END_NEW_USER:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
