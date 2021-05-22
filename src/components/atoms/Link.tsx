import React from 'react';
import NextLink from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
};

export const Link: React.VFC<Props> = ({ href, children }) => {
  return <NextLink href={href}>{children}</NextLink>;
};
