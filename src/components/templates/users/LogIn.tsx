import React from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { logInAction, LogInActionPayload } from '../../../redux/users/actions';
import { startLoadingAction, endLoadingAction } from '../../../redux/utilities/actions';

import { firebaseSignIn, oAuthSignIn } from '../../../api/firebase';
import { signIn } from '../../../api/users';
import { useRouter } from 'next/router';

import { Heading, SubHeading, TextLink, GoogleSignIn, Loader, OAuthIcon } from '../../atoms';
import { LogInForm } from '../../organisms';
import { ColumnFlexContainer, Spacer } from '../../utilities';
import { FirebasePayload } from '../../../api/types';
import { State, UserState, UtilityState } from '../../../redux/types';
import { FaTwitter } from 'react-icons/fa';

export const LogIn: React.VFC = () => {
  const router = useRouter(),
        dispatch = useDispatch();

  const oAuthLogInGenerator = (provider: 'google' | 'twitter') => async (): Promise<void> => {
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

  const oAuthLogIn = {
    google: oAuthLogInGenerator('google'),
    twitter: oAuthLogInGenerator('twitter')
  };

  const firebaseAuth = async (payload: FirebasePayload): Promise<void> => {
    try {
      const { authProvider, isNewUser, ...logInResource } = await firebaseSignIn.logIn(payload);
      dispatch(startLoadingAction());
      const res = await signIn.logIn(logInResource);
      const actionPayload: LogInActionPayload = {...res.user, isNewUser, authProvider};
      dispatch(logInAction(actionPayload));
      dispatch(endLoadingAction());
      router.push('/users/mypage');
    } catch {
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
        <Heading>ログイン</Heading>
        <Spacer h={6} />
        <ColumnFlexContainer>
          <OAuthIcon provider="google" method="login" onClick={oAuthLogIn.google} />
          <Spacer h={4} />
          <OAuthIcon provider="twitter" method="login" onClick={oAuthLogIn.twitter} />
        </ColumnFlexContainer>
        <Spacer h={6} />
        <p>必要情報を入力して、ログインをクリックしてください。</p>
        <LogInForm firebaseAuth={firebaseAuth} />
        <Spacer h={6} />
        <p>
          まだアカウントを持っていませんか？
          <br/>
          <TextLink href="/users/signup" text="新規会員登録" color="main" />
        </p>
      </div>
    );
  }

};