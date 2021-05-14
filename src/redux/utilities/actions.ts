import * as ActionTypes from './actionTypes';
import { ActionResponse, UtilityState } from '../types';

type UtilityActionResponse = ActionResponse<UtilityState>;

export const startLoadingAction = (): UtilityActionResponse => ({
  type: ActionTypes.START_LOADING,
  payload: {
    isLoading: true
  }
});

export const endLoadingAction = (): UtilityActionResponse => ({
  type: ActionTypes.END_LOADING,
  payload: {
    isLoading: false
  }
});

export const raiseErrorAction = (errorMessage: string): UtilityActionResponse => ({
  type: ActionTypes.RAISE_ERROR,
  payload: {
    isError: true,
    errorMessage: errorMessage
  }
});

export const resolveErrorAction = (): UtilityActionResponse => ({
  type: ActionTypes.RESOLVE_ERROR,
  payload: {
    isError: false,
    errorMessage: ''
  }
});