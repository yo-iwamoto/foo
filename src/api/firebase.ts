import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebasePayload, FirebaseLogInResponse, FirebaseSignUpResponse } from './types';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// prevent duplicate initializing firebase App

!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// Provider: Firebase

const auth = firebase.auth();

type DefaultResponse = Omit<FirebaseSignUpResponse, 'name'>;

export const firebaseCreateUser = async (payload: FirebasePayload): Promise<DefaultResponse> => {
  try {
    const response = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
    const result: DefaultResponse = {
      uid: response.user.uid,
      authProvider: response.user.providerId
    };
    return result;
  } catch (err) {
    throw err;
  }
};

export const firebaseLogIn = async (payload: FirebasePayload): Promise<FirebaseLogInResponse> => {
  try {
    const response = await auth.signInWithEmailAndPassword(payload.email, payload.password);
    const result: FirebaseLogInResponse = {
      uid: response.user.uid,
      authProvider: response.user.providerId
    };
    return result;
  } catch (err) {
    throw err;
  }
};

// Provider: Google

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const googleSignUp = async (): Promise<FirebaseSignUpResponse> => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    const result: FirebaseSignUpResponse = {
      name: response.user.displayName,
      uid: response.user.uid,
      authProvider: response.user.providerId
    };
    return result;
  } catch (err) {
    throw err;
  }
};

export const googleLogIn = async (): Promise<FirebaseLogInResponse> => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    const result: FirebaseLogInResponse = {
      uid: response.user.uid,
      authProvider: response.user.providerId
    };
    return result;
  } catch (err) {
    throw err;
  }
};

// Provider: Twitter

const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const twitterSignUp = async (): Promise<FirebaseSignUpResponse> => {
  try {
    const response = await auth.signInWithPopup(twitterProvider);
    const result: FirebaseSignUpResponse = {
      name: response.user.displayName,
      uid: response.user.uid,
      authProvider: response.user.providerId
    };
    return result;
  } catch (err) {
    throw err;
  }
};

export const twitterLogIn = async (): Promise<FirebaseLogInResponse> => {
  try {
    const response = await auth.signInWithPopup(twitterProvider);
    const result: FirebaseLogInResponse = {
      uid: response.user.uid,
      authProvider: response.user.providerId
    };
    return result;
  } catch (err) {
    throw err;
  }
};

// Provider: Google or Twitter

// const googleProvider = new firebase.auth.GoogleAuthProvider();
// const twitterProvider = new firebase.auth.TwitterAuthProvider();
// type Provider = Exclude<AuthProvider, 'firebase'>

// export const oAuthSignUp = async (authProvider: Provider): Promise<FirebaseSignUpResponse> => {
//   try {
//     switch (authProvider) {
//       case 'google':
//         const provider = googleProvider;
//         break;
//       case 'twitter':
//         const provider = twitterProvider;
//         break;
//       default:
//         throw new Error();
//     }
//     const response = await auth.signInWithPopup(provider);
//     const result: FirebaseSignUpResponse = {
//       name: response.user.displayName,
//       uid: response.user.uid,
//       authProvider: response.user.providerId
//     };
//     return result;
//   } catch (err) {
//     throw err;
//   }
// };

// export const oAuthLogIn = async (authProvider: Provider): Promise<FirebaseLogInResponse> => {
//   try {
//     switch (authProvider) {
//       case 'google':
//         const provider = googleProvider;
//         break;
//       case 'twitter':
//         const provider = twitterProvider;
//         break;
//       default:
//         throw new Error();
//     }
//     const response = await auth.signInWithPopup(provider);
//     const result: FirebaseLogInResponse = {
//       uid: response.user.uid,
//       authProvider: response.user.providerId
//     };
//     return result;
//   } catch (err) {
//     throw err;
//   }
// };