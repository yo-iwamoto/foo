import { Shop } from '../types';
import { State } from './store/initialState';

interface ActionResponse<T> {
  type: string;
  payload: Partial<T>;
};

type ToastType = 'error' | 'info';
type ToastState = {
  type: ToastType | null;
  message: string;
};

type ModalType = 'mail' | 'success' | 'registration';
type ModalState = {
  type: ModalType | null;
  title: string;
  message: string;
  link: string | null;
  buttonText: string;
};

export type UserState = {
  isLoggedIn: boolean;
  uid: string;
  name: string;
  isNewUser: boolean;
  authProvider: string;
};

export type UtilityState = {
  isLoading: boolean;
  toast: ToastState;
  modal: ModalState;
};

export type ShopState = {
  shops: Shop[];
  page: number;
}

export type State = {
  utilities: UtilityState;
  users: UserState;
  shops: ShopState;
};