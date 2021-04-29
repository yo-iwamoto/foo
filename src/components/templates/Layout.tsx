import React from 'react';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="min-h-screen text-gray-700 font-main">{children}</main>
      <Footer />
    </>
  );
}