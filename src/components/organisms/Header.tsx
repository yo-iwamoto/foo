import React from 'react';
import { Logo } from '../atoms/Logo';
import { HeaderNav } from '../molecules/HeaderNav';

export const Header: React.VFC = () => {
  return (
    <header>
      <div>
        <Logo />
      </div>
      <HeaderNav />
    </header>
  );
}
