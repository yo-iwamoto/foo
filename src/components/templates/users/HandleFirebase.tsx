import React, { useEffect } from 'react';
import { verifyEmail } from '@/api/authentication/firebase';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { raiseModalAction } from '@/redux/utilities/actions';
import { ModalState } from '@/redux/types';
import { modalTemplates } from '@/lib/modals';

export const HandleFirebase: React.VFC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const actionCode = router.query.oobCode as string;
  const lang = router.query.lang as string;
  const mode = router.query.mode as string;

  useEffect(() => {
    if (mode) {
      switch (mode) {
        case 'verifyEmail':
          verifyEmail(actionCode)
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

  return <div></div>;
};
