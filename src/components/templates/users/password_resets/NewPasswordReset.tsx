import { apiController } from '@/api';
import { SubmitButton, Heading, TextField, CircleLoader } from '@/components/atoms';
import { Spacer } from '@/components/utilities';
import { useInput } from '@/hooks/useInput';
import { useLoadingControll } from '@/hooks/useLoadingControll';
import { useSelectors } from '@/hooks/useSelectors';
import { modalTemplates } from '@/lib/modals';
import { raiseModalAction } from '@/redux/utilities/actions';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

export const NewPasswordReset: React.VFC = () => {
  const [email, onChangeEmail] = useInput<string>('');
  const [startLoading, endLoading] = useLoadingControll();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (email) {
      try {
        startLoading();
        await apiController.firebase.sendPasswordResetEmail(email);
        endLoading();
        router.push('/');
        dispatch(raiseModalAction(modalTemplates.sendPasswordResetEmail));
      } catch (err) {
        endLoading();
        throw err;
      }
    } else {
      alert('メールアドレスを入力してください。');
    }
  };

  const {
    utilities: { isLoading },
  } = useSelectors();

  return (
    <div className="py-10 px-4 sm:px-0 text-center">
      <Heading>パスワードの再設定</Heading>
      <Spacer h={6} />
      <p>
        Fooに登録したメールアドレスを入力してください。
        <br />
        新しいパスワードを設定するためのリンクを送信します。
      </p>
      <Spacer h={6} />
      <form onSubmit={onSubmit} className="w-4/5 sm:w-3/5 md:w-2/5 mx-auto">
        <TextField value={email} placeholder="メールアドレス" disabled={isLoading} onChange={onChangeEmail} fullwidth />
        <Spacer h={6} />
        {isLoading ? <CircleLoader /> : <SubmitButton value="送信" className="w-1/3" />}
      </form>
    </div>
  );
};
