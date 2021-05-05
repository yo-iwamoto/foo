import firebase from '../../plugins/firebase';
import { FirebaseUid, SignUpPayload } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const firebaseCreateUser = createAsyncThunk(
  'user/firebaseCreateUser',
  async (payload: SignUpPayload) => {
    let result: FirebaseUid;
    firebase.auth().createUserWithEmailAndPassword({...payload})
      .then(res => {
        result = res.user.uid;
      })
      .catch((err: Error) => {
        throw err;
      })
    return result;
  }
);