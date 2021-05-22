import React from 'react';
import { DrawerMenu } from '../../types';
import cn from 'classnames';
import {
  HomeIcon,
  SignInIcon,
  UserPlusIcon,
  TimesIcon,
  SignOutIcon,
  UserIcon,
} from '../atoms/Icons';
import { IconTextLink } from '../atoms';
import { ColumnFlexContainer, Spacer } from '../utilities';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../../redux/users/actions';

type Props = {
  show: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
};

export const NavigationDrawer: React.VFC<Props> = ({
  show,
  isLoggedIn,
  onClose,
}) => {
  const dispatch = useDispatch(),
    logOut = (): void => {
      onClose();
      localStorage.removeItem('Access-Token');
      dispatch(logOutAction());
    };

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

  const closed =
      'h-full w-full sm:w-2/4 md:w-2/5 lg:w-1/4 bg-main top-0 -right-full z-30 transform transition-all duration-500 fixed',
    opened = closed.replace('-right-full', 'right-0');

  return (
    <div
      className={cn({
        [closed]: !show,
        [opened]: show,
      })}
    >
      <div className="ml-auto w-8 mt-6 mr-6 cursor-pointer" onClick={onClose}>
        <TimesIcon color="white" size="40" />
      </div>
      <div className="mt-16 flex flex-col justify-between items-start">
        {menus.map((menu, index) => (
          <div key={index} className="w-full pl-16 lg:pl-10">
            <IconTextLink
              {...menu}
              onClick={menu.text === 'ログアウト' ? logOut : onClose}
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
