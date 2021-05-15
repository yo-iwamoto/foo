import { Shop } from "../types";
import { State } from "./store/initialState";

interface ActionResponse<T> {
  type: string;
  payload: Partial<T>;
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
  isError: boolean;
  errorMessage: string;
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