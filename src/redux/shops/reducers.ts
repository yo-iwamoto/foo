import * as ActionTypes from './actionTypes';
import { ActionResponse, ShopState } from '@/redux/types';
import { initialState } from '@/redux/store/initialState';
import { FooShop, Shop } from '@/types';

export const ShopsReducer = (
  state: ShopState = initialState.shops,
  action: ActionResponse<ShopState | Shop>,
): ShopState => {
  switch (action.type) {
    case ActionTypes.GET_SHOPS:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.ADD_SHOPS:
      if ('shops' in action.payload) {
        return {
          ...state,
          shops: state.shops.concat(action.payload.shops!),
        };
      }
    case ActionTypes.UPDATE_SHOP:
      if ('hotpepper_id' in action.payload) {
        const newShop = action.payload as NonNullable<FooShop>;
        state.shops.map((shop) => {
          if (shop.id === newShop.hotpepper_id) {
            shop.foo = newShop;
          }
        });
        return state;
      }
    case ActionTypes.CLEAR_SHOPS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
