import React from 'react';
import { Logo } from '../atoms/Logo';
import { Nav } from '../molecules/nav';

export const Header: React.VFC = () => {
  return (
    <header>
      <div>
        <Logo />
      </div>
      <Nav />
    </header>
  );
}
