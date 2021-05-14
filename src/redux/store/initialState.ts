import { State } from "../types";

export const initialState: State = {
  utilities: {
    isLoading: false,
    isError: false,
    errorMessage: ''
  },
  users: {
    isLoggedIn: true,
    uid: '',
    name: '',
    authProvider: ''
  },
  shops: {
    shops: [],
    page: 0
  }
};