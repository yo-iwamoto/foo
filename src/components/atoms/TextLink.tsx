import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
}

export const TextLink = ({ href, children }: Props) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}