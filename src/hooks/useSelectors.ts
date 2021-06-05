import { ShopState, State, UserState, UtilityState } from '@/redux/types';
import { shallowEqual } from '@babel/types';
import { useSelector } from 'react-redux';

export const useSelectors = (): State => ({
  users: useSelector<State, UserState>((state) => state.users, shallowEqual),
  shops: useSelector<State, ShopState>((state) => state.shops, shallowEqual),
  utilities: useSelector<State, UtilityState>((state) => state.utilities, shallowEqual),
});
