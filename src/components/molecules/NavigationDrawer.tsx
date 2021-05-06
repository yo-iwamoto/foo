import React from 'react';
import { DrawerMenu } from '../../types';
import { FaHome, FaEnvira, FaSignInAlt, FaUserPlus, FaTimes } from 'react-icons/fa';
import { IconTextLink } from '../atoms';
import { ColumnFlexContainer, Vertical6 } from '../utilities';

type Props = {
  show: boolean;
  onClose: React.MouseEventHandler;
}

export const NavigationDrawer: React.VFC<Props> = ({ show, onClose }) => {

  const menus: DrawerMenu[] = [
    { text: 'トップ', href: '/', icon: <FaHome color="white" size={40} /> },
    { text: 'Fooとは', href: '/about', icon: <FaEnvira color="white" size={40} /> },
    { text: '新規登録', href: '/users/signup', icon: <FaUserPlus color="white" size={40} /> },
    { text: 'ログイン', href: '/users/login', icon: <FaSignInAlt color="white" size={40} /> }
  ]

  const opened = 'h-full w-full sm:w-2/4 md:w-2/5 lg:w-1/4 bg-main absolute top-0 right-0 z-30 transform transition-transform duration-500',
        closed = opened + ' translate-x-full';

  return (
    <div className={show ? opened : closed}>
      <div className="ml-auto w-8 mt-6 mr-6 cursor-pointer" onClick={onClose}>
        <FaTimes color="white" size="40" />
      </div>
      <div className="mt-16 flex flex-col justify-between items-start">
        {menus.map((menu, index) => (
          <div key={index} className="w-full pl-16 lg:pl-10">
            <IconTextLink {...menu} onClick={onClose}>
              {menu.icon}
            </IconTextLink>
            <Vertical6 />
          </div>
        ))}
      </div>
    </div>
  );
}