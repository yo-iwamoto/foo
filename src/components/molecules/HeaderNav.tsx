import React from 'react';
import { Menu } from '../../types/index';
import { HeaderLink } from '../atoms/HeaderLink';
import { FaUserCircle } from 'react-icons/fa';

export const HeaderNav: React.VFC = () => {
  const menus: Menu[] = [
    { text: 'TOP', href: '/' },
    { text: 'ABOUT', href: '/about' }
  ];

  return (
    <nav className="flex w-44 items-center justify-between">
      {menus.map((menu) => (
          <HeaderLink
            href={menu.href}
            key={menu.href}
          >
            {menu.text}
          </HeaderLink>
        )
      )}
      <FaUserCircle color="white" size="32" />
    </nav>
  );
}