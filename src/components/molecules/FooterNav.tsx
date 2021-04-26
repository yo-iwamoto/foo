import React from 'react';
import { Menu } from '../../types';
import { TextLink } from '../atoms/TextLink';

export const FooterNav: React.VFC = () => {
  const menus: Menu[] = [
    { text: 'プライバシーポリシー', href: '/about/privacy_policy' },
    { text: '管理者について', href: '/about/manager' },
    { text: 'お問い合わせ', href: '/about/contact' }
  ];

  return (
    <nav className="flex items-center justify-around w-68 mx-auto">
      {menus.map((menu, index) => (
        <>
          <TextLink href={menu.href} type="footer" key={index}>
            {menu.text}
          </TextLink>

          {(menu.text !== 'お問い合わせ') &&
            <span key={index + 1} className="px-2 font-thin">/</span>
          }
        </>
        )
      )}
    </nav>
  );
}