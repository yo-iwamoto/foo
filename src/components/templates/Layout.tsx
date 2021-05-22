import React, { useState, useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { autoLogIn } from '../../api/users';
import {
  logInAction,
  LogInActionPayload,
  logOutAction,
} from '../../redux/users/actions';
import {
  closeModalAction,
  closeToastAction,
} from 'src/redux/utilities/actions';
import { ModalState, State, UserState, UtilityState } from '../../redux/types';

import { Router } from 'next/router';
import cn from 'classnames';

import { NavigationDrawer } from '../molecules';
import { Header, Footer, Modal, Toast } from '../organisms';

type Props = {
  children: React.ReactNode;
  router: Router;
};

export const Layout: React.VFC<Props> = ({ children, router }) => {
  const dispatch = useDispatch();

  // Auto Login & Navigation Guard

  const user = useSelector<State, UserState>(
    (state) => state.users,
    shallowEqual,
  );

  useEffect(() => {
    if (!user.isLoggedIn && localStorage.getItem('Access-Token')) {
      autoLogIn().then((data) => {
        const actionPayload: LogInActionPayload = {
          ...data.user,
          isNewUser: false,
          authProvider: 'firebase',
        };
        dispatch(logInAction(actionPayload));
        if (
          router.route === '/users/login' ||
          router.route === '/users/signup'
        ) {
          router.push('/');
        }
      });
    } else if (!user.isLoggedIn) {
      if (router.route === '/users/mypage') {
        router.push('/users/login');
      }
    }
  }, [router.pathname]);

  // Drawer Control

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const closeDrawer = () => setShowDrawer(false);
  const openDrawer = () => setShowDrawer(true);
  const closedDrawer =
    'bg-gray-800 w-screen opacity-40 h-full hidden transition-all z-20 fixed';
  const openedDrawer = closedDrawer.replace('hidden', '');
  const logOut = (): void => {
    closeDrawer();
    localStorage.removeItem('Access-Token');
    dispatch(logOutAction());
  };

  // Modal & Toast Control

  const { modal, toast } = useSelector<State, UtilityState>(
    (state) => state.utilities,
  );
  const closeModal = (): void => {
    dispatch(closeModalAction());
  };
  const closeToast = (): void => {
    dispatch(closeToastAction());
  };

  return (
    <div>
      {modal.type && <Modal modal={modal} close={closeModal} />}
      {toast.type && <Toast toast={toast} closeToast={closeToast} />}
      <div
        className={cn({
          [closedDrawer]: !showDrawer,
          [openedDrawer]: showDrawer
        })}
        onClick={closeDrawer}
      />
      <NavigationDrawer
        show={showDrawer}
        close={closeDrawer}
        isLoggedIn={user.isLoggedIn}
        logOut={logOut}
      />
      <Header onOpen={openDrawer} />
      <main className="text-gray-700 font-main min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};
