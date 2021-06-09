import * as ActionTypes from './actionTypes';
import { ActionResponse, ShopState } from '@/redux/types';
import { FooShop, Shop } from '@/types';

type ShopActionResponse<T> = ActionResponse<T>;

export const getShopsAction = (shops: Shop[]): ShopActionResponse<ShopState> => ({
  type: ActionTypes.GET_SHOPS,
  payload: {
    shops,
  },
});

export const addShopsAction = (shops: Shop[]): ShopActionResponse<ShopState> => ({
  type: ActionTypes.ADD_SHOPS,
  payload: {
    shops,
  },
});

export const updateShopAction = (fooShop: FooShop): ShopActionResponse<FooShop> => ({
  type: ActionTypes.UPDATE_SHOP,
  payload: {
    ...fooShop,
  },
});

export const clearShopsAction = (): ShopActionResponse<ShopState> => ({
  type: ActionTypes.CLEAR_SHOPS,
  payload: {
    shops: [],
  },
});
