import React from 'react';
import Link from 'next/link';
import { Horizontal6 } from '../utilities';

type Props = {
  href: string;
  text: string;
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
}

export const IconTextLink: React.VFC<Props> = ({ href, text, children, onClick }) => {
  return (
    <div onClick={onClick}>
      <Link href={href}>
        <a>
          <div className="h-full flex justify-start items-center">
            {children}
            <Horizontal6 />
            <p className="text-white text-xl">{text}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}