import { State } from "./store/initialState";

interface ActionResponse<T> {
  type: string;
  payload: Partial<T>;
};

export type UtilityState = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

export type UserState = {
  isLoggedIn: boolean;
  uid: string;
  name: string;
  authProvider: string;
};

export type State = {
  utilities: UtilityState;
  users: UserState;
};