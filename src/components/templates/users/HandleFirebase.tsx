import React, { useEffect } from 'react';
import { verifyEmail } from '../../../api/authentication/firebase';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { raiseModalAction } from '../../../redux/utilities/actions';
import { ModalState } from '../../../redux/types';

export const HandleFirebase: React.VFC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const actionCode = router.query.oobCode as string;
  const lang = router.query.lang as string;
  const mode = router.query.mode as string;
  
  useEffect(() => {
    console.log(actionCode, lang, mode);
    if (mode) {
      switch (mode) {
        case 'verifyEmail':
          verifyEmail(actionCode)
            .then(() => {
              const modal: ModalState = {
                type: 'success',
                title: '登録が完了しました！',
                message: '本人確認が完了し、アカウントが有効化されました。これ以降、ご登録いただいたメールアドレスとパスワードでログインできます。続けてログインを行ってください。'
              };
              dispatch(raiseModalAction(modal));
              router.push('/users/login');
            })
            .catch(() => {
              const modal: ModalState = {
                type: 'success',
                title: 'アカウントは既に有効です！',
                message: '既に本人確認が完了しています。ログインしてください。'
              };
              dispatch(raiseModalAction(modal));
              router.push('/users/login');
            })
          break;
        case 'resetPassword':
          console.log('reset');
          break;
        default:
          router.push('/');
      }
    }
  }, [actionCode, lang, mode])

  return (
    <div></div>
  );
};