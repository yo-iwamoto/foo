import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { State, UserState } from '../../redux/types';
import { NavigationDrawer } from '../molecules';
import { Header, Footer } from '../organisms';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [show, setShow] = useState(false),
        onClose = () => setShow(false),
        onOpen = () => setShow(true);

  const closed = 'bg-gray-800 w-screen opacity-40 h-full hidden transition-all z-20 fixed',
        opened = closed.replace('hidden', '');

  const handler = (e: Event) => {
    e.preventDefault();
  }

  const { isLoggedIn } = useSelector<State, UserState>(state => state.users, shallowEqual)

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