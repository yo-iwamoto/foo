import React from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { logInAction, LogInActionPayload } from '../../../redux/users/actions';
import { startLoadingAction, endLoadingAction } from '../../../redux/utilities/actions';

import { firebaseLogIn, googleLogIn, twitterLogIn } from '../../../api/firebase';
import { logIn } from '../../../api/users';
import { useRouter } from 'next/router';

import { Heading, SubHeading, TextLink, GoogleSignIn } from '../../atoms';
import { LogInForm } from '../../organisms';
import { Spacer } from '../../utilities';
import { FirebasePayload } from '../../../api/types';
import { State, UtilityState } from '../../../redux/types';
import Loader from 'react-spinners/SyncLoader';

export const LogIn: React.VFC = () => {
  const router = useRouter(),
        dispatch = useDispatch();

  const { isLoading } = useSelector<State, UtilityState>(state => state.utilities, shallowEqual);

  const googleAuth = async (): Promise<void> => {
    try {
      const { authProvider, ...logInResource } = await googleLogIn();
      dispatch(startLoadingAction());
      const res = await logIn(logInResource);
      const actionPayload: LogInActionPayload = {...res.user, authProvider};
      dispatch(logInAction(actionPayload));
      dispatch(endLoadingAction);
      router.push('/users/mypage');
    } catch {
      dispatch(endLoadingAction());
    }
  };

  const twitterAuth = async (): Promise<void> => {
    try {
      const { authProvider, ...logInResource } = await twitterLogIn();
      dispatch(startLoadingAction());
      const res = await logIn(logInResource);
      const actionPayload: LogInActionPayload = {...res.user, authProvider};
      dispatch(logInAction(actionPayload));
      dispatch(endLoadingAction);
      router.push('/users/mypage');
    } catch {
      dispatch(endLoadingAction());
    }
  };

  const firebaseAuth = async (payload: FirebasePayload): Promise<void> => {
    try {
      dispatch(startLoadingAction());
      const { authProvider, ...logInResource } = await firebaseLogIn(payload);
      const res = await logIn(logInResource);
      const actionPayload: LogInActionPayload = {...res.user, authProvider};
      dispatch(logInAction(actionPayload));
      dispatch(endLoadingAction);
      router.push('/users/mypage');
    } catch {
      dispatch(endLoadingAction());
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <SubHeading>処理中です・・・</SubHeading>
        <Loader />
      </div>
    )
  } else {
    return (
      <div className="py-10 px-4 sm:px-0 text-center">
        <Heading>ログイン</Heading>
        <Spacer h={6} />
        <GoogleSignIn onClick={googleAuth} />
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