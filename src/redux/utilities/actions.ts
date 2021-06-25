import { ActionResponse, ModalState, ToastState, UtilitiesState } from '@/redux/types';

type UtilityActionResponse = ActionResponse<UtilitiesState>;

export const startLoadingAction = (): UtilityActionResponse => ({
  type: 'START_LOADING',
  payload: {
    isLoading: true,
  },
});

export const endLoadingAction = (): UtilityActionResponse => ({
  type: 'END_LOADING',
  payload: {
    isLoading: false,
  },
});

export const raiseToastAction = (toast: ToastState): UtilityActionResponse => ({
  type: 'RAISE_TOAST',
  payload: {
    toast: toast,
  },
});

export const closeToastAction = (): UtilityActionResponse => ({
  type: 'CLOSE_TOAST',
  payload: {
    toast: {
      type: null,
      message: '',
    },
  },
});

export const raiseModalAction = (modal: ModalState): UtilityActionResponse => ({
  type: 'RAISE_MODAL',
  payload: {
    modal: modal,
  },
});

export const closeModalAction = (): UtilityActionResponse => ({
  type: 'CLOSE_MODAL',
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

export const selectAction = (id: string): UtilityActionResponse => ({
  type: 'SELECT',
  payload: {
    selectedShopId: id,
  },
});

export const unSelectAction = (): UtilityActionResponse => ({
  type: 'UNSELECT',
  payload: {
    selectedShopId: '',
  },
});
