import React from 'react';
import { Menus } from '../../types';
import { TextLink } from '../atoms/TextLink';

export const FooterNav: React.VFC = () => {
  const menus: Menus = [
    { text: 'プライバシーポリシー', href: '/about/privacy_policy' },
    { text: '管理者について', href: '/about/manager' }
  ]

  return (
    <nav className="flex items-center justify-around w-3/4 sm:w-2/4 xl:w-1/4 mx-auto">
      {menus.map((menu) => (
        <>
          <TextLink
            href={menu.href}
            color="dark"
          >
            {menu.text}
          </TextLink>

          {menu.text !== '管理者について' &&
            <span key={menu.href}>/</span>
          }
        </>
        )
      )}
    </nav>
  );
}