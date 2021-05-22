import React, { useState } from 'react';
import { FirebasePayload } from '../../api/types';

import { TextField, SubmitButton } from '../atoms';
import { ColumnFlexContainer, Spacer } from '../utilities';

type Props = {
  firebaseAuth: (payload: FirebasePayload, name: string) => Promise<void>;
};

export const SignUpForm: React.VFC<Props> = ({ firebaseAuth }) => {
  const [name, setName] = useState<string>(''),
    [email, setEmail] = useState<string>(''),
    [password, setPassword] = useState<string>(''),
    [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  type Placeholder =
    | 'ニックネーム'
    | 'メールアドレス'
    | 'パスワード'
    | 'パスワード（再確認）';
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value,
      placeholder = e.target.placeholder as Placeholder;
    switch (placeholder) {
      case 'ニックネーム':
        setName(value);
        break;
      case 'メールアドレス':
        setEmail(value);
        break;
      case 'パスワード':
        setPassword(value);
        break;
      case 'パスワード（再確認）':
        setPasswordConfirmation(value);
        break;
    }
  };

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      if (email && name) {
        firebaseAuth({ email, password }, name);
      } else {
        alert('必須項目を入力してください。');
      }
    } else {
      alert('パスワードが一致しません。');
    }
  };

  return (
    <form onSubmit={submitHandler} className="w-4/5 sm:w-3/5 md:w-2/5 mx-auto">
      <Spacer h={12} />
      <ColumnFlexContainer>
        <TextField
          type="text"
          value={name}
          placeholder="ニックネーム"
          onChange={changeHandler}
          fullwidth
        />
        <Spacer h={6} />
        <TextField
          type="text"
          value={email}
          placeholder="メールアドレス"
          autoComplete="email"
          onChange={changeHandler}
          fullwidth
        />
        <Spacer h={6} />
        <TextField
          type="password"
          value={password}
          placeholder="パスワード"
          onChange={changeHandler}
          fullwidth
        />
        <Spacer h={6} />
        <TextField
          type="password"
          value={passwordConfirmation}
          placeholder="パスワード（再確認）"
          onChange={changeHandler}
          fullwidth
        />
        <Spacer h={6} />
        <SubmitButton text="登録する" />
      </ColumnFlexContainer>
    </form>
  );
};
