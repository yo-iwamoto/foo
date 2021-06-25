import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Image, Link } from '@/components/atoms';
import cn from 'classnames';

type Props = {
  toggleDrawer: React.MouseEventHandler;
};

export const Header: React.VFC<Props> = ({ toggleDrawer }) => {
  const [expand, setExpand] = useState(false);
  return (
    <header className="bg-main flex justify-between items-center px-4 py-1">
      <div className="w-16">
        <Link href="/">
          <a>
            <Image src="/images/LogoWhite.png" alt="foo" width={240} height={184} className="transform translate-y-1" />
          </a>
        </Link>
      </div>
      <div
        className={cn({
          ['c-expand-circle']: true,
          ['c-expand-circle__expanded']: expand,
        })}
      ></div>
      <GiHamburgerMenu
        size="30"
        className="cursor-pointer text-text transform transition-transform hover:scale-125"
        onClick={toggleDrawer}
      />
    </header>
  );
};
