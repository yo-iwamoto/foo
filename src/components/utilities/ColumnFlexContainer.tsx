import React from 'react';

type Props = {
  extraClasses?: string;
  children: React.ReactNode;
};

export const ColumnFlexContainer: React.VFC<Props> = ({
  children,
  extraClasses,
}) => {
  const baseClasses =
      'flex flex-col justify-between items-center flex-nowrap w-full ',
    className = baseClasses + extraClasses;
  return <div className={className}>{children}</div>;
};
