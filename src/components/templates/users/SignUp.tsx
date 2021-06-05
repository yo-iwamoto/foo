import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { logInAction } from '@/redux/users/actions';
import { raiseModalAction, raiseToastAction } from '@/redux/utilities/actions';

import { apiController } from '@/api';
import { useRouter } from 'next/router';

import { Heading, TextLink, Loader, OAuthIcon } from '@/components/atoms';
import { SignUpForm } from '@/components/organisms';
import { Spacer } from '@/components/utilities';
import { FirebaseSignInPayload } from '@/types';
import { modalTemplates } from '@/lib/modals';
import { toastTemplates } from '@/lib/toasts';
import { auth } from '@/api/firebase';
import { useLoadingControll } from '@/hooks/useLoadingControll';
import { useSelectors } from '@/hooks/useSelectors';

export const SignUp: React.VFC = () => {
  const router = useRouter(),
    dispatch = useDispatch();

  const [startLoading, endLoading] = useLoadingControll();

  const googleSignUp = (): void => {
    apiController.firebase.googleSignIn();
  };

  const twitterSignUp = (): void => {
    apiController.firebase.twitterSignIn();
  };

  const firebaseAuth = async (payload: FirebaseSignInPayload, name: string): Promise<void> => {
    try {
      startLoading();
      const uid = (await apiController.firebase.signUp(payload)) as string;
      await apiController.users.signUp({ name, uid });
      localStorage.removeItem('Access-Token');
      dispatch(raiseModalAction(modalTemplates.checkEmail));
      endLoading();
      router.push('/');
    } catch (err) {
      endLoading();
    }
  };

  const {
    utilities: { isLoading },
    users: { isNewUser },
  } = useSelectors();

  useEffect(() => {
    startLoading();
    auth
      .getRedirectResult()
      .then((userCredential) => {
        if (userCredential.user) {
          const { authProvider, isNewUser, ...resource } = apiController.firebase.catchOAuthRedirect(userCredential);
          apiController.users
            .signUp(resource)
            .then((res) => {
              dispatch(logInAction({ ...res.user, isNewUser, authProvider }));
              dispatch(raiseToastAction(toastTemplates.logIn));
              router.push('/users/mypage');
            })
            .catch((err) => {
              endLoading();
              throw err;
            });
        } else {
          endLoading();
        }
      })
      .catch((err) => {
        endLoading();
        throw err;
      });
  }, []);

  if (isLoading) {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <Spacer h={28} />
        <Loader isLoading={isLoading} />
        <Spacer h={12} />
        {isNewUser ? (
          <h1 className="text-center">アカウントを作成しています...</h1>
        ) : (
          <h1 className="text-center">ログインしています...</h1>
        )}
      </div>
    );
  } else {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <Heading>新規登録</Heading>
        <Spacer h={12} />
        <div className="flex flex-col sm:flex-row mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-1/3 justify-between">
          <OAuthIcon provider="google" method="signup" onClick={googleSignUp} />
          <Spacer h={4} w={4} />
          <OAuthIcon provider="twitter" method="signup" onClick={twitterSignUp} />
        </div>
        <Spacer h={6} />
        <p>必要情報を入力して、登録するをクリックしてください。</p>
        <SignUpForm firebaseAuth={firebaseAuth} />
        <Spacer h={6} />
        <p>
          すでにアカウントをお持ちですか？
          <br />
          <TextLink href="/users/login" text="ログイン" color="main" />
        </p>
      </div>
    );
  }
};
