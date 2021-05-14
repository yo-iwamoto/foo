import React from 'react';
import { useRouter } from 'next/router';
import { Heading, SubHeading } from '../../../atoms';
import { Spacer } from '../../../utilities';
import { shallowEqual, useSelector } from 'react-redux';
import { State, UserState } from '../../../../redux/types';

export const Mypage: React.VFC = () => {
  const router = useRouter();

  const user = useSelector<State, UserState>(state => state.users, shallowEqual);

  return (
    <>
      <Spacer h={6} />
      <Heading>マイページ</Heading>
      <Spacer h={6} />
      <div className="w-4/5 mx-auto">
        {user.isLoggedIn
          ? <SubHeading>ようこそ、{user.name}さん</SubHeading>
          : <SubHeading>ログインしてください</SubHeading>
        }
      </div>
    </>
  );
}