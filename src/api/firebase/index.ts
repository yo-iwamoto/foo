import { handleFirebaseError } from '@/api/lib/handleError';
import { FirebaseSignInPayload, FirebaseSignInResponse, FirebaseVerificationPayload, AuthProvider } from '@/types';
import { auth, googleAuthProvider, twitterAuthProvider, UserCredential } from '../lib/firebase';

export class FirebaseController {
  static signUp = async (payload: FirebaseSignInPayload): Promise<string> => {
    try {
      const response = await auth.createUserWithEmailAndPassword(payload.email!, payload.password!);
      await response!.user!.sendEmailVerification();
      return response!.user!.uid!;
    } catch (err) {
      if (typeof err === 'object' && 'code' in err!) {
        handleFirebaseError(err);
      }
      throw err;
    }
  };

  static logIn = async (payload: FirebaseSignInPayload): Promise<FirebaseSignInResponse | undefined> => {
    try {
      const response = await auth.signInWithEmailAndPassword(payload.email!, payload.password!);
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
    } catch (err) {
      if (typeof err === 'object' && 'code' in err!) {
        handleFirebaseError(err);
      }
      throw err;
    }
  };

  static googleSignIn = async (): Promise<void> => auth.signInWithRedirect(googleAuthProvider);

  static twitterSignIn = async (): Promise<void> => auth.signInWithRedirect(twitterAuthProvider);

  static catchOAuthRedirect = (res: UserCredential): FirebaseSignInResponse => {
    const providerId = res!.credential!.providerId! as AuthProvider;
    const result: FirebaseSignInResponse = {
      name: res!.user!.displayName!,
      uid: res!.user!.uid!,
      isNewUser: res!.additionalUserInfo!.isNewUser!,
      authProvider: providerId,
    };
    return result;
  };

  static handleActionCode = async (payload: FirebaseVerificationPayload): Promise<void> => {
    try {
      await auth.applyActionCode(payload.actionCode);
    } catch (err) {
      throw err;
    }
  };

  static sendPasswordResetEmail = async (email: string): Promise<void> => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (err) {
      if (typeof err === 'object' && 'code' in err!) {
        handleFirebaseError(err);
      }
      throw err;
    }
  };

  static applyNewPassword = async (code: string, newPassword: string) => {
    try {
      await auth.confirmPasswordReset(code, newPassword);
    } catch (err) {
      throw err;
    }
  };
}
