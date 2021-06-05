import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logInAction, LogInActionPayload, logOutAction } from '@/redux/users/actions';
import { closeModalAction, closeToastAction, raiseToastAction } from 'src/redux/utilities/actions';

import { Router } from 'next/router';
import cn from 'classnames';

import { NavigationDrawer } from '@/components/molecules';
import { Header, Footer, Modal, Toast } from '@/components/organisms';
import { toastTemplates } from '@/lib/toasts';
import { apiController } from '@/api';
import { useSelectors } from '@/hooks/useSelectors';

type Props = {
  children: React.ReactNode;
  router: Router;
};

export const Layout: React.VFC<Props> = ({ children, router }) => {
  const dispatch = useDispatch();

  // Auto Login & Navigation Guard

  const {
    users,
    utilities: { modal, toast },
  } = useSelectors();

  useEffect(() => {
    if (!users.isLoggedIn && localStorage.getItem('Access-Token')) {
      apiController.users.autoLogIn().then((data) => {
        const actionPayload: LogInActionPayload = {
          ...data.user,
          isNewUser: false,
          authProvider: 'firebase',
        };
        dispatch(logInAction(actionPayload));
        if (router.route === '/users/login' || router.route === '/users/signup') {
          router.push('/');
        }
      });
    } else if (!users.isLoggedIn) {
      if (router.route === '/users/mypage') {
        router.push('/users/login');
      }
    }
  }, [router.pathname]);

  // Drawer Control

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const toggleDrawer = (): void => {
    setShowDrawer((prev) => !prev);
  };

  const logOut = (): void => {
    toggleDrawer();
    localStorage.removeItem('Access-Token');
    dispatch(logOutAction());
    dispatch(raiseToastAction(toastTemplates.logOut));
  };

  // Modal & Toast Control

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
          ['bg-gray-800 w-screen opacity-40 h-full transition-all z-20 fixed']: true,
          ['hidden']: !showDrawer,
        })}
        onClick={toggleDrawer}
      />
      <NavigationDrawer show={showDrawer} toggleDrawer={toggleDrawer} isLoggedIn={users.isLoggedIn} logOut={logOut} />
      <Header toggleDrawer={toggleDrawer} />
      <main className="text-gray-700 font-main min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};
