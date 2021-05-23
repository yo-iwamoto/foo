import * as ActionTypes from './actionTypes';
import { ActionResponse, ShopState } from '@/redux/types';
import { Shop } from '@/types';

type ShopActionResponse = ActionResponse<ShopState>;

export const getShopsAction = (shops: Shop[]): ShopActionResponse => ({
  type: ActionTypes.GET_SHOPS,
  payload: {
    shops,
  },
});

export const clearShopsAction = (): ShopActionResponse => ({
  type: ActionTypes.CLEAR_SHOPS,
  payload: {
    shops: [],
  },
});
