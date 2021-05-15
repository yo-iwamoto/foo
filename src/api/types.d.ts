export interface FirebaseSignInResponse {
  name: string;
  uid: string;
  isNewUser: boolean;
  authProvider: string;
};

export interface FirebasePayload {
  email: string;
  password: string;
};

export interface FooSignInResource {
  name: string;
  uid: string;
};

export type UserResponse = {
  user: {
    name: string;
    uid: string;
  };
};
