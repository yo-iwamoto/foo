import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserState } from '../../../../ducks/user/selectors';
import { Heading } from '../../../atoms';
import { Vertical6 } from '../../../utilities';

export const Mypage: React.VFC = () => {
  const state = useUserState().user,
        router = useRouter();

  return (
    <>
      <Vertical6 />
      <Heading>マイページ</Heading>
    </>
  );
}