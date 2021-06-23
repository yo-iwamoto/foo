import * as ActionTypes from './actionTypes';
import { ActionResponse, ModalState, ToastState, UtilityState } from '@/redux/types';

type UtilityActionResponse = ActionResponse<UtilityState>;

export const startLoadingAction = (): UtilityActionResponse => ({
  type: ActionTypes.START_LOADING,
  payload: {
    isLoading: true,
  },
});

export const endLoadingAction = (): UtilityActionResponse => ({
  type: ActionTypes.END_LOADING,
  payload: {
    isLoading: false,
  },
});

export const raiseToastAction = (toast: ToastState): UtilityActionResponse => ({
  type: ActionTypes.RAISE_TOAST,
  payload: {
    toast: toast,
  },
});

export const closeToastAction = (): UtilityActionResponse => ({
  type: ActionTypes.CLOSE_TOAST,
  payload: {
    toast: {
      type: null,
      message: '',
    },
  },
});

export const raiseModalAction = (modal: ModalState): UtilityActionResponse => ({
  type: ActionTypes.RAISE_MODAL,
  payload: {
    modal: modal,
  },
});

export const closeModalAction = (): UtilityActionResponse => ({
  type: ActionTypes.CLOSE_MODAL,
  payload: {
    modal: {
      type: null,
      title: '',
      message: '',
      link: null,
      buttonText: '',
    },
  },
});
