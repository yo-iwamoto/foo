import React from 'react';
import NextLink, { LinkProps } from 'next/link';

type Props = React.PropsWithChildren<LinkProps>;

export const Link: React.VFC<Props> = ({ href, children }) => {
  return <NextLink href={href}>{children}</NextLink>;
};
