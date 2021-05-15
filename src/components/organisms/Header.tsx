import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import Image from 'next/image';
import { PrimaryButton } from '../atoms';
import { shallowEqual, useSelector } from 'react-redux';
import { State, UserState } from '../../redux/types';

type Props = {
  onOpen: React.MouseEventHandler;
}

export const Header: React.VFC<Props> = ({ onOpen }) => {

  return (
    <header className="bg-main flex justify-between items-center px-4">
      <div className="w-16">
        <Link href="/">
          <a>
            <Image
              src="/images/LogoWhite.png"
              alt="foo"
              width={240}
              height={184}
              className="transform translate-y-1"
            />
          </a>
        </Link>
      </div>
      <GiHamburgerMenu
        color="white"
        size="30"
        className="cursor-pointer"
        onClick={onOpen}
      />
    </header>
  );
}
