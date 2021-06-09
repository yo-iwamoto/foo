import React from 'react';
import { DrawerMenu } from '@/types';
import cn from 'classnames';
import { HomeIcon, SignInIcon, UserPlusIcon, TimesIcon, SignOutIcon, UserIcon } from '@/components/atoms/Icons';
import { IconTextLink } from '@/components/atoms';
import { Spacer } from '@/components/utilities';

type Props = {
  show: boolean;
  toggleDrawer: () => void;
  isLoggedIn: boolean;
  logOut: () => void;
};

export const NavigationDrawer: React.VFC<Props> = ({ show, toggleDrawer, isLoggedIn, logOut }) => {
  const menus: DrawerMenu[] = [
    { text: 'トップ', href: '/', icon: <HomeIcon color="white" size={40} /> },
    {
      text: '新規登録',
      href: '/users/signup',
      icon: <UserPlusIcon color="white" size={40} />,
    },
    {
      text: 'ログイン',
      href: '/users/login',
      icon: <SignInIcon color="white" size={40} />,
    },
    {
      text: 'マイページ',
      href: '/users/mypage',
      icon: <UserIcon color="white" size={40} />,
    },
    {
      text: 'ログアウト',
      href: '/',
      icon: <SignOutIcon color="white" size={40} />,
    },
  ];

  if (isLoggedIn) {
    menus.splice(1, 2); // '新規登録', 'ログイン'
  } else {
    menus.splice(3, 2); // 'マイページ', 'ログアウト'
  }

  return (
    <div
      className={cn({
        ['h-full w-full sm:w-2/4 md:w-2/5 lg:w-1/4 bg-main top-0 z-30 transform transition-all duration-500 fixed shadow-2xl']:
          true,
        ['-right-full']: !show,
        ['right-0']: show,
      })}
    >
      <div className="ml-auto w-8 mt-6 mr-6 cursor-pointer" onClick={toggleDrawer}>
        <TimesIcon size="40" className="text-text transform transition-transform hover:scale-125" />
      </div>
      <div className="mt-16 flex flex-col justify-between items-start">
        {menus.map((menu, index) => (
          <div key={index} className="w-full pl-16 lg:pl-10">
            <IconTextLink
              {...menu}
              onClick={menu.text === 'ログアウト' ? logOut : toggleDrawer}
              className="transform transition-transform hover:scale-105"
            >
              {menu.icon}
            </IconTextLink>
            <Spacer h={6} />
          </div>
        ))}
      </div>
    </div>
  );
};
