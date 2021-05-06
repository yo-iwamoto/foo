import React, { useEffect, useState } from 'react';
import { NavigationDrawer } from '../molecules';
import { Header, Footer } from '../organisms';
import { Vertical12 } from '../utilities';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [show, setShow] = useState(false),
        onClose = () => setShow(false),
        onOpen = () => setShow(true);

  const closed = 'bg-gray-800 absolute w-screen opacity-40 h-full hidden transition-all z-20',
        opened = closed.replace('hidden', '');

  const handler = (e: Event) => {
    e.preventDefault();
  }

  return (
    <>
      <div className={show ? opened : closed} onClick={onClose} />
      <NavigationDrawer show={show} onClose={onClose} />
      <Header onOpen={onOpen} />
      <main className="text-gray-700 font-main h-">{children}</main>
      <Vertical12 />
      <Footer />
    </>
  );
}