// export type AuthProvider = '' | 'firebase' | 'google' | 'twitter';

export type FirebaseSignUpResponse = {
  name: string;
  uid: string;
  authProvider: string;
};

export type FirebaseLogInResponse = Omit<FirebaseSignUpResponse, 'name'>;

export type FirebasePayload = {
  email: string;
  password: string;
};

export type FooSignUpResource = {
  name: string;
  uid: string;
};

export type FooLogInResource = {
  uid: string;
};

export type UserResponse = {
  user: {
    name: string;
    uid: string;
  };
};
