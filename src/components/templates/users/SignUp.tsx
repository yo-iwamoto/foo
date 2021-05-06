import React from 'react';

import { Heading, SubHeading } from '../../atoms';
import { SignUpForm } from '../../organisms';
import { Vertical6 } from '../../utilities';

export const SignUp: React.VFC = () => {
  return (
    <div className="py-10 px-4 sm:px-0 text-center">
      <Heading>新規登録</Heading>
      <Vertical6 />
      <p>必要情報を入力して、登録するをクリックしてください。</p>
      <SignUpForm />
    </div>
  );
}