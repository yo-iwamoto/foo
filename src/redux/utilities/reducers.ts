import * as ActionTypes from './actionTypes';
import { ActionResponse, UtilityState } from '@/redux/types';
import { initialState } from '@/redux/store/initialState';

export const UtilitiesReducer = (
  state: UtilityState = initialState.utilities,
  action: ActionResponse<UtilityState>,
): UtilityState => {
  switch (action.type) {
    case ActionTypes.START_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.END_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.RAISE_TOAST:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.CLOSE_TOAST:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.RAISE_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.CLOSE_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
