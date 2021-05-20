import React, { useState, useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { autoLogIn } from '../../api/users';
import { logInAction, LogInActionPayload } from '../../redux/users/actions';
import { ModalState, State, UserState, UtilityState } from '../../redux/types';
import { Router } from 'next/router';
import cn from 'classnames';

import { NavigationDrawer, Toast } from '../molecules';
import { Header, Footer, Modal } from '../organisms';

type Props = {
  children: React.ReactNode;
  router: Router;
}

export const Layout: React.VFC<Props> = ({ children, router }) => {
  const dispatch = useDispatch();
  const user = useSelector<State, UserState>(state => state.users, shallowEqual)
  const { modal, toast } = useSelector<State, UtilityState>(state => state.utilities);

  useEffect(() => {
    if (!user.isLoggedIn && localStorage.getItem('Access-Token')) {
      autoLogIn().then(data => {
        const actionPayload: LogInActionPayload = {
          ...data.user,
          isNewUser: false,
          authProvider: 'firebase'
        };
        dispatch(logInAction(actionPayload));
        if (router.route === '/users/login' || router.route === '/users/signup') {
          router.push('/');
        }
      })
    } else if (!user.isLoggedIn) {
      if (router.route === '/users/mypage') {
        router.push('/users/login');
      }
    }
  }, [router.pathname])

  const [show, setShow] = useState(false);

  const onClose = () => setShow(false);
  const onOpen = () => setShow(true);

  const closed = 'bg-gray-800 w-screen opacity-40 h-full hidden transition-all z-20 fixed';
  const opened = closed.replace('hidden', '');

  return (
    <div>
      {modal.type && <Modal />}
      {toast.type && <Toast />}
      <div className={show ? opened : closed} onClick={onClose} />
      <NavigationDrawer show={show} onClose={onClose} isLoggedIn={user.isLoggedIn} />
      <Header onOpen={onOpen} />
      <main className="text-gray-700 font-main min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}