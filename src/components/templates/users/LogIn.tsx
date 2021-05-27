import React, { useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { logInAction, LogInActionPayload } from '@/redux/users/actions';
import { startLoadingAction, endLoadingAction, raiseToastAction } from '@/redux/utilities/actions';

import { apiController } from '@/api';
import { useRouter } from 'next/router';

import { Heading, TextLink, Loader, OAuthIcon } from '@/components/atoms';
import { LogInForm } from '@/components/organisms';
import { Spacer } from '@/components/utilities';
import { FirebaseSignInPayload, FirebaseSignInResponse } from '@/types';
import { State, UtilityState } from '@/redux/types';
import { toastTemplates } from '@/lib/toasts';
import { auth } from '@/api/firebase';

export const LogIn: React.VFC = () => {
  const router = useRouter(),
    dispatch = useDispatch();

  const googleLogIn = (): void => {
    apiController.firebase.googleSignIn();
  };

  const twitterLogIn = (): void => {
    apiController.firebase.twitterSignIn();
  };

  const firebaseAuth = async (payload: FirebaseSignInPayload): Promise<void> => {
    try {
      const response = (await apiController.firebase.logIn(payload)) as FirebaseSignInResponse;
      const { authProvider, isNewUser, ...logInResource } = response;
      dispatch(startLoadingAction());
      const res = await apiController.users.logIn(logInResource);
      dispatch(logInAction({ ...res.user, isNewUser, authProvider }));
      dispatch(endLoadingAction());
      dispatch(raiseToastAction(toastTemplates.logIn));
      router.push('/users/mypage');
    } catch {
      dispatch(endLoadingAction());
    }
  };

  const { isLoading } = useSelector<State, UtilityState>((state) => state.utilities, shallowEqual);

  useEffect(() => {
    dispatch(startLoadingAction());
    auth.getRedirectResult()
      .then((userCredential) => {
        if (userCredential.user) {
          const { authProvider, isNewUser, ...resource } = apiController.firebase.catchOAuthRedirect(userCredential);
          apiController.users
            .logIn(resource)
            .then((res) => {
              const actionPayload: LogInActionPayload = {
                ...res.user,
                isNewUser,
                authProvider,
              };
              dispatch(logInAction(actionPayload));
              dispatch(raiseToastAction(toastTemplates.logIn));
              router.push('/users/mypage');
            })
            .catch((err) => {
              dispatch(endLoadingAction());
              throw err;
            });
        } else {
          dispatch(endLoadingAction());
        }
      })
      .catch((err) => {
        dispatch(endLoadingAction());
        throw err;
      });
  }, []);

  if (isLoading) {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <Spacer h={28} />
        <Loader isLoading={isLoading} />
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
          <br />
          <TextLink href="/users/signup" text="新規会員登録" color="main" />
        </p>
      </div>
    );
  }
};
