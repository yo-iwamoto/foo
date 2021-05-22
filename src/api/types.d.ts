import { AuthProvider } from '../redux/types';

export interface FirebaseSignInResponse {
  name: string;
  uid: string;
  isNewUser: boolean;
  authProvider: AuthProvider;
}

export interface FirebasePayload {
  email: string;
  password: string;
}

export interface FooSignInResource {
  name: string;
  uid: string;
}

export type UserResponse = {
  user: {
    name: string;
    uid: string;
  };
};

export type VerificationPayload = string;

export type LikeResponse = {
  message: string;
};

export type GetLikesResponse = {
  result: boolean[];
};

export type UpdateNameResource = {
  uid: string;
  name: string;
};
