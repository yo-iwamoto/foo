import React from 'react';
import { Menu } from '../../types';
import { FooterLink } from '../atoms/FooterLink';

export const FooterNav: React.VFC = () => {
  const menus: Menu[] = [
    { text: 'プライバシーポリシー', href: '/about/privacy_policy' },
    { text: '管理者について', href: '/about/manager' },
    { text: 'お問い合わせ', href: '/about/contact' }
  ]

  return (
    <nav className="flex items-center justify-around w-68 mx-auto">
      {menus.map((menu) => (
        <>
          <FooterLink href={menu.href}>
            {menu.text}
          </FooterLink>

          {menu.text !== 'お問い合わせ' &&
            <span key={menu.href} className="px-2 font-thin">/</span>
          }
        </>
        )
      )}
    </nav>
  );
}