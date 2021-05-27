import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Image, Link } from '@/components/atoms';

type Props = {
  toggleDrawer: React.MouseEventHandler;
};

export const Header: React.VFC<Props> = ({ toggleDrawer }) => {
  return (
    <header className="bg-main flex justify-between items-center px-4 py-1">
      <div className="w-16">
        <Link href="/">
          <a>
            <Image src="/images/LogoWhite.png" alt="foo" width={240} height={184} className="transform translate-y-1" />
          </a>
        </Link>
      </div>
      <GiHamburgerMenu color="white" size="30" className="cursor-pointer" onClick={toggleDrawer} />
    </header>
  );
};
