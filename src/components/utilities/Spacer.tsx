import React from 'react';

type Props = {
  h?: number;
  w?: number;
};

export const Spacer: React.VFC<Props> = ({ h, w }) => {
  const className = `h-${h} w-${w}`;

  return (
    <div className={className} />
  );
};