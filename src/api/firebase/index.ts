import firebase from 'firebase/app';
import 'firebase/auth';
import { handleFirebaseError } from '@/api/firebase/handleError';
import { FirebaseSignInPayload, FirebaseSignInResponse, FirebaseVerificationPayload, AuthProvider } from '@/types';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// prevent duplicate initializing firebase App

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Provider: Firebase

export const auth = firebase.auth();

const firebaseAuthGenerator =
  (method: 'signup' | 'login') =>
  async (payload: FirebaseSignInPayload): Promise<FirebaseSignInResponse | string | undefined> => {
    try {
      const isSignUp = method === 'signup';
      const response = isSignUp
        ? await auth.createUserWithEmailAndPassword(payload.email!, payload.password!)
        : await auth.signInWithEmailAndPassword(payload.email!, payload.password!);
      if (isSignUp) {
        await response!.user!.sendEmailVerification();
        return response!.user!.uid!;
      } else {
        if (response!.user!.emailVerified) {
          const result: FirebaseSignInResponse = {
            name: response!.user!.displayName!,
            uid: response!.user!.uid!,
            isNewUser: response!.additionalUserInfo!.isNewUser!,
            authProvider: 'firebase',
          };
          return result;
        } else {
          alert('メール認証が完了していません。メールを確認してください。');
        }
      }
    } catch (err) {
      if ('code' in err) {
        handleFirebaseError(err);
      }
      throw err;
    }
  };

const signUp = firebaseAuthGenerator('signup');
const logIn = firebaseAuthGenerator('login');

// Provider: Google or Twitter

const googleProvider = new firebase.auth.GoogleAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

const googleSignIn = (): Promise<void> => auth.signInWithRedirect(googleProvider);
const twitterSignIn = (): Promise<void> => auth.signInWithRedirect(twitterProvider);

const catchOAuthRedirect = (res: firebase.auth.UserCredential): FirebaseSignInResponse => {
  const providerId = res!.credential!.providerId! as AuthProvider;
  const result: FirebaseSignInResponse = {
    name: res!.user!.displayName!,
    uid: res!.user!.uid!,
    isNewUser: res!.additionalUserInfo!.isNewUser!,
    authProvider: providerId,
  };
  return result;
};

// E-mail Verification

const handleActionCode = async (payload: FirebaseVerificationPayload): Promise<void> => {
  try {
    await auth.applyActionCode(payload.actionCode);
  } catch (err) {
    throw err;
  }
};

export const firebaseController = {
  signUp,
  logIn,
  googleSignIn,
  twitterSignIn,
  catchOAuthRedirect,
  handleActionCode,
};
