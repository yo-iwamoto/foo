import { auth } from '../plugins/firebase';
import { FirebaseUid, LogInPayload, SignUpPayload } from '../types';

export const firebaseCreateUser = async (payload: SignUpPayload): Promise<FirebaseUid> => {
  let uid: FirebaseUid;
  auth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(res => {
      uid = res.user.uid;
    })
    .catch((err: Error) => {
      throw err;
    })
  return uid;
}

export const firebaseLogIn = async (payload: LogInPayload): Promise<FirebaseUid> => {
  let uid: FirebaseUid;
  auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(res => {
      uid: res.user.uid;
    })
    .catch((err: Error) => {
      throw err;
    })
  return uid;
}