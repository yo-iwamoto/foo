import React from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { logInAction, LogInActionPayload } from '../../../redux/users/actions';
import { startLoadingAction, endLoadingAction } from '../../../redux/utilities/actions';

import { firebaseSignIn, oAuthSignIn } from '../../../api/firebase';
import { signIn } from '../../../api/users';
import { useRouter } from 'next/router';

import { Heading, SubHeading, TextLink, GoogleSignIn, Loader, OAuthIcon } from '../../atoms';
import { SignUpForm } from '../../organisms';
import { Spacer } from '../../utilities';
import { FirebasePayload } from '../../../api/types';
import { State, UtilityState } from '../../../redux/types';
import { FaTwitter } from 'react-icons/fa';

export const SignUp: React.VFC = () => {
  const router = useRouter(),
        dispatch = useDispatch();

  const oAuthSignUpGenerator = (provider: 'google' | 'twitter') => async (): Promise<void> => {
    const isGoogle = provider === 'google';
    const handler = isGoogle
      ? oAuthSignIn.google
      : oAuthSignIn.twitter;
    try {
      dispatch(startLoadingAction());
      const { authProvider, isNewUser, ...resource } = await handler();
      const res = await signIn.signUp(resource);
      const actionPayload: LogInActionPayload = {...res.user, isNewUser, authProvider};
      dispatch(logInAction(actionPayload));
      dispatch(endLoadingAction());
      router.push('/users/mypage');
    } catch {
      dispatch(endLoadingAction());
    }
  };

  const oAuthSignUp = {
    google: oAuthSignUpGenerator('google'),
    twitter: oAuthSignUpGenerator('twitter')
  };

  const firebaseAuth = async (payload: FirebasePayload, name: string): Promise<void> => {
    try {
      dispatch(startLoadingAction());
      const { authProvider, isNewUser, uid } = await firebaseSignIn.signUp(payload);
      const resource = { uid, name };
      const res = await signIn.signUp(resource);
      const actionPayload: LogInActionPayload = {...res.user, isNewUser, authProvider};
      dispatch(logInAction(actionPayload));
      dispatch(endLoadingAction());
      router.push('/users/mypage');
    } catch (err) {
      throw err;
      dispatch(endLoadingAction());
    }
  };

  const { isLoading } = useSelector<State, UtilityState>(state => state.utilities, shallowEqual);

  if (isLoading) {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <SubHeading>処理中です・・・</SubHeading>
        <Spacer h={6} />
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <Heading>新規登録</Heading>
        <Spacer h={12} />
        <div className="flex flex-col sm:flex-row mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-1/3 justify-between">
          <OAuthIcon provider="google" method="signup" onClick={oAuthSignUp.google} />
          <Spacer h={4} w={4} />
          <OAuthIcon provider="twitter" method="signup" onClick={oAuthSignUp.twitter} />
        </div>
        <Spacer h={6} />
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
  }
};