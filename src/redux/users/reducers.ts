import { ActionResponse, UsersState } from '@/redux/types';
import { initialState } from '@/redux/store/initialState';

export const UsersReducer = (
  state: UsersState = initialState.users,
  action: ActionResponse<UsersState>,
): UsersState => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        ...action.payload,
      };
    case 'LOG_OUT':
      return {
        ...state,
        ...action.payload,
      };
    case 'END_NEW_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
