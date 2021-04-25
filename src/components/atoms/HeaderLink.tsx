import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
}

export const HeaderLink = ({ href, children }: Props) => {
  return (
    <Link href={href}>
      <a className="text-text text-md md:text-lg">{children}</a>
    </Link>
  );
}