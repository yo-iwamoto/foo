import React from 'react';

type Props = {
  extraClasses?: string;
  children: React.ReactNode;
}

export const RowFlexContainer: React.VFC<Props> = ({ extraClasses, children }) => {
  const baseClasses = 'flex justify-between items-center ';
  const className = baseClasses + extraClasses;
  return (
    <nav className={className}>
      {children}
    </nav>
  );
}