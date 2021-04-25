import React from 'react';
import { Menus } from '../../types/index';
import { TextLink } from '../atoms/TextLink';

export const HeaderNav: React.VFC = () => {
  const menus: Menus = [
    { text: 'TOP', href: '/' },
    { text: 'ABOUT', href: '/about' }
  ];

  return (
    <nav className="flex w-32 items-center justify-between">
      {menus.map((menu) => (
          <TextLink
            href={menu.href}
            color="light"
            key={menu.href}
          >
            {menu.text}
          </TextLink>
        )
      )}
    </nav>
  );
}