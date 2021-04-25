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
      <main className="h-screen text-gray-700 ">{children}</main>
      <Footer />
    </>
  );
}