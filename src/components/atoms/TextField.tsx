import React from 'react';
import cn from 'classnames';

type InputAttributes = JSX.IntrinsicElements['input'];
type ExtraAttributes = {
  fullwidth?: boolean;
};

type Props = InputAttributes & ExtraAttributes;

export const TextField: React.VFC<Props> = (props) => {
  const { fullwidth, ...inputProps } = props;

  return (
    <input
      {...inputProps}
      className={cn({
        ['sm:text-lg p-2 border border-gray-400 outline-none appearance-none rounded-md focus:border-main']:
          true,
        [props.className!]: props.className,
        ['w-full']: fullwidth,
      })}
    />
  );
};
