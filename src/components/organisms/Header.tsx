import React from 'react';
import { Logo } from '../atoms/Logo';
import { HeaderNav } from '../molecules/HeaderNav';

export const Header: React.VFC = () => {
  return (
    <header className="bg-main flex justify-between px-4">
      <div className="w-16">
        <Logo />
      </div>
      <HeaderNav />
    </header>
  );
}
