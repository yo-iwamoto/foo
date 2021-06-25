import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logInAction, LogInActionPayload } from '@/redux/users/actions';
import { raiseToastAction } from '@/redux/utilities/actions';
import { UsersController } from '@/api';
import { useRouter } from 'next/router';
import { Heading, TextLink, Loader, OAuthIcon } from '@/components/atoms';
import { LogInForm } from '@/components/organisms';
import { Spacer } from '@/components/utilities';
import { FirebaseSignInPayload, FirebaseSignInResponse } from '@/types';
import { toastTemplates } from '@/lib/toasts';
import { FirebaseController } from '@/api';
import { auth } from '@/api/lib/firebase';
import { useLoadingControll } from '@/hooks/useLoadingControll';
import { useUtilitiesState } from '@/hooks/useSelectors';

export const LogIn: React.VFC = () => {
  const router = useRouter(),
    dispatch = useDispatch();

  const [startLoading, endLoading] = useLoadingControll();

  const googleLogIn = (): void => {
    FirebaseController.googleSignIn();
  };

  const twitterLogIn = (): void => {
    FirebaseController.twitterSignIn();
  };

  const firebaseAuth = async (payload: FirebaseSignInPayload): Promise<void> => {
    try {
      const response = (await FirebaseController.logIn(payload)) as FirebaseSignInResponse;
      const { authProvider, isNewUser, ...logInResource } = response;
      startLoading();
      const res = await UsersController.logIn(logInResource);
      dispatch(logInAction({ ...res.user, isNewUser, authProvider }));
      dispatch(raiseToastAction(toastTemplates.logIn));
      router.push('/users/mypage');
      endLoading();
    } catch {
      endLoading();
    }
  };

  const { isLoading } = useUtilitiesState();

  useEffect(() => {
    startLoading();
    auth
      .getRedirectResult()
      .then((userCredential) => {
        if (userCredential.user) {
          const { authProvider, isNewUser, ...resource } = FirebaseController.catchOAuthRedirect(userCredential);
          UsersController.logIn(resource)
            .then((res) => {
              const actionPayload: LogInActionPayload = {
                ...res.user,
                isNewUser,
                authProvider,
              };
              dispatch(logInAction(actionPayload));
              dispatch(raiseToastAction(toastTemplates.logIn));
              router.push('/users/mypage');
              endLoading();
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

  return (
    <>
      {isLoading && (
        <div className="py-10 px-4 sm:px-0 text-center">
          <Spacer h={28} />
          <Loader isLoading={isLoading} />
          <Spacer h={12} />
          <h1 className="text-center">ログインしています...</h1>
        </div>
      )}
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
          <TextLink href="/users/signup" text="新規会員登録" className="text-main" />
        </p>
      </div>
    </>
  );
};
