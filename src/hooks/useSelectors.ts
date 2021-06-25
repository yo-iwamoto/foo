import { State, UsersState, UtilitiesState } from '@/redux/types';
import { shallowEqual } from '@babel/types';
import { useSelector } from 'react-redux';

export const useUsersState = (): UsersState => useSelector<State, UsersState>((state) => state.users, shallowEqual);
export const useUtilitiesState = (): UtilitiesState =>
  useSelector<State, UtilitiesState>((state) => state.utilities, shallowEqual);
