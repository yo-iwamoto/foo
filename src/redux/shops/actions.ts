import * as ActionTypes from './actionTypes';
import { ActionResponse, ShopState } from '../types';
import { Shop } from '../../types';

type ShopActionResponse = ActionResponse<ShopState>;

export const getShopsAction = (shops: Shop[], page: number): ShopActionResponse => ({
  type: ActionTypes.GET_SHOPS,
  payload: {
    shops,
    page
  }
});

export const clearShopsAction = (): ShopActionResponse => ({
  type: ActionTypes.CLEAR_SHOPS,
  payload: {
    shops: [],
    page: 0
  }
});