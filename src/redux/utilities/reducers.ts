import { ActionResponse, UtilitiesState } from '@/redux/types';
import { initialState } from '@/redux/store/initialState';

export const UtilitiesReducer = (
  state: UtilitiesState = initialState.utilities,
  action: ActionResponse<UtilitiesState>,
): UtilitiesState => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        ...action.payload,
      };
    case 'END_LOADING':
      return {
        ...state,
        ...action.payload,
      };
    case 'RAISE_TOAST':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLOSE_TOAST':
      return {
        ...state,
        ...action.payload,
      };
    case 'RAISE_MODAL':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        ...action.payload,
      };
    case 'SELECT':
      return {
        ...state,
        ...action.payload,
      };
    case 'UNSELECT':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
