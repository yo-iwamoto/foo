import React from 'react';
import { Menus } from '../../types/index';
import { TextLink } from '../atoms/HeaderLink';

export const Nav: React.VFC = () => {
  const menus: Menus = [
    { text: 'TOP', href: '/' },
    { text: 'ABOUT', href: '/about' }
  ];

  return (
    <nav>
      {menus.map((menu) => (
          <TextLink
            href={menu.href}
            key={menu.href}
          >
            {menu.text}
          </TextLink>
        )
      )}
    </nav>
  );
}