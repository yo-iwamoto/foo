import React from 'react';
import { Link } from '@/components/atoms';
import { Spacer } from '@/components/utilities';

type Props = {
  href: string;
  text: string;
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
  className?: string;
};

export const IconTextLink: React.VFC<Props> = ({ href, text, children, onClick, className }) => {
  return (
    <div onClick={onClick} className={className!}>
      <Link href={href}>
        <a>
          <div className="h-full flex justify-start items-center">
            {children}
            <Spacer w={6} />
            <p className="text-white text-xl">{text}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};
