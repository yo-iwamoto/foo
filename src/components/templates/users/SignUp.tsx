import React from 'react';

import { useDispatch } from 'react-redux';
import { logInAction, LogInActionPayload } from '../../../redux/users/actions';
import { startLoadingAction, endLoadingAction } from '../../../redux/utilities/actions';

import { firebaseCreateUser, googleSignUp, twitterSignUp } from '../../../api/firebase';
import { signUp } from '../../../api/users';
import { useRouter } from 'next/router';

import { Heading, SubHeading, TextLink, GoogleSignIn } from '../../atoms';
import { SignUpForm } from '../../organisms';
import { Spacer } from '../../utilities';
import { FirebasePayload } from '../../../api/types';

export const SignUp: React.VFC = () => {
  const router = useRouter(),
        dispatch = useDispatch();

  const googleAuth = async (): Promise<void> => {
    try {
      const { authProvider, ...signUpResource } = await googleSignUp();
      dispatch(startLoadingAction());
      const res = await signUp(signUpResource);
      const actionPayload: LogInActionPayload = {...res.user, authProvider};
      dispatch(logInAction(actionPayload));
      dispatch(endLoadingAction());
      router.push('/users/mypage');
    } catch {
      dispatch(endLoadingAction());
    }
  };

  const twitterAuth = async (): Promise<void> => {
    try {
      const { authProvider, ...signUpResource } = await twitterSignUp();
      dispatch(startLoadingAction());
      const res = await signUp(signUpResource);
      const actionPayload: LogInActionPayload = {...res.user, authProvider};
      dispatch(logInAction(actionPayload));
      dispatch(endLoadingAction());
      router.push('/users/mypage');
    } catch {
      dispatch(endLoadingAction());
    }
  };

  const firebaseAuth = async (payload: FirebasePayload, name: string): Promise<void> => {
    try {
      dispatch(startLoadingAction());
      const { authProvider, uid } = await firebaseCreateUser(payload);
      const signUpResource = { uid, name };
      const res = await signUp(signUpResource);
      const actionPayload: LogInActionPayload = {...res.user, authProvider};
      dispatch(logInAction(actionPayload));
      dispatch(endLoadingAction());
      router.push('/users/mypage');
    } catch {
      dispatch(endLoadingAction());
    }
  };

  return (
    <div className="py-10 px-4 sm:px-0 text-center">
      <Heading>新規登録</Heading>
      <Spacer h={6} />
      <GoogleSignIn onClick={googleAuth} />
      <p>必要情報を入力して、登録するをクリックしてください。</p>
      <SignUpForm firebaseAuth={firebaseAuth} />
      <Spacer h={6} />
      <p>
        すでにアカウントをお持ちですか？
        <br/>
        <TextLink href="/users/login" text="ログイン" color="main" />
      </p>
    </div>
  );
};