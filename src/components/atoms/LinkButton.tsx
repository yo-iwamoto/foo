import React from 'react';
import cn from 'classnames';
import { Link } from '../atoms';

type ButtonAttributes = JSX.IntrinsicElements['button'];

type ExtraAttributes = {
  text: string;
  width?: string | number;
  href?: string;
  primary?: boolean;
};

type Props = ExtraAttributes & Omit<ButtonAttributes, 'value' | 'className'>;

export const LinkButton: React.VFC<Props> = ({ text, width, href, primary, onClick }) => {
  return (
    <Link href={href ? href : ''}>
      <button
        className={cn({
          [`w-${width} h-12 border border-gray-400 bg-gray-400 text-white rounded-lg hover:text-gray-400 hover:bg-white hover:border-gray-400 transition-colors focus:outline-none`]: true,
          ['border-main bg-main hover:text-main hover:border-main']: primary
        })}
        onClick={onClick}
      >
        {text}
      </button>
    </Link>
  );
};