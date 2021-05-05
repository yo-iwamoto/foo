import React, { useState } from 'react';
import { TextField, SubmitButton } from '../atoms';
import { ColumnFlexContainer, Vertical6, Vertical12 } from '../utilities';

export const SignUpForm: React.VFC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`1: ${email}, 2: ${password}`)
  }

  return (
    <form onSubmit={submitHandler} className="w-4/5 sm:w-3/5 md:w-2/5 mx-auto">
      <Vertical12 />
      <ColumnFlexContainer>
        <TextField type="text" value={email} placeholder="メールアドレス" onChange={onChangeEmail} />
        <Vertical6 />
        <TextField type="password" value={password} placeholder="パスワード" onChange={onChangePassword} />
        <Vertical6 />
        <SubmitButton text="登録する" />
      </ColumnFlexContainer>
    </form>
  );
}