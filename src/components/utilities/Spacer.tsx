import React from 'react';
import cn from 'classnames';

type Props = {
  h?: number;
  w?: number;
};

export const Spacer: React.VFC<Props> = ({ h, w }) => {
  return (
    <>
      <div
        className={cn({
          [`h-${h}`]: !!h,
          [`w-${w}`]: !!w
        })}
      />
      {false && <div className="h-6 h-8 h-12 h-28 w-6" />}
    </>
  );
};