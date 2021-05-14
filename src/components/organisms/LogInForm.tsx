import React, { useState } from 'react';
import { FirebasePayload } from '../../api/types';

import { TextField, SubmitButton } from '../atoms';
import { ColumnFlexContainer, Spacer } from '../utilities';

type Props = {
  firebaseAuth: (payload: FirebasePayload) => Promise<void>;
}

export const LogInForm: React.VFC<Props> = ({ firebaseAuth }) => {

  const [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

  type Placeholder = 'メールアドレス' | 'パスワード';
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const placeholder = e.target.placeholder as Placeholder;
    switch (placeholder) {
      case 'メールアドレス':
        setEmail(value);
        break;
      case 'パスワード':
        setPassword(value);
        break;
    }
  };

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    if (email && password) {
      const payload = { email, password };
      firebaseAuth(payload);
    }
  };

  return (
    <form onSubmit={submitHandler} className="w-4/5 sm:w-3/5 md:w-2/5 mx-auto">
      <Spacer h={12} />
      <ColumnFlexContainer>
        <TextField type="text" value={email} placeholder="メールアドレス" onChange={changeHandler} />
        <Spacer h={6} />
        <TextField type="password" value={password} placeholder="パスワード" onChange={changeHandler} />
        <Spacer h={6} />
        <SubmitButton text="ログイン" />
      </ColumnFlexContainer>
    </form>
  );
};