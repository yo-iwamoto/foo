import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseError } from './firebaseErrors';
import { FirebasePayload, FirebaseSignInResponse } from './types';

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

const auth = firebase.auth();
  
// Provider: Firebase

const firebaseAuthGenerator = (method: 'signup' | 'login') => async (payload: FirebasePayload): Promise<FirebaseSignInResponse> => {
  try {
    const isSignUp = method === 'signup';
    const response = isSignUp
      ? await auth.createUserWithEmailAndPassword(payload.email, payload.password)
      : await auth.signInWithEmailAndPassword(payload.email, payload.password);
    const result: FirebaseSignInResponse = {
      name: response.user.displayName,
      uid: response.user.uid,
      isNewUser: response.additionalUserInfo.isNewUser,
      authProvider: response.user.providerId
    };
    return result;
  } catch (err) {
    if ('code' in err) {
      switch (err.code) {
        case firebaseError.existEmail:
          alert('既に登録済みのメールアドレスです\nログインしてください');
          break;
        case firebaseError.internalError:
          alert('予期しないエラーが発生しました');
          break;
        case firebaseError.invalidEmail:
          alert('無効なメールアドレスが入力されています');
          break;
        case firebaseError.weakPassword:
          alert('パスワードは6文字以上で入力してください');
          break;
        case firebaseError.invalidPassword:
          alert('無効なパスワードが入力されています');
          break;
        default:
          alert(err.code);
      }
    }
    throw err;
  }
}

export const firebaseSignIn = {
  signUp: firebaseAuthGenerator('signup'),
  logIn: firebaseAuthGenerator('login')
};

// Provider: Google or Twitter

const googleProvider = new firebase.auth.GoogleAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
type Provider = typeof googleProvider | typeof twitterProvider;

const oAuthGenerator = (provider: Provider) => async (): Promise<FirebaseSignInResponse> => {
  try {
    const response = await auth.signInWithPopup(provider);
    const result: FirebaseSignInResponse = {
      name: response.user.displayName,
      uid: response.user.uid,
      isNewUser: response.additionalUserInfo.isNewUser,
      authProvider: response.user.providerId
    };
    return result;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    throw err;
  }
}

export const oAuthSignIn = {
  google: oAuthGenerator(googleProvider),
  twitter: oAuthGenerator(twitterProvider)
};