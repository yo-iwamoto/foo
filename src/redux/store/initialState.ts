import { State } from "../types";

export const initialState: State = {
  utilities: {
    isLoading: false,
    isError: false,
    errorMessage: ''
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