import React from 'react';
import cn from 'classnames';

type Props = JSX.IntrinsicElements['input'];

export const SubmitButton: React.VFC<Props> = ({ className, ...inputProps }) => {
  return (
    <input
      {...inputProps}
      className={cn({
        ['p-3 border bg-main text-white rounded-lg cursor-pointer hover:bg-white hover:text-main hover:border-main focus:bg-white focus:text-main focus:border-main transition-colors focus:outline-none']:
          true,
        [className!]: className,
      })}
      type="submit"
    />
  );
};
