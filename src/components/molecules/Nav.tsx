import React from 'react';
import { Menus } from '../../types/index';
import { TextLink } from '../atoms/TextLink';

export const Nav: React.VFC = () => {
  const menus: Menus = [
    { text: 'TOP', href: '/' },
    { text: 'ABOUT', href: '/about' }
  ];

  return (
    <nav className="flex w-32 items-center justify-between">
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