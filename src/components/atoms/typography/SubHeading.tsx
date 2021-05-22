import React from 'react';
import cn from 'classnames';

type Props = {
  bold?: boolean;
  children: React.ReactNode;
};

export const SubHeading: React.VFC<Props> = ({ bold, children }) => {
  return (
    <h2
      className={cn({
        ['text-xl sm:text-2xl']: true,
        ['font-bold']: bold,
      })}
    >
      {children}
    </h2>
  );
};
