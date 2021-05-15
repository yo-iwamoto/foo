import React, { useState, useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { autoLogIn } from '../../api/users';
import { logInAction, LogInActionPayload } from '../../redux/users/actions';
import { State, UserState } from '../../redux/types';
import { NavigationDrawer } from '../molecules';
import { Header, Footer } from '../organisms';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector<State, UserState>(state => state.users, shallowEqual)

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem('Access-Token')) {
      autoLogIn().then(data => {
        const actionPayload: LogInActionPayload = {
          ...data.user,
          isNewUser: false,
          authProvider: 'firebase'
        };
        dispatch(logInAction(actionPayload));
      })
    }
  })

  const [show, setShow] = useState(false),
        onClose = () => setShow(false),
        onOpen = () => setShow(true);

  const closed = 'bg-gray-800 w-screen opacity-40 h-full hidden transition-all z-20 fixed',
        opened = closed.replace('hidden', '');

  const handler = (e: Event) => {
    e.preventDefault();
  }

  return (
    <div>
      <div className={show ? opened : closed} onClick={onClose} />
      <NavigationDrawer show={show} onClose={onClose} isLoggedIn={isLoggedIn} />
      <Header onOpen={onOpen} />
      <main className="text-gray-700 font-main min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}