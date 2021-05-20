import React, { useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { logInAction, LogInActionPayload } from '../../../redux/users/actions';
import { startLoadingAction, endLoadingAction, raiseModalAction } from '../../../redux/utilities/actions';

import { firebaseSignIn, twitterProvider, googleProvider, catchOAuthRedirect, auth } from '../../../api/authentication/firebase';
import { signIn } from '../../../api/users';
import { useRouter } from 'next/router';

import { Heading, SubHeading, TextLink, GoogleSignIn, Loader, OAuthIcon } from '../../atoms';
import { SignUpForm } from '../../organisms';
import { Spacer } from '../../utilities';
import { FirebasePayload } from '../../../api/types';
import { ModalState, State, UtilityState } from '../../../redux/types';
import { modalTemplates } from '../../../lib/modals';

export const SignUp: React.VFC = () => {
  const router = useRouter(),
        dispatch = useDispatch();

  const googleSignUp = (): void => {
    auth.signInWithRedirect(googleProvider);
  };

  const twitterSignUp = (): void => {
    auth.signInWithRedirect(twitterProvider);
  };

  const firebaseAuth = async (payload: FirebasePayload, name: string): Promise<void> => {
    try {
      dispatch(startLoadingAction());
      const uid = await firebaseSignIn.signUp(payload) as string;
      const resource = { name, uid };
      await signIn.signUp(resource);
      localStorage.removeItem('Access-Token');
      dispatch(raiseModalAction(modalTemplates.checkEmail));
      dispatch(endLoadingAction());
      router.push('/');
    } catch (err) {
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
          signIn.signUp(resource)
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
  }, [])

  if (isLoading) {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <Spacer h={28} />
        <Loader />
        <Spacer h={12} />
        <h1 className="text-center">アカウントを作成しています...</h1>
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
          <br/>
          <TextLink href="/users/login" text="ログイン" color="main" />
        </p>
      </div>
    );
  }
};