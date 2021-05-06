import React, { useState } from 'react';
import { firebaseLogIn } from '../../api/firebase';
import { useDispatch } from 'react-redux';
import userSlice from '../../ducks/user/slice';
import { useRouter } from 'next/router';
import { TextField, SubmitButton } from '../atoms';
import { ColumnFlexContainer, Vertical6, Vertical12 } from '../utilities';

export const LogInForm: React.VFC = () => {
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState('')

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  const dispatch = useDispatch(),
        router = useRouter();

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    firebaseLogIn({ email: email, password: password })
      .then(uid => {
        dispatch(userSlice.actions.logIn(uid));
        router.push('/users/mypage')
      })
  };

  return (
    <form onSubmit={submitHandler} className="w-4/5 sm:w-3/5 md:w-2/5 mx-auto">
      <Vertical12 />
      <ColumnFlexContainer>
        <TextField type="text" value={email} placeholder="メールアドレス" onChange={onChangeEmail} />
        <Vertical6 />
        <TextField type="password" value={password} placeholder="パスワード" onChange={onChangePassword} />
        <Vertical6 />
        <SubmitButton text="ログイン" />
      </ColumnFlexContainer>
    </form>
  );
}