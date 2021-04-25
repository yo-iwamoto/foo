import React from 'react';
import { Menu } from '../../types/index';
import { HeaderLink } from '../atoms/HeaderLink';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';

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
      <Link href="/mypage"><a>
        <FaUserCircle color="white" size="32" className="cursor-pointer" />
      </a></Link>
    </nav>
  );
}