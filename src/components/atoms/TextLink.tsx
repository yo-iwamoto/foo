import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  type: 'header' | 'footer';
  children: React.ReactNode;
}

export const TextLink = ({ href, type, children }: Props) => {
  let className = 'text-text text-md md:text-lg';
  if (type === 'footer') {
    className = 'text-xs sm:text-sm';
  }
  return (
    <Link href={href}>
      <a className={className}>
        {children}
      </a>
    </Link>
  );
}