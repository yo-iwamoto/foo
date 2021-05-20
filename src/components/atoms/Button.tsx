import React from 'react';
import cn from 'classnames';

type ButtonAttributes = JSX.IntrinsicElements['button'];

type ExtraAttributes = {
  text: string;
  width?: string | number;
  primary?: boolean;
};

type Props = ExtraAttributes & Omit<ButtonAttributes, 'value' | 'className'>

export const Button: React.VFC<Props> = ({ text, width, primary, onClick }) => {
  return (
    <button
      className={cn({
        [`w-${width} h-12 border border-gray-400 bg-gray-400 text-white rounded-lg hover:text-gray-400 hover:bg-white hover:border-gray-400 transition-colors focus:outline-none`]: true,
        ['border-main bg-main hover:text-main hover:border-main']: primary
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};