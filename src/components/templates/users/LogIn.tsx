import React, { useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { logInAction, LogInActionPayload } from '../../../redux/users/actions';
import { startLoadingAction, endLoadingAction } from '../../../redux/utilities/actions';

import { auth, catchOAuthRedirect, firebaseSignIn, googleProvider, twitterProvider } from '../../../api/authentication/firebase';
import { signIn } from '../../../api/users';
import { useRouter } from 'next/router';

import { Heading, SubHeading, TextLink, GoogleSignIn, Loader, OAuthIcon } from '../../atoms';
import { LogInForm } from '../../organisms';
import { ColumnFlexContainer, Spacer } from '../../utilities';
import { FirebasePayload, FirebaseSignInResponse } from '../../../api/types';
import { State, UserState, UtilityState } from '../../../redux/types';

export const LogIn: React.VFC = () => {
  const router = useRouter(),
        dispatch = useDispatch();

  const googleLogIn = (): void => {
    auth.signInWithRedirect(googleProvider);
  };

  const twitterLogIn = (): void => {
    auth.signInWithRedirect(twitterProvider)
  };

  const firebaseAuth = async (payload: FirebasePayload): Promise<void> => {
    try {
      const response = await firebaseSignIn.logIn(payload) as FirebaseSignInResponse;
      const { authProvider, isNewUser, ...logInResource } = response;
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

  useEffect(() => {
    dispatch(startLoadingAction());
    const userCredential = auth.getRedirectResult()
      .then(userCredential => {
        if (userCredential.user) {
          const { authProvider, isNewUser, ...resource } = catchOAuthRedirect(userCredential);
          signIn.logIn(resource)
            .then(res => {
              const actionPayload: LogInActionPayload = {...res.user, isNewUser, authProvider};
              dispatch(logInAction(actionPayload));
              router.push('/users/mypage');
            })
            .catch(err => {
              throw err;
              dispatch(endLoadingAction());
            })
        } else {
          dispatch(endLoadingAction());
        }
      })
      .catch(err => {
        throw err;
        dispatch(endLoadingAction());
      })
  }, []);

  if (isLoading) {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <Spacer h={28} />
        <Loader />
        <Spacer h={12} />
        <h1 className="text-center">ログインしています...</h1>
      </div>
    );
  } else {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <Heading>ログイン</Heading>
        <Spacer h={12} />
        <div className="flex flex-col sm:flex-row mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-1/3 justify-between">
          <OAuthIcon provider="google" method="login" onClick={googleLogIn} />
          <Spacer h={4} w={4} />
          <OAuthIcon provider="twitter" method="login" onClick={twitterLogIn} />
        </div>
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