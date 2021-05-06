import React, { useEffect, useState } from 'react';
import { Header } from '../organisms';
import { Footer } from '../organisms';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [show, setShow] = useState(false),
        onClose = () => setShow(false),
        onOpen = () => setShow(true);

  const closed = 'bg-gray-800 absolute w-screen opacity-40 h-screen hidden transition-all z-20',
        opened = closed.replace('hidden', '')

  return (
    <>
      <div className={show ? opened : closed} onClick={onClose} />
      <Header show={show} onClose={onClose} onOpen={onOpen} />
      <main className="min-h-screen text-gray-700 font-main">{children}</main>
      <Footer />
    </>
  );
}