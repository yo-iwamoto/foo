import React from 'react';
import { Link } from '@/components/atoms';

type Props = {
  href: string;
  text: string;
  color?: 'main' | 'black';
};

export const TextLink: React.VFC<Props> = ({ href, text, color = 'black' }) => {
  const className = `text-xs sm:text-sm hover:underline text-${color}`;
  return (
    <Link href={href}>
      <a className={className}>{text}</a>
    </Link>
  );
};
