import React from 'react';

import { Heading, SubHeading } from '../../atoms';
import { LogInForm } from '../../organisms';
import { Vertical6 } from '../../utilities';

export const LogIn: React.VFC = () => {
  return (
    <div className="py-10 px-4 sm:px-0 text-center">
      <Heading>ログイン</Heading>
      <Vertical6 />
      <p>必要情報を入力して、ログインをクリックしてください。</p>
      <LogInForm />
    </div>
  );
}