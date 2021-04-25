import React from 'react';
import { Menu } from '../../types/index';
import { HeaderLink } from '../atoms/HeaderLink';

export const Nav: React.VFC = () => {
  const menus: Menu[] = [
    { text: 'TOP', href: '/' },
    { text: 'ABOUT', href: '/about' }
  ];

  return (
    <nav>
      {menus.map((menu) => (
          <HeaderLink
            href={menu.href}
            key={menu.href}
          >
            {menu.text}
          </HeaderLink>
        )
      )}
    </nav>
  );
}