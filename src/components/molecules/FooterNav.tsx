import React from 'react';
import { Menu } from '../../types';
import { FooterLink } from '../atoms/FooterLink';

export const FooterNav: React.VFC = () => {
  const menus: Menu[] = [
    { text: 'プライバシーポリシー', href: '/about/privacy_policy' },
    { text: '管理者について', href: '/about/manager' },
    { text: 'お問い合わせ', href: '/about/contact' }
  ];

  const navClassName="flex items-center justify-around w-68 mx-auto";

  return (
    <nav className={navClassName}>
      {menus.map((menu, index) => (
        <>
          <FooterLink href={menu.href} key={index}>
            {menu.text}
          </FooterLink>

          {(menu.text !== 'お問い合わせ') &&
            <span key={index + 1} className="px-2 font-thin">/</span>
          }
        </>
        )
      )}
    </nav>
  );
}