export type AuthProvider = 'firebase' | 'google.com' | 'twitter.com' | null;

export type FirebaseSignInResponse = {
  name: string;
  uid: string;
  isNewUser: boolean;
  authProvider: AuthProvider;
};

export type FirebaseSignInPayload = {
  email: string;
  password: string;
};

export type FirebaseVerificationPayload = {
  actionCode: string;
};
