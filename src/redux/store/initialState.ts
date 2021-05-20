import { State } from '../types';

export const initialState: State = {
  utilities: {
    isLoading: false,
    toast: {
      type: null,
      message: ''
    },
    modal: {
      type: null,
      title: '',
      message: '',
      link: null,
      buttonText: ''
    }
  },
  users: {
    isLoggedIn: false,
    uid: '',
    name: '',
    isNewUser: false,
    authProvider: ''
  },
  shops: {
    shops: [],
    page: 0
  }
};