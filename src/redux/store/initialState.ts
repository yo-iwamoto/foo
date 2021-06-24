import { State } from '@/redux/types';

export const initialState: State = {
  utilities: {
    isLoading: false,
    toast: {
      type: null,
      message: '',
    },
    modal: {
      type: null,
      title: '',
      message: '',
      link: null,
      buttonText: '',
    },
  },
  users: {
    isLoggedIn: false,
    uid: '',
    name: '',
    isNewUser: false,
    authProvider: null,
  },
};
