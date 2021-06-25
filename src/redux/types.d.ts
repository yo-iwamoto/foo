import { Shop } from '@/types';
import { AuthProvider } from '@/types';
import { State } from './store/initialState';

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

export type UsersState = {
  isLoggedIn: boolean;
  uid: string;
  name: string;
  isNewUser: boolean;
  authProvider: AuthProvider;
};

export type UtilitiesState = {
  isLoading: boolean;
  toast: ToastState;
  modal: ModalState;
  selectedShopId: string;
};

export type State = {
  utilities: UtilitiesState;
  users: UsersState;
};
