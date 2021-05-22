import React from 'react';
import cn from 'classnames';

type ButtonAttributes = JSX.IntrinsicElements['button'];

type ExtraAttributes = {
  text: string;
  primary?: boolean;
};

type Props = ExtraAttributes & Omit<ButtonAttributes, 'value'>;

export const Button: React.VFC<Props> = ({
  text,
  primary,
  onClick,
  className,
}) => {
  return (
    <button
      className={cn({
        [`h-8 border border-gray-400 bg-gray-400 text-white rounded-lg hover:text-gray-400 hover:bg-white hover:border-gray-400 transition-colors focus:outline-none`]:
          true,
        ['border-main bg-main hover:text-main hover:border-main']: primary,
        [className!]: className,
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
