import auth from '../plugins/firebase';
import { FirebaseUid, SignUpPayload } from '../types';

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