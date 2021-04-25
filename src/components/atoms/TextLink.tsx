import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  color: 'light' | 'dark';
  children: React.ReactNode;
}

export const TextLink = ({ href, color, children }: Props) => {
  const className = (color === 'light')
    ? 'text-text text-lg'
    : 'text-gray-400';
  
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}