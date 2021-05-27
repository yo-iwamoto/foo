import React from 'react';
import { FirebaseSignInPayload } from '@/types';

import { TextField, SubmitButton } from '@/components/atoms';
import { Flex, Spacer } from '@/components/utilities';
import { useInput } from '@/hooks/useInput';

type Props = {
  firebaseAuth: (payload: FirebaseSignInPayload) => Promise<void>;
};

export const LogInForm: React.VFC<Props> = ({ firebaseAuth }) => {
  const [email, onChangeEmail] = useInput<string>('');
  const [password, onChangePassword] = useInput<string>('');

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
      <Flex col jBetween className="w-full">
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
        <SubmitButton text="ログイン" />
      </Flex>
    </form>
  );
};
