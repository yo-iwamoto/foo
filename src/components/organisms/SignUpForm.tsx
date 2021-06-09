import React from 'react';
import { FirebaseSignInPayload } from '@/types';

import { TextField, SubmitButton } from '@/components/atoms';
import { Flex, Spacer } from '@/components/utilities';
import { useInput } from '@/hooks/useInput';

type Props = {
  firebaseAuth: (payload: FirebaseSignInPayload, name: string) => Promise<void>;
};

export const SignUpForm: React.VFC<Props> = ({ firebaseAuth }) => {
  const [name, onChangeName] = useInput<string>('');
  const [email, onChangeEmail] = useInput<string>('');
  const [password, onChangePassword] = useInput<string>('');
  const [passwordConfirmation, onChangePasswordConfirmation] = useInput<string>('');

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
      <Flex col jBetween className="w-full">
        <TextField type="text" value={name} placeholder="ニックネーム" onChange={onChangeName} fullwidth />
        <Spacer h={6} />
        <TextField
          type="text"
          value={email}
          placeholder="メールアドレス"
          autoComplete="email"
          onChange={onChangeEmail}
          fullwidth
        />
        <Spacer h={6} />
        <TextField type="password" value={password} placeholder="パスワード" onChange={onChangePassword} fullwidth />
        <Spacer h={6} />
        <TextField
          type="password"
          value={passwordConfirmation}
          placeholder="パスワード（再確認）"
          onChange={onChangePasswordConfirmation}
          fullwidth
        />
        <Spacer h={6} />
        <SubmitButton value="登録する" />
      </Flex>
    </form>
  );
};
