import React from 'react';
import { Logo } from '../atoms/Logo';
import { Nav } from '../molecules/nav';

export const Header: React.VFC = () => {
  return (
    <header className="flex justify-between items-center py-3 px-4 bg-main">
      <div className="w-12">
        <Logo />
      </div>
      <Nav />
    </header>
  );
}