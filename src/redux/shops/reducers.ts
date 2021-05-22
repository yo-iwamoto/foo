import * as Actions from './actions';
import * as ActionTypes from './actionTypes';
import { ActionResponse, ShopState } from '@/redux/types';
import { initialState } from '@/redux/store/initialState';

export const ShopsReducer = (
  state: ShopState = initialState.shops,
  action: ActionResponse<ShopState>,
): ShopState => {
  switch (action.type) {
    case ActionTypes.GET_SHOPS:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.CLEAR_SHOPS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
