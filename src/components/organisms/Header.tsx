import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { NavMenu } from '../../types/index';
import { useUserState } from '../../ducks/user/selectors';
import Link from 'next/link';
import Image from 'next/image';
import { TextLink, PrimaryButton } from '../atoms';
import { RowFlexContainer } from '../utilities';

export const Header: React.VFC = () => {
  const menus: NavMenu[] = [
    { text: 'TOP', href: '/' },
    { text: 'ABOUT', href: '/about' }
  ];

  const state = useUserState().user;
  console.log(state.isLoggedIn)

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
      <RowFlexContainer extraClasses="w-48">
        {menus.map((menu, index) => (
          <TextLink {...menu} type="header" key={index} />
        ))}
      {state.isLoggedIn
        ? <Link href="/users/mypage">
            <a>
              <FaUserCircle color="white" size="32" className="cursor-pointer" />
            </a>
          </Link>
        : <Link href="/users/signup">
            <a>
              <p className="text-white">新規登録</p>
            </a>
          </Link>
      }
      </RowFlexContainer>
    </header>
  );
}
