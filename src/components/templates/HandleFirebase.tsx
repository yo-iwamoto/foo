import React, { useEffect } from 'react';
import { FirebaseController } from '@/api';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { raiseModalAction, raiseToastAction } from '@/redux/utilities/actions';
import { modalTemplates } from '@/lib/modals';
import { CircleLoader, Heading, SubmitButton, TextField } from '@/components/atoms';
import { Spacer } from '@/components/utilities';
import { useInput } from '@/hooks/useInput';
import { useLoadingControll } from '@/hooks/useLoadingControll';
import { toastTemplates } from '@/lib/toasts';
import { useUtilitiesState } from '@/hooks/useSelectors';

export const HandleFirebase: React.VFC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const actionCode = router.query.oobCode as string;
  const lang = router.query.lang as string;
  const mode = router.query.mode as string;

  // for password reset

  const [startLoading, endLoading] = useLoadingControll();
  const [newPassword, onChangeNewPassword] = useInput<string>('');
  const { isLoading } = useUtilitiesState();
  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (newPassword) {
      startLoading();
      try {
        await FirebaseController.applyNewPassword(actionCode, newPassword);
        dispatch(raiseModalAction(modalTemplates.passwordChanged));
      } catch (err) {
        dispatch(raiseToastAction(toastTemplates.error));
        throw err;
      }
      endLoading();
    } else {
      alert('パスワードを入力してください。');
    }
  };

  useEffect(() => {
    if (mode) {
      switch (mode) {
        case 'verifyEmail':
          FirebaseController.handleActionCode({ actionCode })
            .then(() => {
              dispatch(raiseModalAction(modalTemplates.finishVerified));
              router.push('/users/login');
            })
            .catch(() => {
              dispatch(raiseModalAction(modalTemplates.alreadyVerified));
              router.push('/users/login');
            });
          break;
        case 'resetPassword':
          break;
        default:
          router.push('/');
      }
    }
  }, [actionCode, lang, mode]);

  return (
    <>
      {mode === 'resetPassword' ? (
        <div className="py-10 px-4 sm:px-0 text-center">
          <Heading>パスワードの再設定</Heading>
          <Spacer h={6} />
          <p>新しく設定するパスワードを入力してください。</p>
          <Spacer h={6} />
          <form onSubmit={onSubmit} className="w-4/5 sm:w-3/5 md:w-2/5 mx-auto">
            <TextField
              value={newPassword}
              placeholder="新しいパスワード"
              disabled={isLoading}
              onChange={onChangeNewPassword}
              type="password"
              fullwidth
            />
            <Spacer h={6} />
            {isLoading ? <CircleLoader /> : <SubmitButton value="変更" className="w-1/3" />}
          </form>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};
