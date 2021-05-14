import * as Actions from './actions';
import * as ActionTypes from './actionTypes';
import { ActionResponse, UtilityState } from '../types';
import { initialState } from '../store/initialState';

export const UtilitiesReducer = (state: UtilityState = initialState.utilities, action: ActionResponse<UtilityState>): UtilityState => {
  switch (action.type) {
    case ActionTypes.START_LOADING:
      return {
        ...state,
        ...action.payload
      };
    case ActionTypes.END_LOADING:
      return {
        ...state,
        ...action.payload
      };
    case ActionTypes.RAISE_ERROR:
      return {
        ...state,
        ...action.payload
      };
    case ActionTypes.RESOLVE_ERROR:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};