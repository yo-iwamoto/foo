import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { NavMenu } from '../../types/index';
import Link from 'next/link';
import Image from 'next/image';
import { RowFlexContainer } from '../molecules/RowFlexContainer';
import { TextLink } from '../atoms/TextLink';

export const Header: React.VFC = () => {
  const menus: NavMenu[] = [
    { text: 'TOP', href: '/' },
    { text: 'ABOUT', href: '/about' }
  ];

  return (
    <header className="bg-main flex justify-between px-4">
      <div className="w-16">
        <Link href="/">
          <a>
            <Image
              src="/images/LogoWhite.png"
              alt="foo"
              width={240}
              height={184}
            />
          </a>
        </Link>
      </div>
      <RowFlexContainer extraClasses="w-44">
        {menus.map((menu, index) => (
          <TextLink {...menu} type="header" key={index} />
        ))}
        <Link href="/mypage">
          <a>
            <FaUserCircle color="white" size="32" className="cursor-pointer" />
          </a>
        </Link>
      </RowFlexContainer>
    </header>
  );
}
