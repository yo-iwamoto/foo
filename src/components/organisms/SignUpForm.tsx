import React, { useState } from 'react';
import { firebaseCreateUser } from '../../api/externals/firebase';
import { useDispatch } from 'react-redux';
import userSlice from '../../ducks/user/slice';
import { useRouter } from 'next/router';
import { TextField, SubmitButton } from '../atoms';
import { ColumnFlexContainer, Vertical6, Vertical12 } from '../utilities';

export const SignUpForm: React.VFC = () => {
  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [passwordConfirmation, setPasswordConfirmation] = useState('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  }
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }
  const onChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordConfirmation(e.target.value);
  }

  const dispatch = useDispatch(),
        router = useRouter();

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      firebaseCreateUser({ email: email, password: password })
        .then(uid => {
          dispatch(userSlice.actions.logIn(uid));
          router.push('/users/mypage')
        })
    } else {
      alert('パスワードが一致しません。');
    }
  };

  return (
    <form onSubmit={submitHandler} className="w-4/5 sm:w-3/5 md:w-2/5 mx-auto">
      <Vertical12 />
      <ColumnFlexContainer>
        <TextField type="text" value={name} placeholder="ニックネーム" onChange={onChangeName} />
        <Vertical6 />
        <TextField type="text" value={email} placeholder="メールアドレス" onChange={onChangeEmail} />
        <Vertical6 />
        <TextField type="password" value={password} placeholder="パスワード" onChange={onChangePassword} />
        <Vertical6 />
        <TextField type="password" value={passwordConfirmation} placeholder="パスワード（再確認）" onChange={onChangePasswordConfirmation} />
        <Vertical6 />
        <SubmitButton text="登録する" />
      </ColumnFlexContainer>
    </form>
  );
}