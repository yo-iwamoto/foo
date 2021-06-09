import React from 'react';
import { Link } from '@/components/atoms';
import cn from 'classnames';

type Props = {
  href: string;
  text: string;
  className?: string;
};

export const TextLink: React.VFC<Props> = ({ href, text, className }) => {
  return (
    <Link href={href}>
      <a
        className={cn({
          ['text-xs sm:text-sm hover:underline']: true,
          [className!]: className,
        })}
      >
        {text}
      </a>
    </Link>
  );
};
