import { Shop } from '@/types';
import { State } from './store/initialState';

export type AuthProvider = 'firebase' | 'google.com' | 'twitter.com' | null;

interface ActionResponse<T> {
  type: string;
  payload: Partial<T>;
}

type ToastType = 'error' | 'success';
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
  authProvider: AuthProvider;
};

export type UtilityState = {
  isLoading: boolean;
  toast: ToastState;
  modal: ModalState;
};

export type ShopState = {
  shops: Shop[];
};

export type State = {
  utilities: UtilityState;
  users: UserState;
  shops: ShopState;
};
